import { BASE_URL } from "@/constant";
import { ProductModel } from "@/db/models/Product";
import { cookies } from "next/headers";
import { RemoveFromWishlistButton } from "./components/button";
import Footer from "@/components/layout/Footer";
import { formatRupiah } from "@/db/utils/RupiahFormat";
import Image from "next/image";
import Link from "next/link";
import SecondaryNavbar from "@/components/ui/SecondaryNavbar";

export interface WishlistItem {
  _id: string;
  product: ProductModel;
}

const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
};

export default async function WishlistPage() {
  let wishlist: WishlistItem[] = [];

  try {
    wishlist = await fetchWishlist();
  } catch (error) {
    console.error(error);
    return (
      <>
        <SecondaryNavbar />
        <main className="min-h-screen pt-24 pb-12 px-4 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
            <p className="text-red-400">
              Failed to load wishlist. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SecondaryNavbar />

      <main className="min-h-screen pt-24 pb-12 text-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12 space-x-4">
            <span className="flex-grow border-t border-gray-500/50"></span>
            <h1 className="text-3xl font-bold text-center uppercase">
              Wishlist
            </h1>
            <span className="flex-grow border-t border-gray-500/50"></span>
          </div>

          {wishlist.length === 0 ? (
            <p className="text-gray-400 text-center text-lg mt-20">
              Your wishlist is empty.{" "}
              <Link href="/products" className="text-indigo-400 underline">
                Explore products
              </Link>
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <li
                  key={item._id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md hover:shadow-[#A259FF]/30 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="w-full aspect-[4/3] relative">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex flex-col flex-grow p-5">
                    <h2 className="text-xl font-semibold mb-1 line-clamp-1">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <p className="text-lg font-semibold">
                        {formatRupiah(item.product.price)}
                      </p>
                      <RemoveFromWishlistButton wishlistId={item._id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
