export default function Contact() {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-2 text-slate-600">
          Email us: <span className="font-medium">ihuvtech@gmail.com</span>
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Send a message</h2>
          <p className="mt-2 text-sm text-slate-600">
            This form is UI-only for now (backend coming later).
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Your name"
            />
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Your email"
            />
          </div>

          <textarea
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Message"
            rows={5}
          />

          <button
            className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            type="button"
          >
            Send (Coming Soon)
          </button>
        </div>
      </div>
    </main>
  );
}