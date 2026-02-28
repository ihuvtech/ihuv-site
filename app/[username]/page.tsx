// app/[username]/page.tsx

type Portfolio = {
  name?: string;
  title?: string;
};

async function getPortfolio(username: string): Promise<Portfolio | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/portfolio/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function PortfolioPage(props: {
  params: Promise<{ username: string }> | { username: string };
}) {
  // ✅ Fix: unwrap params safely (works whether it's a Promise or not)
  const { username } =
    typeof (props.params as any)?.then === "function"
      ? await (props.params as Promise<{ username: string }>)
      : (props.params as { username: string });

  const data = await getPortfolio(username);

  if (!data) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Portfolio not found</h2>
        <p>Username: {username}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{data.name ?? username}</h1>
      <h2>{data.title ?? ""}</h2>

      <hr style={{ margin: "30px 0" }} />

      <p>Username: {username}</p>
    </div>
  );
}