"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

import { ProductModel } from "@/db/models/Product";
import { BASE_URL } from "@/constant";
import "../../styles/Slide.css";

export default function Slide() {
  const [data, setData] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch");
        const products = await response.json();
        setData(products.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <section aria-labelledby="recommended-games" className="py-12 text-white">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2
          id="recommended-games"
          className="text-4xl font-bold text-center mb-8"
        >
          Recommended <span className="text-purple">Games</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-700 rounded-lg p-4 animate-pulse max-w-[240px] mx-auto"
              >
                <div className="h-48 bg-gray-600 rounded mb-4" />
                <div className="h-4 bg-gray-500 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-500 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">
            Failed to load games. Please try again later.
          </p>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.map((product) => (
              <SwiperSlide
                key={product._id.toString()}
                className="flex justify-center mb-8"
              >
                <div className="relative p-4 w-full max-w-[240px] mx-auto hover:scale-105 transition-transform duration-300">
                  <Image
                    src={product.thumbnail || "/default-thumbnail.jpg"}
                    alt={product.name || "Game Thumbnail"}
                    className="rounded-lg shadow-lg object-cover aspect-[3/4]"
                    width={207}
                    height={276}
                    loading="lazy"
                  />
                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-semibold truncate">
                      {product.name}
                    </h3>
                    <Link href={`/products/${product.slug}`} passHref>
                      <button className="inline-block mt-2 bg-[#A259FF] hover:bg-[#923AE8] text-white px-4 py-1 rounded-md font-medium transition">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
