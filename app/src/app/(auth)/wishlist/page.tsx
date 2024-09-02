"use client";
import { useEffect, useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlist";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = "x-user-id";

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        setError("Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li
              key={item._id}
              className="flex items-center mb-4 p-4 border rounded-lg"
            >
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>Price: ${item.product.price?.toFixed(2)}</p>
                <p>{item.product.description}</p>
              </div>
              <AddToWishlistButton
                productId={item.product._id.toString()}
                userId={userId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
