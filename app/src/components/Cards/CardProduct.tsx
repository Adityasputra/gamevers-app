// components/ProductCard.tsx
import React from "react";
import Link from "next/link";
import { ProductModel } from "@/db/models/product";

interface ProductCardProps {
  product: ProductModel;
  handleAddToWishlist: (productId: string) => void;
  wishlistStatus: Record<string, string>;
}

export default function CardProduct({
  product,
  handleAddToWishlist,
  wishlistStatus,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={product.thumbnail}
        alt={product.name}
      />
      <div className="flex flex-col p-4 flex-1">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <div className="text-sm text-gray-600 mb-2">
          {product.tags?.join(", ")}
        </div>
        <p className="text-xl font-semibold text-gray-800 mb-4">
          ${product.price?.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600 mb-4">{product.excerpt}</p>
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => handleAddToWishlist("product._id")}
            className="text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 8.75l4.5 4.5 6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <Link href={`/products/${product._id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
        {wishlistStatus["product._id"] && (
          <p className="text-xs mt-2 text-gray-500">
            {wishlistStatus["product._id"]}
          </p>
        )}
      </div>
    </div>
  );
}
