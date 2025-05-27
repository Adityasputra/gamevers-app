"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductModel } from "@/db/models/Product";
import { AddWishlist } from "@/actions/Wishlist";
import { formatRupiah } from "@/db/utils/RupiahFormat";

interface CardProps {
  product: ProductModel;
}

export default function Card({ product }: CardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishlist = async (id: string) => {
    if (loading) return;

    try {
      setLoading(true);
      await AddWishlist(id);
      setIsWishlisted(true); // optimistic update
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      // Optionally show a toast/error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mb-6">
      <div
        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-300 bg-center bg-cover rounded-lg"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
        role="img"
        aria-label={product.name}
      />
      <div className="relative w-full -mt-10 rounded-lg bg-opacity-90 bg-[#A259FF] shadow-xl overflow-hidden">
        <h3 className="py-3 text-center font-bold text-white uppercase tracking-wide truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <span className="font-bold text-[#923AE8]">
            {product.price !== undefined
              ? formatRupiah(product.price)
              : "Price not available"}
          </span>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="px-3 py-1 text-sm font-semibold text-white bg-[#A259FF] rounded hover:bg-[#923AE8] transition duration-300 ease-in-out focus:outline-none"
            >
              Details
            </Link>
            <button
              aria-label={isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              className={`transition-transform duration-300 transform hover:scale-110 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleWishlist(String(product._id))}
              disabled={loading}
            >
              {isWishlisted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#A259FF]"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                    4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                    3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 
                    8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#A259FF]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                    0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                    3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                    12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
