import { BASE_URL } from "@/constant";
import { ProductModel } from "@/db/models/Product";
import { cookies } from "next/headers";
import { ButtonRemove } from "./components/button";

export interface WishlistItem {
  _id: string;
  product: ProductModel;
}

const fetchWishlist = async () => {
  const response = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const data = await response.json();
  return data;
};

export default async function WishlistPage() {
  const wishlist: WishlistItem[] = await fetchWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => (
            <li key={item._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p className="text-lg font-bold">${item.product.price}</p>
              {/* Add buttons for adding/removing from wishlist here */}
              <ButtonRemove wishlistId={item._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
