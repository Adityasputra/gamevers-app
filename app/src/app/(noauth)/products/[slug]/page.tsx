import { BASE_URL } from "@/constants";
import { ProductModel } from "@/db/models/product";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Navbar from "@/components/global/Navbar";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const response = await fetch(`${BASE_URL}/api/products/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      return (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      );
    }
    throw new Error("Failed to fetch product.");
  }

  const product: ProductModel = await response.json();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl text-gray-100 font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-100 mb-4">
                Price:{" "}
                <span className="font-semibold">
                  ${product.price?.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-100 mb-6">{product.description}</p>
              <div className="text-sm text-gray-100 mb-6">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 p-2 rounded mx-1 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition duration-300">
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gray-200 text-sm font-medium rounded-md hover:bg-gray-300 transition duration-300">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {product.images?.slice(0, 4).map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${product.name} image ${index + 1}`}
                className="w-full h-60 object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
        </div>
      </div>
    </>
  );
}
