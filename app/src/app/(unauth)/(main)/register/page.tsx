import { BASE_URL } from "@/constant";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return redirect("/register?error=" + encodeURIComponent(result.message));
    }

    redirect("/login");
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg shadow-[#A259FF] overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("/concept-person-suffering-from-cybersickness-technology-addiction.jpg")',
            backgroundPositionX: "85%",
          }}
        />

        {/* Form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-semibold text-[#A259FF] text-center">
            GameVers
          </h2>
          <p className="text-xl text-gray-600 text-center mb-6">
            Create an account
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              get started
            </p>
            <span className="border-b border-[#A259FF] w-1/5 lg:w-1/4" />
          </div>

          <form action={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-[#A259FF] block mb-1"
              >
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="text-sm font-semibold text-[#A259FF] block mb-1"
              >
                Username
              </label>
              <input
                required
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Email */}
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
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
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
                autoComplete="new-password"
                className="w-full rounded-lg py-2 px-4 bg-gray-200 text-[#923AE8] focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#A259FF] text-white font-bold py-2 px-4 rounded-xl hover:bg-[#923AE8] transition duration-200"
            >
              Sign Up
            </button>

            {/* Link to Login */}
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#A259FF] hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
