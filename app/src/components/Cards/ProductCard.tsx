import React from "react";
import { ProductModel } from "@/db/models/product";

export default function ProductCard({ product }: { product: ProductModel }) {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.name}
        width={400}
        height={250}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.excerpt}</p>
        <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}
