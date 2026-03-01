"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPortfolio = pathname?.startsWith("/u/");

  if (isDashboard || isPortfolio) {
    return null;
  }

  return <Footer />;
}
