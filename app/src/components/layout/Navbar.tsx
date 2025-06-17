"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthButton from "../ui/AuthButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#contact", label: "Contact" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed w-full z-30 top-0 left-0 transition-all duration-300 ${
        isScrolled ? "bg-[#3B3B3B] shadow-md" : "bg-[#2C2C2C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/icons8-game-96.png"
              alt="GameVerse Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-2xl font-bold text-gray-100">GameVers</span>
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-gray-100 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="hover:underline hover:decoration-[#A259FF] hover:underline-offset-4"
              >
                {label}
              </Link>
            ))}
            <AuthButton />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="bg-[#3B3B3B] md:hidden px-4 pt-2 pb-4 space-y-2 transition-all duration-300 overflow-hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-100 hover:text-white hover:bg-[#A259FF] px-3 py-2 rounded-md transition duration-300"
            >
              {label}
            </Link>
          ))}
          <AuthButton />
        </div>
      )}
    </nav>
  );
}

const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
