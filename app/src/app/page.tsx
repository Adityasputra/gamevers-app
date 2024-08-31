// pages/index.tsx
import Image from "next/image";
import Navbar from "@/components/global/Navbar";
import Link from "next/link";
import ProductDisplay from "@/components/Home/ProductDisplay";
import EcommerceDetails from "@/components/Home/EcommerceDetails";
import PromotionalBanner from "@/components/Home/PromotionalBanner";
import Footer from "@/components/global/Footer";

import fs from "fs";
import path from "path";

async function fetchDataProduct() {
  try {
    const filePath = path.join(process.cwd(), "public", "product.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const data = await fetchDataProduct();
  const products = Array.isArray(data.products) ? data.products : [];

  return (
    <>
      <Navbar />
      <div className="relative flex h-[55vh] w-full items-center px-10">
        <Image
          width={1000}
          height={1000}
          src="/images/home.jpeg"
          alt="background image"
          className="absolute inset-0 ml-auto w-[720px] h-[600px] rounded-bl-[80px] object-cover object-center shadow-2xl shadow-fuchsia-500"
        />
        <div className="relative container mx-auto mt-40 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-full rounded-xl border border-white bg-white/90 py-10 px-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 lg:w-3/4">
            <h1 className="text-blue-gray-800 text-3xl lg:text-5xl font-bold lg:max-w-3xl">
              Unlock New Experiences by Playing New Games
            </h1>
            <p className="mt-6 mb-10">
              Are you ready to embark on an exciting journey into the world of
              gaming? No need to wait any longer! We are your trusted partner to
              enjoy a wide range of games.
            </p>
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:gap-6 lg:justify-start">
              <Link
                href="/products"
                className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                View All Games
              </Link>
              <button className="border border-gray-800 text-gray-800 py-2 px-4 rounded hover:bg-gray-100">
                See Pricing
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              <Image
                width={80}
                height={80}
                className="w-20 grayscale opacity-60"
                src="/home/ps5.png"
                alt="ps5"
              />
              <Image
                width={80}
                height={80}
                className="w-20 grayscale opacity-60"
                src="/home/ps4.png"
                alt="ps4"
              />
              <Image
                width={80}
                height={80}
                className="w-20 grayscale opacity-60"
                src="/home/vr.png"
                alt="vr"
              />
              <Image
                width={80}
                height={80}
                className="w-20 grayscale opacity-60"
                src="/home/pc.png"
                alt="pc"
              />
            </div>
          </div>
        </div>
      </div>
      <ProductDisplay products={products} />
      <EcommerceDetails />
      <PromotionalBanner />
      <Footer />
    </>
  );
}
