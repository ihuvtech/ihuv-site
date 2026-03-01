"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPortfolio = pathname?.startsWith("/u/");

  if (isDashboard || isPortfolio) {
    return null;
  }

  return <Header />;
}
