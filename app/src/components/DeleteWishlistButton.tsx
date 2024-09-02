"use client";
import { BASE_URL } from "@/constants";
import React, { useState } from "react";

interface DeleteWishlistButtonProps {
  wishlistId: string;
}

export default function DeleteWishlistButton({
  wishlistId,
}: DeleteWishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteWishlist = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/wishlist/${wishlistId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete wishlist");
      }

      console.log("Wishlist deleted successfully");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteWishlist} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete from Wishlist"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
