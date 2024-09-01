import React from "react";
import Link from "next/link";

export default function EcommerceDetails() {
  return (
    <>
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="/images/home.jpeg"
                alt="E-commerce Details"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">
                Why Choose Us?
              </h2>
              <p className="mb-4 text-white">
                Are you a gaming enthusiast on the hunt for the latest and
                greatest titles? Look no further! Our e-commerce site offers a
                vast selection of games across all genres, from action-packed
                adventures to immersive RPGs. Whether you’re into classic
                favorites or the newest releases, we’ve got something for
                everyone.
              </p>
              <p className="mb-4 text-white">
                Explore our collection now and find the perfect game to elevate
                your gaming experience. Plus, enjoy exclusive deals and fast
                shipping on all orders!
              </p>
              <ul className="list-disc list-inside text-gray-100 mb-4">
                <li>Wide Selection of Products</li>
                <li>Secure Payment Options</li>
              </ul>
              <Link
                href="/about-us"
                className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
