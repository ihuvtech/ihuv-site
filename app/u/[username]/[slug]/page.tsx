import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PortfolioClient } from "./portfolio-client";

interface PageProps {
  params: Promise<{
    username: string;
    slug: string;
  }>;
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username, slug } = await params;
  const session = await getServerSession(authOptions);

  // Fetch portfolio from database
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      username: username,
      slug: slug,
      published: true,
    },
    include: {
      user: true,
    },
  });

  if (!portfolio) {
    notFound();
  }

  const isOwner = session?.user?.email === portfolio.user.email;

  return <PortfolioClient portfolio={JSON.parse(JSON.stringify(portfolio))} isOwner={isOwner} />;
}
