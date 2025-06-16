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

  if (loading)
    return <div className="text-center text-white mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!product)
    return (
      <div className="text-center text-white mt-20">Product not found.</div>
    );

  return (
    <>
      <NavbarDetail />

      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${product.thumbnail ?? "/default-image.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d]" />

        <div className="relative z-10 p-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">{product.excerpt}</p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {product.images?.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="h-52 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={image}
              alt={`${product.name} image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>

      <section className="container mx-auto px-4 pb-20 flex flex-col lg:flex-row gap-10 text-white">
        <div className="flex-1 bg-[#2D2D2D] p-6 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-300">{product.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Excerpt</h2>
            <p className="text-gray-400">{product.excerpt}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-[#2D2D2D] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#A259FF] text-sm py-1 px-3 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="text-3xl font-bold text-green-400">
              {formatRupiah(product.price)}
            </div>
            <ButtonAddWishlistDetail
              productId={product._id.toString()}
              slug={product.slug}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
