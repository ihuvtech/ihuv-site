"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            I
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            IHUV Technologies
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link className="hover:text-slate-900" href="/">
            Home
          </Link>
          <Link className="hover:text-slate-900" href="/resume">
            Resume
          </Link>
          <Link className="hover:text-slate-900" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-slate-900" href="/about">
            About
          </Link>
          <Link className="hover:text-slate-900" href="/contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
                <span className="text-slate-600">{session.user?.email}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/demo"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Demo
              </Link>
              <Link
                href="/auth/login"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
