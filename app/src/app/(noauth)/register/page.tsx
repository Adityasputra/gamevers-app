import { BASE_URL } from "@/constants";
import { redirect } from "next/navigation";

export default function RegisterPages({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  async function handleRegister(formData: FormData) {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    
    const ras = await fetch(BASE_URL + "/register", {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async function register(formData: FormData) {
    "use server";

    const newUser = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(BASE_URL + "/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    redirect("/");
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex rounded-lg shadow-lg overflow-hidden bg-gray-800 lg:max-w-4xl">
          <div className="w-1/2 relative hidden lg:block">
            <img
              src="./controller.jpg"
              alt="Space Art"
              className="object-cover h-full w-full bg-[center_left_1rem] rounded"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800 opacity-75"></div>
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-10">
            <h2 className="text-3xl text-center font-semibold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Please Login to Continue
            </p>
            {searchParams.error}
            <form action={handleRegister}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Remember Me
                </label>
                <a href="#" className="text-sm text-indigo-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-colors"
              >
                Register
              </button>
            </form>
            <div className="my-6 text-center text-gray-400">Or</div>
            <div className="flex justify-center space-x-4">
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                <i className="fab fa-google"></i>
              </button>
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                <i className="fab fa-facebook"></i>
              </button>
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                <i className="fab fa-apple"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
