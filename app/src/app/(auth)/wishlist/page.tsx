"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface WishlistItem {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
  };
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User is not logged in.");
        }

        const response = await fetch(
          `${BASE_URL}/api/wishlist?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }

        const data = await response.json();
        setWishlistItems(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      <div className="flex flex-wrap -mx-4 mt-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div
              key={item.product._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-between mx-4 mb-4 flex-1 min-w-[300px]"
            >
              {item.product.thumbnail && (
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-full h-48 object-cover mb-4 rounded-t-lg"
                />
              )}
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {item.product.name}
                </h2>
                <p className="text-gray-600 mb-2 flex-1">
                  {item.product.description}
                </p>
                <p className="font-bold text-lg mb-4">${item.product.price}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/products/${item.product._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
