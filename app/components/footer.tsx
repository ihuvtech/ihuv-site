import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">IHUV Technologies</div>
            <div className="mt-1 text-sm text-slate-600">
              AI powered developer portfolios and career tools.
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
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
            <a className="hover:text-slate-900" href="mailto:ihuvtech@gmail.com">
              ihuvtech@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-10 text-xs text-slate-500">
          © 2026 IHUV Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
