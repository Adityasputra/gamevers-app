"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("Authorization");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("Authorization");
    setIsLoggedIn(false);
    router.push("/");
  };

  return isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md bg-[#A259FF] hover:bg-[#923AE8] text-white font-semibold transition-colors duration-200 shadow-sm focus:outline-none"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => router.push("/login")}
      className="px-4 py-2 rounded-md bg-[#A259FF] hover:bg-[#923AE8] text-white font-semibold transition-colors duration-200 shadow-sm focus:outline-none"
    >
      Login
    </button>
  );
}
