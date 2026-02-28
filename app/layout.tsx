import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IHUV Technologies",
  description: "AI powered developer portfolios",
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
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">

            <Link
              href="/"
              className="text-lg font-semibold"
            >
              IHUV Technologies
            </Link>

            <nav className="flex gap-6 text-sm">

              <Link href="/">Home</Link>

              <Link href="/pricing">Pricing</Link>

              <Link href="/about">About</Link>

              <Link href="/contact">Contact</Link>

              <Link href="/u/rvalluri">
                Demo
              </Link>

            </nav>

          </div>
        </header>


        {children}


        {/* Footer */}
        <footer className="border-t mt-20">

          <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-gray-500">

            © 2026 IHUV Technologies  
            <br />
            ihuvtech@gmail.com

          </div>

        </footer>


      </body>
    </html>
  );
}