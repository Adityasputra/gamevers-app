"use client";
import Image from "next/image";

export default function JoinUs() {
  return (
    <section
      aria-labelledby="join-us-heading"
      className="text-white py-12 px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center bg-[#3B3B3B] rounded-xl shadow-lg p-6 sm:p-8">
          {/* Image */}
          <div className="flex-shrink-0 mb-6 sm:mb-0">
            <Image
              src="/card.png"
              alt="Digital membership card illustration"
              width={256}
              height={256}
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-xl"
              priority
            />
          </div>

          {/* Text + Form */}
          <div className="sm:ml-8 text-center sm:text-left flex-1">
            <h2 id="join-us-heading" className="text-2xl font-bold mb-2">
              Join Our Weekly Digest
            </h2>
            <p className="text-gray-300 mb-4">
              Get exclusive promotions & updates straight to your inbox.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add your form submission logic here
              }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="p-3 w-full sm:w-auto flex-1 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
              <button
                type="submit"
                className="p-3 w-full sm:w-auto bg-[#A259FF] hover:bg-[#923AE8] transition-colors rounded-lg font-semibold text-white"
                aria-label="Subscribe to weekly digest"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
