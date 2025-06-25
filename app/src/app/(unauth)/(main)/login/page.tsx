"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          if (Array.isArray(data.error)) {
            data.error.forEach((msg: string) => toast.error(msg));
          } else if (data.error.message) {
            toast.error(data.error.message);
          }
        } else if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } else {
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-20 px-4 bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/bg-gaming.jpg")' }}
    >
      <ToastContainer />

      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row bg-[#121212]/90 backdrop-blur-md rounded-3xl shadow-[0_0_20px_#A259FF80] overflow-hidden mx-auto max-w-4xl border border-[#A259FF30]">
        {/* Side Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("/concept-person-suffering-from-cybersickness-technology-addiction.jpg")',
            backgroundPositionX: "85%",
          }}
        />

        {/* Login Form */}
        <div className="w-full lg:w-1/2 p-10 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center text-[#A259FF] tracking-wide mb-2">
            GameVers
          </h2>
          <p className="text-sm text-center text-gray-400 mb-6">
            Welcome back, gamer! Ready to explore?
          </p>

          <div className="flex items-center justify-between mb-6">
            <span className="border-b border-[#A259FF80] w-1/4" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Login
            </p>
            <span className="border-b border-[#A259FF80] w-1/4" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#A259FF]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="gamer@example.com"
                className="mt-1 w-full rounded-xl py-2.5 px-4 bg-[#1F1F1F] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#A259FF]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl py-2.5 px-4 bg-[#1F1F1F] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-tr from-[#A259FF] to-[#6C33E2] hover:from-[#B070FF] hover:to-[#8D4DF9] py-2.5 rounded-xl font-bold text-white transition-all duration-200 hover:shadow-[0_0_10px_#A259FF80] disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-sm text-center text-gray-400 mt-4">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-[#A259FF] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
