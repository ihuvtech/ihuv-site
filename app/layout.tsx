import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "IHUV Technologies",
    template: "%s · IHUV",
  },
  description: "AI powered developer portfolios and career tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              IHUV Technologies
            </Link>
            <nav className="flex items-center gap-5 text-sm text-slate-600">
              <Link className="hover:text-slate-900" href="/pricing">Pricing</Link>
              <Link className="hover:text-slate-900" href="/about">About</Link>
              <Link className="hover:text-slate-900" href="/contact">Contact</Link>
              <Link className="hover:text-slate-900" href="/u/rvalluri">Demo</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-10 text-center text-xs text-slate-500">
            © 2026 IHUV Technologies · ihuvtech@gmail.com
          </div>
        </footer>
      </body>
    </html>
  );
}