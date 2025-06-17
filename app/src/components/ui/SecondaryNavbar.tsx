"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function SecondaryNavbar() {
  const [isShrink, setIsShrink] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsShrink(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isShrink
          ? "bg-[#3B3B3B]/90 backdrop-blur-md py-2 shadow-lg"
          : "bg-[#2C2C2C] py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between text-white">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/icons8-game-96.png"
            alt="GameVerse Logo"
            width={32}
            height={32}
          />
          <span className="text-xl md:text-2xl font-bold text-white">
            GameVers
          </span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 pb-1 text-sm md:text-base transition-all duration-200 ${
                isActive(link.href)
                  ? "text-white border-[#A259FF]"
                  : "text-gray-400 border-transparent hover:border-[#A259FF] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-full z-40 md:hidden
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        bg-[#1F1F1F]/90 backdrop-blur-md`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-center gap-6 text-white text-lg mt-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 border-b-2 transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-white border-[#A259FF]"
                    : "text-gray-400 border-transparent hover:border-[#A259FF] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
