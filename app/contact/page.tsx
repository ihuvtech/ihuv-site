import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact IHUV Technologies via email or form (UI only).",
};

export default function Contact() {
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 via-white to-slate-50" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 to-slate-200 opacity-60 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 opacity-50 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-gradient-to-br from-sky-200 to-blue-200 opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-1.5 text-xs text-slate-700 backdrop-blur shadow-sm animate-fade-in">
            <span className="font-medium">Contact</span>
            <span className="text-slate-400">•</span>
            <span>We respond by email</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Email: <span className="font-semibold text-indigo-600">ihuvtech@gmail.com</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 hover:shadow-2xl transition-shadow duration-500">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">✉️</div>
                <h2 className="text-lg font-bold text-slate-900">Send a message</h2>
              </div>
              <p className="text-base text-slate-600 mb-6">
                UI only for now (no backend yet).
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  placeholder="Your name"
                />
                <input
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  placeholder="Your email"
                />
              </div>

              <textarea
                className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                placeholder="Message"
                rows={6}
              />

              <button
                type="button"
                className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Send (Coming Soon)
              </button>
            </div>

            <div className="rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💬</div>
                <h2 className="text-lg font-bold text-slate-900">Support</h2>
              </div>
              <p className="text-base text-slate-600 mb-6">
                For help, partnerships, or feedback, email us and include:
              </p>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">→</span>
                  <span>Your username (if relevant)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">→</span>
                  <span>A short description of what you need</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">→</span>
                  <span>Screenshots (optional)</span>
                </li>
              </ul>

              <div className="mt-8 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm font-mono text-indigo-600 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                ihuvtech@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
