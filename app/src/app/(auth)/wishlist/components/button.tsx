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
      alert("Failed to remove from wishlist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemoveFromWishlist}
      disabled={isLoading}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {isLoading ? "Removing..." : "Remove from Wishlist"}
    </button>
  );
}
