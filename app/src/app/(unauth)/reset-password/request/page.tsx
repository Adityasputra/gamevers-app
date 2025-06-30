"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResetPasswordRequestPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const res = await fetch("/api/reset-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      toast.success(data.message || "Reset link sent to your email!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-[#2c003e] flex items-center justify-center px-4">
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute w-40 h-40 bg-purple-500 opacity-30 rounded-full top-20 left-20 blur-3xl animate-pulse" />
        <div className="absolute w-32 h-32 bg-cyan-500 opacity-20 rounded-full bottom-10 right-32 blur-2xl animate-pulse" />
      </motion.div>

      <ToastContainer />
      <div className="z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-white shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Enter your email to receive a reset link
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                required
              />
              <Mail
                className="absolute left-3 top-2.5 text-gray-300"
                size={18}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
