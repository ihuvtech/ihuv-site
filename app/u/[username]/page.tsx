type Params = Promise<{ username: string }> | { username: string };

export default async function Portfolio({ params }: { params: Params }) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <a href="/" className="text-sm text-gray-600">
          ← Back Home
        </a>

        <div className="mt-6 bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-semibold">{username}</h1>

          <p className="mt-2 text-gray-600">Developer Portfolio</p>

          <p className="mt-4 text-gray-600">
            This is a demo portfolio template.
          </p>
        </div>

        <footer className="mt-10 text-center text-sm text-gray-500">
          Hosted on IHUV Technologies
        </footer>
      </div>
    </main>
  );
}