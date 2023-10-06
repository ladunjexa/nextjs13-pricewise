import React from "react";
import "./globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line no-unused-vars
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Price Tracker",
  description: "Track prices of your favorite products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto max-w-10xl">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
