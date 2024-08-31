"use client";

import React, { useState } from "react";
import ProductCard from "@/components/Cards/ProductCard";
import { ProductModel } from "@/db/models/product";

export default function ProductDisplay({
  products,
}: {
  products: ProductModel[];
}) {
  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? 10 : 5;
  const limitedData = products.slice(0, itemsToShow);

  return (
    <>
      <section className="pt-60 px-8 mt-20 mb-24">
        <div className="container mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get All Games</h2>
          <p className="text-gray-100 text-lg mx-auto w-full px-4 font-normal lg:w-6/12">
            Join us and experience a fun and thrilling gaming experience.
          </p>
        </div>
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {limitedData.length > 0 ? (
              limitedData.map((product: ProductModel) => (
                <div className="flex justify-center" key={"product._id"}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-200 text-center w-full">
                No products available at the moment.
              </p>
            )}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
            >
              {showAll ? "Show Less" : "See All"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
