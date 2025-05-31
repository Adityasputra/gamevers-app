"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavbarDetail from "./components/NavbarDetail";
import { BASE_URL } from "@/constant";
import Footer from "@/components/layout/Footer";
import { formatRupiah } from "@/db/utils/RupiahFormat";
import { ProductModel } from "@/db/models/Product";
import ButtonAddWishlistDetail from "./components/ButtonWishlistDetail";

export default function ProductBySlug() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/products/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Product not found.");
            return;
          }
          throw new Error("Failed to fetch product.");
        }
        const productData: ProductModel = await response.json();
        setProduct(productData);
      } catch (err: any) {
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-white mt-20">Product not found.</div>
    );
  }

  return (
    <>
      <NavbarDetail />

      <div
        className="w-full h-[60vh] bg-cover bg-center flex items-end justify-start mb-10"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(162, 89, 255, 1) 0%, rgba(162, 89, 255, 0) 100%), url(${
            product.thumbnail ?? "/default-image.jpg"
          })`,
        }}
      >
        <div className="bg-transparent p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold bg-transparent text-white mb-4">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl bg-transparent text-gray-300">
            {product.excerpt}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {product.images?.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="h-48 overflow-hidden rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
          >
            <img
              src={image}
              alt={`${product.name} image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto p-8 text-white flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex-1 bg-[#3B3B3B] rounded-lg p-4 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-300">{product.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Excerpt</h2>
            <p className="text-gray-300">{product.excerpt}</p>
          </div>
        </div>

        <div className="flex-1 p-4 rounded-lg bg-[#3B3B3B] lg:pl-12">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#A259FF] text-white py-1 px-3 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6 mt-8">
            <div className="flex flex-col items-center bg-[#A259FF] rounded-l-lg text-white text-2xl font-semibold py-2 px-6 shadow-lg">
              <button className="bg-[#A259FF]">
                {formatRupiah(product.price)}
              </button>
            </div>

            <ButtonAddWishlistDetail
              productId={product._id.toString()}
              slug={product.slug}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
