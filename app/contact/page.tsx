export default function Contact() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Contact · <span className="font-medium">We respond by email</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Contact
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Email: <span className="font-medium">ihuvtech@gmail.com</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Send a message</h2>
              <p className="mt-2 text-sm text-slate-600">
                UI only for now (no backend yet).
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Your name"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Your email"
                />
              </div>

              <textarea
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="Message"
                rows={5}
              />

              <button
                type="button"
                className="mt-4 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Send (Coming Soon)
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-semibold text-slate-900">Support</h2>
              <p className="mt-2 text-sm text-slate-600">
                For help, partnerships, or feedback, email us and include:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Your username (if relevant)</li>
                <li>A short description of what you need</li>
                <li>Screenshots (optional)</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                ihuvtech@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}