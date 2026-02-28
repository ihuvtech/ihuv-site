import type { Metadata } from "next";
import PortfolioClient from "./portfolio-client";

type Params = Promise<{ username: string }> | { username: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;
  const u = username || "user";
  return {
    title: `${u} · Portfolio`,
    description: `Portfolio page for ${u} on IHUV Technologies.`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { username } = await params;
  return <PortfolioClient username={username} />;
}