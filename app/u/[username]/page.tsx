import PortfolioClient from "./portfolio-client";

type Params = Promise<{ username: string }> | { username: string };

export default async function Page({ params }: { params: Params }) {
  const { username } = await params;
  return <PortfolioClient username={username} />;
}