/**
 * Purpose: Admin login page
 * Route: /admin
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1e] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/open-narrator-full.svg"
            alt="Open Narrator"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 200, height: "auto" }}
          />
        </div>

        <div className="bg-[#282828] border border-white/5 rounded-2xl p-8">
          <h1
            className="text-xl font-bold text-[#FFE8C9] mb-1"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Admin Portal
          </h1>
          <p className="text-sm text-[#71717a] mb-6" style={{ fontFamily: "var(--font-inter)" }}>
            Sign in to manage beta users
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#d4d4d4]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1f1f1e] border border-[#3f3f46] text-white placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#d4d4d4]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1f1f1e] border border-[#3f3f46] text-white placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FFE8C9] text-[#1f1f1e] font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
