"use client";
import { BASE_URL } from "@/constants";
import { ProductModel } from "@/db/models/product";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Sidebar from "@/components/Sidebar";
import InfiniteScrollComponent from "@/components/InfiniteScroll";

export default function ListProduct() {
  const [data, setData] = useState<ProductModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [hasMore, setHasMore] = useState(true);
  const [wishlistStatus, setWishlistStatus] = useState<Record<string, string>>(
    {}
  );

  const categories = [
    "PC",
    "Playstation 5",
    "Playstation 4",
    "VR",
    "Xbox series",
  ];

  useEffect(() => {
    setLoading(true);
    fetchProducts(currentPage);
  }, [currentPage, debouncedSearchTerm, selectedCategory]);

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/products?search=${debouncedSearchTerm}&page=${page}&pageSize=${itemsPerPage}&category=${selectedCategory}`
      );
      const result = await response.json();

      if (page === 1) {
        setData(result.data || []);
      } else {
        setData((prevData) => [...prevData, ...(result.data || [])]);
      }

      setHasMore(result.data.length === itemsPerPage);
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddToWishlist = async (productId: string) => {
    const userId = "your-user-id";

    try {
      const response = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      setWishlistStatus((prev) => ({
        ...prev,
        [productId]: "Added to wishlist!",
      }));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setWishlistStatus((prev) => ({
        ...prev,
        [productId]: "Failed to add to wishlist.",
      }));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {isLoading && data.length === 0 ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <InfiniteScrollComponent
            data={data}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            handleAddToWishlist={handleAddToWishlist}
            wishlistStatus={wishlistStatus}
          />
        )}
      </main>
    </div>
  );
}
