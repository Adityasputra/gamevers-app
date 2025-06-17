"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProductProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export default function NavbarProduct({
  handleSearch,
  text,
}: NavbarProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrink(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isShrink ? "bg-[#2C2C2C] py-2 shadow-md" : "bg-[#2C2C2C] py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/icons8-game-96.png"
            alt="GameVers Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="font-bold text-white text-2xl">GameVers</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className="hidden md:flex md:items-center md:space-x-6 w-auto">
          <Link href="/" className="text-white hover:text-[#A259FF] transition">
            Home
          </Link>
          <Link
            href="/wishlist"
            className="text-white hover:text-[#A259FF] transition"
          >
            Wishlist
          </Link>
          <div className="relative w-48 ml-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={text}
              onChange={handleSearch}
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
            />
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } md:hidden`}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-[#2C2C2C] px-6 py-6 transition-transform duration-300 md:hidden ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-[#A259FF] transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/wishlist"
              className="text-white hover:text-[#A259FF] transition"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
            </Link>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={text}
                onChange={handleSearch}
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-[#A259FF]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
