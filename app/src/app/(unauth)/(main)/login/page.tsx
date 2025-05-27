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
    <div className="min-h-screen py-24 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg shadow-[#A259FF] overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {/* Left Image (Only on large screens) */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("/concept-person-suffering-from-cybersickness-technology-addiction.jpg")',
            backgroundPositionX: "85%",
          }}
        />

        {/* Login Form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-semibold text-[#A259FF] text-center">
            GameVers
          </h2>
          <p className="text-xl text-gray-600 text-center mb-6">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              get started
            </p>
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
          </div>

          <form action={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
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
                placeholder="Enter your email address"
                autoComplete="email"
                aria-label="Email"
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Password Field */}
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
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#A259FF] text-white py-2 rounded-xl hover:bg-[#923AE8] transition duration-200 font-bold"
            >
              Sign In
            </button>

            {/* Navigation to Register */}
            <p className="text-sm text-center text-gray-500">
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
