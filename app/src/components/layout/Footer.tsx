"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3B3B3B] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <section>
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
            <p className="text-gray-300 mt-4">
              GameVers is an e-commerce platform offering a wide selection of
              top digital games for gamers.
            </p>
          </section>

          <nav aria-label="Footer Navigation" className="mt-8 sm:mt-0">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Game Store
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Rankings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Make new friends
                </Link>
              </li>
            </ul>
          </nav>

          <section className="mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold">Join Our Weekly Digest</h3>
            <p className="text-gray-300 mt-4">
              Get exclusive promotions, news, and updates straight to your
              inbox.
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
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-600 text-center text-gray-400 text-sm px-4 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} GameVers. All rights reserved.
      </div>
    </footer>
  );
}
