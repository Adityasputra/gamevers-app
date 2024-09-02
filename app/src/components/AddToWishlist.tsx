"use client";
import { BASE_URL } from "@/constants";
import React, { useState } from "react";

interface AddToWishlistButtonProps {
  productId: string;
  userId: string;
}

export default function AddToWishlistButton({
  productId,
  userId,
}: AddToWishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToWishlist = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL + "/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist");
      }

      const result = await response.json();
      console.log("Wishlist added successfully:", result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToWishlist}
        disabled={isLoading}
        aria-busy={isLoading}
        className={`px-4 py-2 rounded-md ${
          isLoading ? "bg-gray-400" : "bg-gray-800"
        } text-white`}
      >
        {isLoading ? "Adding..." : "Add to Wishlist"}
      </button>
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
    </div>
  );
}
