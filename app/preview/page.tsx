"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Draft = {
  name: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  about: string;
  skills: string[];
  projects: { name: string; desc: string; tags: string[] }[];
  experience: { role: string; org: string; period: string; bullets: string[] }[];
  education: { school: string; degree: string; period: string }[];
};

const STORAGE_KEY = "ihuv_portfolio_draft_v1";

function initialsFromName(name: string) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0][0] || "?").toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function safeParse(raw: string | null): Draft | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    return obj as Draft;
  } catch {
    return null;
  }
}

export default function PreviewPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  const [nextUser, setNextUser] = useState("");

  useEffect(() => {
    const d = safeParse(localStorage.getItem(STORAGE_KEY));
    setDraft(d);
  }, []);

  const avatarText = useMemo(() => initialsFromName(draft?.name || ""), [draft?.name]);

  if (!draft) {
    return (
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
            <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
            <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              Preview · <span className="font-medium">No draft found</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
              Nothing to preview yet
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Open the editor, fill your details, click <b>Save Draft</b>, then click <b>Preview</b>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Go to Editor
              </Link>
              <Link
                href="/demo"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                View Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Premium header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-140px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-160px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <Link href="/editor" className="text-sm text-slate-600 hover:text-slate-900">
              ← Back to Editor
            </Link>

            <div className="flex items-center gap-3 text-sm">
              <Link href="/demo" className="text-slate-600 hover:text-slate-900">
                Demo
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-slate-200 bg-white/70 px-3 py-1.5 text-slate-700 hover:bg-white"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Identity */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-semibold text-slate-900 shadow-sm">
                {avatarText}
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  {draft.name}
                </h1>
                <p className="mt-1 text-slate-600">{draft.headline}</p>
                <p className="mt-1 text-sm text-slate-500">{draft.location}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={draft.github || "https://github.com/"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={draft.linkedin || "https://linkedin.com/"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${draft.email}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Try /u/username (future) */}
            <div className="w-full md:w-[360px] rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">
                Future published link
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Later you’ll publish to <span className="font-medium">/u/username</span> after signup.
              </p>

              <div className="mt-3 flex gap-2">
                <input
                  value={nextUser}
                  onChange={(e) => setNextUser(e.target.value)}
                  placeholder="username"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  onClick={() => {
                    const u = nextUser.trim();
                    if (u) router.push(`/u/${encodeURIComponent(u)}`);
                  }}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Go
                </button>
              </div>

              <div className="mt-3 text-xs text-slate-600">
                (This goes to your current dynamic route.)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">About</h2>
              <p className="mt-3 text-slate-700">{draft.about}</p>
            </div>

            {/* Projects */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Projects</h2>
                <span className="text-xs text-slate-500">{draft.projects.length} items</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {draft.projects.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
                  >
                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Experience</h2>
              <div className="mt-5 space-y-4">
                {draft.experience.map((e, i) => (
                  <div
                    key={`${e.role}-${e.org}-${i}`}
                    className="rounded-3xl border border-slate-200 p-6"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-semibold text-slate-900">
                        {e.role} · {e.org}
                      </div>
                      <div className="text-xs text-slate-500">{e.period}</div>
                    </div>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                      {(e.bullets || []).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Education</h2>
              <div className="mt-5 space-y-4">
                {draft.education.map((ed, i) => (
                  <div key={`${ed.school}-${i}`} className="rounded-3xl border border-slate-200 p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-semibold text-slate-900">{ed.school}</div>
                      <div className="text-xs text-slate-500">{ed.period}</div>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{ed.degree}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(draft.skills || []).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Contact</h2>
              <p className="mt-3 text-sm text-slate-700">{draft.email}</p>
              <p className="mt-1 text-xs text-slate-500">Draft email (from editor)</p>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${draft.email}`}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-800"
                >
                  Email
                </a>
                <Link
                  href="/editor"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  Edit
                </Link>
              </div>
            </div>

            {/* Note */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              This is a draft preview. Later you’ll publish to <b>/u/username</b> after signup + backend.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}