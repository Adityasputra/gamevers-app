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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Your Wishlist
        </h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-400 text-center">Your wishlist is empty.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <li
                key={item._id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-2 text-cyan-400">
                  {item.product.name}
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  {item.product.description}
                </p>
                <p className="text-lg font-semibold mb-4 text-green-400">
                  ${item.product.price}
                </p>
                <div className="flex justify-end">
                  <ButtonRemove wishlistId={item._id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
