import React from "react";
import Image from "next/image";

export default function PromotionalBanner() {
  return (
    <>
      <div className="relative flex h-[40vh] w-full items-center justify-center bg-gray-900">
        <div className="relative w-[80%] h-[70%]">
          <Image
            src="/Horizon/thumbnail/image1.jpg"
            alt="Promo Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl shadow-2xl"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 p-4 rounded-lg shadow-lg">
            <p className="text-white text-lg lg:text-2xl font-semibold">
              Special Promotion: 30% Off on All Games!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
