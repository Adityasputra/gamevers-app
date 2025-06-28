"use client";

import { motion } from "framer-motion";

export default function ModernHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-[#2c003e] flex items-center justify-center overflow-hidden">
      {/* Background floating dots */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute w-40 h-40 bg-purple-500 opacity-30 rounded-full top-20 left-20 blur-3xl animate-pulse" />
        <div className="absolute w-32 h-32 bg-cyan-500 opacity-20 rounded-full bottom-10 right-32 blur-2xl animate-pulse" />
      </motion.div>

      {/* Main Glass Card */}
      <motion.div
        className="z-10 w-[90%] max-w-xl p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Future
        </h1>
        <p className="text-lg opacity-80">
          Experience a cutting-edge interface built with Next.js and Tailwind
          CSS. Smooth animations powered by Framer Motion.
        </p>
      </motion.div>
    </div>
  );
}
