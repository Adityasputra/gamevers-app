import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { BASE_URL } from "@/constant";

export interface LoginResponse {
  access_token: string;
}

export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return redirect("/login?error=" + encodeURIComponent(result.message));
    }

    (await cookies()).set("Authorization", `Bearer ${result.access_token}`);
    redirect("/");
  };

  return (
    <div
      className="min-h-screen py-24 px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("/bg-gaming.jpg")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row bg-[#1b1b1b] bg-opacity-90 rounded-lg shadow-2xl shadow-[#A259FF] overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {/* Left Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("/concept-person-suffering-from-cybersickness-technology-addiction.jpg")',
            backgroundPositionX: "85%",
          }}
        />

        {/* Login Form */}
        <div className="w-full p-8 lg:w-1/2 text-white">
          <h2 className="text-3xl font-bold text-[#A259FF] text-center tracking-widest drop-shadow-md">
            GameVers
          </h2>
          <p className="text-lg text-gray-300 text-center mb-6">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              Get started
            </p>
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
          </div>

          <form action={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#A259FF] block mb-1"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-label="Email"
                className="w-full rounded-lg py-2 px-4 bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#A259FF] block mb-1"
              >
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-label="Password"
                className="w-full rounded-lg py-2 px-4 bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#A259FF] to-[#923AE8] text-white py-2 rounded-xl hover:scale-[1.02] hover:shadow-xl transition duration-200 font-bold"
            >
              Sign In
            </button>

            {/* Navigation */}
            <p className="text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#A259FF] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
