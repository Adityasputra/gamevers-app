import React from "react";

export default function PromotionalBanner() {
  return (
    <div className="relative flex items-center justify-center bg-gray-900 overflow-hidden mb-10">
      <div className="relative w-full max-w-7xl h-[40vh]">
        <img
          src="/Horizon/thumbnail/image1.jpg"
          alt="Promo Banner"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-black/50 p-4 rounded-lg shadow-lg text-center"
            suppressHydrationWarning
          >
            <p className="text-white text-lg lg:text-2xl font-semibold">
              Special Promotion: 30% Off on All Games!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
