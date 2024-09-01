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
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={product.thumbnail}
        alt={product.name}
      />
      <div className="flex flex-col p-4 flex-1">
        <h2 className="text-lg font-bold mb-2 text-gray-100">{product.name}</h2>
        <p className="text-sm text-gray-100 mb-4">{product.excerpt}</p>
        <p className="text-xl font-semibold text-gray-100 mb-4">
          ${product.price?.toFixed(2)}
        </p>
        <div className="text-sm text-gray-100 mb-2">
          {product.tags?.map((c) => (
            <span key={c} className="bg-gray-700 p-2 rounded mx-1">
              {c}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => handleAddToWishlist("product._id")}
            className="text-blue-100 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <Link href={`/products/${product._id}`}>
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700">
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
