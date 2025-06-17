"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/constant";
import Footer from "@/components/layout/Footer";
import { formatRupiah } from "@/db/utils/RupiahFormat";
import { ProductModel } from "@/db/models/Product";
import ButtonAddWishlistDetail from "./components/ButtonWishlistDetail";
import SecondaryNavbar from "@/components/ui/SecondaryNavbar";

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
      <SecondaryNavbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              product.thumbnail ?? "/default-image.jpg"
            })`,
          }}
        />

        {/* Gradient Fade Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B] via-[#2B2B2B]/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
            {product.name}
          </h1>
          <p className="text-xl text-gray-300 mt-3">{product.excerpt}</p>
        </div>
      </div>

      {/* Gallery */}
      {product.images?.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition duration-300"
              >
                <img
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10 text-white">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1f1f1f] to-[#2e2e2e] p-8 rounded-2xl shadow-xl border border-white/10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#A259FF] mb-4 flex items-center gap-2">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-[#A259FF]">
              Game Highlights
            </h3>
            <p className="text-gray-400">{product.excerpt}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2e2e2e] p-8 rounded-2xl shadow-xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#A259FF]">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#A259FF]/90 text-white text-sm font-medium py-1 px-4 rounded-full shadow hover:bg-[#7c3aed]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-400">Price :</span>
              <span className="text-3xl font-bold">
                {formatRupiah(product.price)}
              </span>
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
