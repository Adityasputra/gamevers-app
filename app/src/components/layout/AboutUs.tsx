import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section aria-labelledby="about-us" className="py-12 text-white">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div>
            <Image
              src="/half-robot-animal-wild-life.webp"
              alt="Futuristic robotic animal representing gaming evolution"
              width={800}
              height={450}
              className="w-full h-auto rounded-xl shadow-2xl shadow-[#A259FF]"
              loading="lazy"
            />
          </div>

          {/* Text Section */}
          <div>
            <h2 id="about-us" className="text-4xl font-bold mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              Are you a gaming enthusiast on the hunt for the latest and
              greatest titles? Look no further! Our e-commerce platform offers a
              vast selection of games across all genres—from action-packed
              adventures to immersive RPGs.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Whether you're into classic favorites or the newest releases,
              we’ve got something for everyone. Explore our collection now and
              enjoy exclusive deals and fast shipping on all orders!
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-base">
              <li>Wide Selection of Products</li>
              <li>Secure Payment Options</li>
              <li>Fast, Reliable Delivery</li>
              <li>24/7 Customer Support</li>
            </ul>
            <Link href="/about-us" passHref>
              <button
                className="inline-block bg-[#A259FF] hover:bg-[#923AE8] transition-colors px-6 py-2 rounded-xl font-semibold text-white shadow-md"
                aria-label="Learn more about us"
              >
                Learn More About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
