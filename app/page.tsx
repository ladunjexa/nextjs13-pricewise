import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="border-2 border-red-500 px-6 py-24 md:px-20">
        <div className="flex gap-16 max-xl:flex-col">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="arrow-right"
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of{" "}
              <span className="text-primary">PriceWise</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve products and growth analytics to help you
              convert, engage, and retain more.
            </p>
            Searchbar
          </div>
          HeroCarousel
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple iPhone 15", "Book", "Sneakers"].map((product) => (
            <div key={product}>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
