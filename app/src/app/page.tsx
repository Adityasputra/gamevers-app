"use client";

import AboutUs from "@/components/layout/AboutUs";
import Footer from "@/components/layout/Footer";
import JoinUs from "@/components/layout/JoinUs";
import Navbar from "@/components/layout/Navbar";
import Promotion from "@/components/layout/Promotion";
import Slide from "@/components/layout/Slide";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="container mx-auto px-4 py-20 max-w-screen-xl flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Discover Real Games & Play Experiences
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Are you ready to embark on an exciting journey into the world of
              gaming? No need to wait any longer! We are your trusted partner to
              enjoy a wide range of games.
            </p>
            <Link href="/products" passHref>
              <button
                className="inline-block mt-8 bg-gradient-to-r from-[#A259FF] to-[#923AE8] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                aria-label="Get Started"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
                Get Started
              </button>
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[450px] h-[450px] md:h-[500px] transform transition-transform duration-300 hover:scale-105 rounded-b-xl hover:shadow-purple hover:shadow-lg">
              <Image
                src="/rise-humanoids-with-advanced-headgear-generative-ai.webp"
                alt="Humanoid figure in futuristic gear, representing a game character"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#3B3B3B]/80 text-white text-center rounded-b-xl py-4">
                <h2 className="text-2xl md:text-3xl font-semibold">GameVers</h2>
                <p className="text-lg font-light">Connect, Play, Dominate</p>
              </div>
            </div>
          </div>
        </section>

        <Slide />
        <AboutUs />
        <Promotion />
        <JoinUs />
      </main>

      <Footer />
    </>
  );
}
