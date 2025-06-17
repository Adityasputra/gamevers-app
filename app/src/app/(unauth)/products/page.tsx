"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

import Card from "@/app/(unauth)/products/components/Card";
import NavbarProduct from "./components/NavbarProduct";
import Footer from "@/components/layout/Footer";
import { ProductModel } from "@/db/models/Product";
import { BASE_URL } from "@/constant";

const PAGE_SIZE = 8;

export default function Products() {
  const [data, setData] = useState<ProductModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 300);

  // Fetch products on search
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSearchedProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&pageSize=${PAGE_SIZE}&search=${value}`,
          { signal }
        );
        const result = await res.json();
        setData(result.data);
        setHasMore(result.data.length === PAGE_SIZE);
        setPage(1); // Reset to first page
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching products:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedProducts();

    return () => controller.abort();
  }, [value]);

  // Fetch next page on scroll
  useEffect(() => {
    if (page === 1) return; // Prevent refetch from search

    const fetchMore = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/products?page=${page}&pageSize=${PAGE_SIZE}&search=${value}`
        );
        const result = await res.json();
        const products = result.data;

        setData((prev) => [...prev, ...products]);
        setHasMore(products.length === PAGE_SIZE);
      } catch (err) {
        console.error("Error loading more products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <NavbarProduct handleSearch={handleSearch} text={text} />

      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreProducts}
        hasMore={hasMore}
        loader={
          <h4 className="text-center py-6 text-white bg-[#222831] animate-pulse">
            Loading more products...
          </h4>
        }
        className="bg-[#222831] mt-16 md:mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4"
      >
        {data.map((product) => (
          <Card key={product._id.toString()} product={product} />
        ))}
      </InfiniteScroll>

      <Footer />
    </>
  );
}
