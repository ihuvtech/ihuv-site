import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ConditionalHeader } from "./components/conditional-header";
import { ConditionalFooter } from "./components/conditional-footer";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <ConditionalHeader />

        {children}

        <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}