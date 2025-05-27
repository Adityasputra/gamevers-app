"use client";

import { AddWishlist } from "@/actions/Wishlist";



export default function Button({
  productId: slug,
}: {
  productId: string;
}) {
  const handleWishlist = async (id: string) => {
    await AddWishlist(id);
  };

  return (
    <button
      onClick={() => handleWishlist(slug)}
      className="bg-darkChoc text-white font-bold py-2 px-4 rounded"
    >
      Add to Wishlist
    </button>
  );
}
