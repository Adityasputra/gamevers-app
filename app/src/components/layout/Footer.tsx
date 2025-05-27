"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3B3B3B] text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding Section */}
        <section>
          <h3 className="text-lg font-semibold text-purple-500">GameVers</h3>
          <p className="text-gray-300 mt-4">
            GameVers was created by Aditya Saputra to bring gamers together.
          </p>
        </section>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation">
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 mt-4">
            <li>
              <Link
                href="/products"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Game Store
              </Link>
            </li>
            <li>
              <Link
                href="/rankings"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Rankings
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Make new friends
              </Link>
            </li>
          </ul>
        </nav>

        {/* Subscription Form */}
        <section>
          <h3 className="text-lg font-semibold">Join Our Weekly Digest</h3>
          <p className="text-gray-300 mt-4">
            Get exclusive promotions, news, and updates straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex flex-col sm:flex-row items-stretch gap-3"
            aria-label="Newsletter Subscription Form"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="footer-email"
              required
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-md bg-[#A259FF] hover:bg-[#923AE8] text-white font-semibold transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-12 pt-6 border-t border-gray-600 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GameVers. All rights reserved.
      </div>
    </footer>
  );
}
