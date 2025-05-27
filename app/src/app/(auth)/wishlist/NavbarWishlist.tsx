"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarWishlist() {
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrink(true);
      } else {
        setIsShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 shadow transition-all duration-300 ${
        isShrink ? "bg-darkChoc py-4" : "bg-darkChoc py-4"
      }`}
    >
      <div className="container flex items-center justify-center mx-auto text-gray-200 capitalize">
        <Link
          href="/"
          className="text-white border-b-2 border-transparent transition-colors duration-300 transform hover:border-purple mx-1.5 sm:mx-6"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-white border-b-2 border-transparent transition-colors duration-300 transform hover:border-purple mx-1.5 sm:mx-6"
        >
          Products
        </Link>
        <Link
          href="/wishlist"
          className="text-white border-b-2 border-transparent transition-colors duration-300 transform hover:border-purple mx-1.5 sm:mx-6"
        >
          Wishlist
        </Link>
      </div>
    </nav>
  );
}
