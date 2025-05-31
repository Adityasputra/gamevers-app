"use client";

import { AddWishlist, DeleteWishlist } from "@/actions/Wishlist";

export default function Button({ productId: slug }: { productId: string }) {
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

export function ButtonRemove({ wishlistId }: { wishlistId: string }) {
  const handleRemoveWishlist = async (id: string) => {
    await DeleteWishlist(id);
  };

  return (
    <button
      onClick={() => handleRemoveWishlist(wishlistId)}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded"
    >
      Remove from Wishlist
    </button>
  );
}
