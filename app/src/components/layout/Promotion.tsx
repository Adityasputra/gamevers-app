import Link from "next/link";

export default function Promotion() {
  return (
    <section
      aria-labelledby="gamevers-title"
      className="relative w-full min-h-[80vh] sm:min-h-screen bg-cover bg-center flex items-center justify-center mb-10"
      style={{
        backgroundImage:
          'url("/person-wearing-futuristic-virtual-reality-glasses-gaming.webp")',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#A259FF]/80 to-transparent backdrop-brightness-75 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center text-white p-8 max-w-xl mx-4 sm:mx-10">
        <h2
          id="gamevers-title"
          className="text-4xl sm:text-5xl font-bold mb-6 text-balance"
        >
          GameVers
        </h2>
        <p className="text-lg sm:text-xl mb-8 leading-relaxed text-balance">
          Discover a whole new universe of gaming with GameVerse—your ultimate
          destination for immersive game experiences.
        </p>

        <Link href="/products" passHref>
          <button
            className="inline-block px-8 py-3 bg-white text-[#A259FF] font-semibold rounded-full shadow-xl hover:bg-[#923AE8] hover:text-white transition-colors duration-300"
            aria-label="Start your journey with GameVerse"
          >
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
