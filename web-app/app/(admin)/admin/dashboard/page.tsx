/**
 * Purpose: Admin dashboard — shows all beta signup users
 * Route: /admin/dashboard
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BetaUser {
  id: string | number;
  name: string;
  email: string;
  occupation: string;
  usecase: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<BetaUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.error) { setError(data.error); return; }
        setUsers(data);
      })
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.occupation?.toLowerCase().includes(q) ||
      u.usecase?.toLowerCase().includes(q)
    );
  });

  function formatDate(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-[#1f1f1e] text-[#FFE8C9]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#282828] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Open Narrator"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 28, height: "auto" }}
            />
            <div>
              <h1
                className="text-lg font-bold text-[#FFE8C9] leading-none"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-xs text-[#71717a]" style={{ fontFamily: "var(--font-inter)" }}>
                Open Narrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-4 py-2 rounded-xl border border-white/10 text-sm text-[#a1a1aa] hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {loggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Signups", value: users.length },
            { label: "Students", value: users.filter((u) => u.occupation === "student").length },
            { label: "Creators", value: users.filter((u) => u.occupation === "content-creator").length },
            { label: "Businesses", value: users.filter((u) => u.occupation === "business").length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#282828] border border-white/5 rounded-2xl p-5"
            >
              <p className="text-2xl font-bold text-[#FFE8C9]" style={{ fontFamily: "var(--font-rajdhani)" }}>
                {loading ? "—" : stat.value}
              </p>
              <p className="text-xs text-[#71717a] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, occupation or use case..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-[#282828] border border-white/5 text-white placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm transition-all"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Table */}
        <div className="bg-[#282828] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin" />
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-[#71717a] text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              {search ? "No users match your search." : "No signups yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    {["#", "Name", "Email", "Occupation", "Use Case", "Signed Up"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-xs font-semibold text-[#71717a] uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <tr
                      key={user.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 text-[#71717a]">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-[#FFE8C9] whitespace-nowrap">{user.name || "—"}</td>
                      <td className="px-5 py-4 text-[#a1a1aa]">{user.email || "—"}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs bg-white/5 text-[#d4d4d4] capitalize whitespace-nowrap">
                          {user.occupation?.replace("-", " ") || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs bg-[#F59E0B]/10 text-[#F59E0B] capitalize whitespace-nowrap">
                          {user.usecase?.replace("-", " ") || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#71717a] whitespace-nowrap">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && !error && filtered.length > 0 && (
          <p className="text-xs text-[#52525b] mt-3 text-right" style={{ fontFamily: "var(--font-inter)" }}>
            Showing {filtered.length} of {users.length} users
          </p>
        )}
      </main>
    </div>
  );
}
