"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close the menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main Navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-30 top-0 left-0 transition-all duration-300 ${
        isScrolled ? "bg-[#3B3B3B] shadow-md" : "bg-transparent"
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

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-gray-100 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <XIcon /> : <MenuIcon />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-gray-100 hover:underline hover:decoration-[#A259FF] hover:underline-offset-4 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="text-gray-100 hover:text-[#A259FF] transition-colors duration-300 relative"
            >
              <CartIcon />
            </Link>
            <Link
              href="/login"
              className="bg-[#A259FF] text-white px-4 py-2 rounded-md hover:bg-[#923AE8] transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#3B3B3B] md:hidden px-4 pt-2 pb-4 space-y-2 overflow-hidden"
          >
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
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center text-gray-100 hover:text-white hover:bg-[#A259FF] px-3 py-2 rounded-md transition duration-300"
            >
              <CartIcon className="mr-2" />
              Cart
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="inline-block bg-[#A259FF] text-white px-3 py-2 rounded-md hover:bg-[#923AE8] transition duration-300"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
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

const CartIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-5 w-auto ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
