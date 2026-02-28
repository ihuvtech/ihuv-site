import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "IHUV Technologies",
    template: "%s · IHUV",
  },
  description: "AI powered developer portfolios and career tools.",
  openGraph: {
    title: "IHUV Technologies",
    description: "AI powered developer portfolios and career tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                I
              </span>

              <span className="text-sm font-semibold tracking-tight text-slate-900">
                IHUV Technologies
              </span>
            </Link>

            {/* Center links */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">

              <Link
                href="/"
                className="hover:text-slate-900"
              >
                Home
              </Link>

              <Link
                href="/pricing"
                className="hover:text-slate-900"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="hover:text-slate-900"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hover:text-slate-900"
              >
                Contact
              </Link>

            </nav>

            {/* Right buttons */}
            <div className="flex items-center gap-2">

              {/* Demo button */}
              <Link
                href="/demo"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Demo
              </Link>

              {/* Pro button */}
              <Link
                href="/pricing"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Get Pro
              </Link>

            </div>

          </div>
        </header>

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="text-sm font-semibold text-slate-900">
                  IHUV Technologies
                </div>

                <div className="mt-1 text-sm text-slate-600">
                  AI powered developer portfolios and career tools.
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">

                <Link
                  href="/pricing"
                  className="hover:text-slate-900"
                >
                  Pricing
                </Link>

                <Link
                  href="/about"
                  className="hover:text-slate-900"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="hover:text-slate-900"
                >
                  Contact
                </Link>

                <a
                  href="mailto:ihuvtech@gmail.com"
                  className="hover:text-slate-900"
                >
                  ihuvtech@gmail.com
                </a>

              </div>

            </div>

            <div className="mt-10 text-xs text-slate-500">
              © 2026 IHUV Technologies. All rights reserved.
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}