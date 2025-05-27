"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarDetail() {
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrink(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 shadow transition-all duration-300 ${
        isShrink
          ? "bg-[#2C2C2C]/90 backdrop-blur-md py-3"
          : "bg-[#2C2C2C] py-4"
      }`}
    >
      <div className="container flex items-center justify-center mx-auto text-gray-200 capitalize space-x-6">
        {[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Wishlist", href: "/wishlist" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white border-b-2 border-transparent transition-all duration-300 hover:border-[#A259FF]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
