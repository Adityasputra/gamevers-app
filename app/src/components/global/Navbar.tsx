"use client";
import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <div className="px-10 fixed top-4 z-50 w-full">
      <div className="mx-auto container">
        <nav className="relative border-0 pr-3 py-3 pl-6 bg-white bg-opacity-15 shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-gray-800">
              <Link href="/" scroll={false}>
                LevelUpGames
              </Link>
            </span>
            <ul className="hidden lg:flex items-center gap-8">
              <Link
                href="/products"
                scroll={false}
                className="flex items-center gap-2 text-gray-900 font-medium"
              >
                Games
              </Link>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-900 font-medium"
                >
                  Account
                </a>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  scroll={false}
                  className="flex items-center gap-2 text-gray-900 font-medium"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/login"
                scroll={false}
                className="text-gray-800 py-2 px-4 hover:bg-gray-300 rounded-lg"
              >
                Log in
              </Link>
              <Link
                href="/register"
                scroll={false}
                className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                SignUp
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
