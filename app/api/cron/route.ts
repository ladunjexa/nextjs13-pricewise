import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import Product from "@/lib/models/Product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifType,
} from "@/lib/utils";

export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextApiRequest) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) {
      throw new Error("No products found");
    }

    // 1. Scrape latest product details & update db
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) {
          throw new Error("Error scraping product");
        }

        const updatedPriceHistory: any = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        );

        // 2. Check each's product's status & send email if necessary
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );

          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );

          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Success",
      data: updatedProducts,
    });
  } catch (error: any) {
    throw new Error(`Error in GET: ${error.message}`);
  }
}
