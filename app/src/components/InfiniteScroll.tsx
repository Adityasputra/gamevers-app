import InfiniteScroll from "react-infinite-scroll-component";
import { ProductModel } from "@/db/models/product";
import React from "react";
import CardProduct from "./Cards/CardProduct";

interface InfiniteScrollComponentProps {
  data: ProductModel[];
  fetchMoreData: () => void;
  hasMore: boolean;
  handleAddToWishlist: (productId: string) => void;
  wishlistStatus: Record<string, string>;
}

export default function InfiniteScrollComponent({
  data,
  fetchMoreData,
  hasMore,
  handleAddToWishlist,
  wishlistStatus,
}: InfiniteScrollComponentProps) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      height={500}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p>Loading more products...</p>}
      endMessage={<p>No more products to display.</p>}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.map((product) => (
        <CardProduct
          key={`${product._id}`}
          product={product}
          handleAddToWishlist={handleAddToWishlist}
          wishlistStatus={wishlistStatus}
        />
      ))}
    </InfiniteScroll>
  );
}
