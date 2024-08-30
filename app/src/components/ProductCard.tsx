import React from "react";
import Image from "next/image";

interface ProductCardProps {
  img: string;
  title: string;
  desc: string;
  buttonLabel: string;
}

export function ProductCard({
  img,
  title,
  desc,
  buttonLabel,
}: ProductCardProps) {
  return (
    <div className="w-full rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={img}
        alt={title}
        width={400}
        height={250}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{desc}</p>
        <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
