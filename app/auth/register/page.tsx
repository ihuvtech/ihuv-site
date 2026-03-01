"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/auth/login?registered=true");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
          <div className="mx-auto max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              Get started · <span className="font-medium">Create your account</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-slate-600">
              Sign up to edit and publish your portfolio.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              {error && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <label className="text-sm font-medium text-slate-900">Full name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="Your name"
              />

              <label className="mt-4 block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="you@email.com"
              />

              <label className="mt-4 block text-sm font-medium text-slate-900">
                Username
              </label>
              <input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                required
                minLength={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="username"
              />
              <p className="mt-1 text-xs text-slate-500">
                Your portfolio will be at: /u/username
              </p>

              <label className="mt-4 block text-sm font-medium text-slate-900">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="••••••••"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <div className="mt-4 text-sm text-slate-600">
                Already have an account?{" "}
                <Link className="font-medium text-slate-900 hover:underline" href="/auth/login">
                  Sign in
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                Tip: You can still create a resume without signing in on{" "}
                <Link className="font-medium text-slate-900 hover:underline" href="/resume">
                  /resume
                </Link>
                .
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
