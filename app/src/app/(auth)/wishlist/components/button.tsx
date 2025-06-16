"use client";

import { useState } from "react";
import { AddWishlist, DeleteWishlist } from "@/actions/Wishlist";

export default function AddToWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setIsLoading(true);
    try {
      await AddWishlist(productId);
      alert("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Failed to add to wishlist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={isLoading}
      className="bg-darkChoc text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {isLoading ? "Adding..." : "Add to Wishlist"}
    </button>
  );
}

export function RemoveFromWishlistButton({
  wishlistId,
}: {
  wishlistId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveFromWishlist = async () => {
    if (
      !confirm("Are you sure you want to remove this item from your wishlist?")
    )
      return;

    setIsLoading(true);
    try {
      await DeleteWishlist(wishlistId);
      alert("Removed from wishlist.");
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemoveFromWishlist}
      disabled={isLoading}
      className={`relative inline-flex items-center justify-center px-5 py-2 font-bold text-sm tracking-wider uppercase 
        bg-gradient-to-r from-[#994ECC] to-[#3E187A] text-white rounded-md
        shadow-md transition-all duration-300
        hover:shadow-[#923AE8]/50 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed
        after:absolute after:inset-0 after:rounded-md after:border after:border-[#A259FF]/30
        hover:after:border-[#923AE8]/60`}
    >
      {isLoading ? "Removing..." : "Remove"}
    </button>
  );
}
