"use client";

import { AddWishlistDetail } from "@/actions/Wishlist";
import { useTransition } from "react";

interface ButtonAddWishlistDetailProps {
  productId: string;
  slug: string;
}

export default function ButtonAddWishlistDetail({
  productId,
  slug,
}: ButtonAddWishlistDetailProps) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(() => {
      AddWishlistDetail(productId, slug);
    });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isPending}
      aria-label="Add to Wishlist"
      className={`p-2 rounded-full shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:ring-offset-2 ${
        isPending
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-100 text-[#A259FF] hover:bg-[#A259FF] hover:text-white hover:scale-110"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
