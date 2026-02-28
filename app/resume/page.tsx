"use client";

import type { Metadata } from "next";
import { useMemo, useState } from "react";

export default function ResumePage() {
  const [name, setName] = useState("Ravichandra Valluri");
  const [title, setTitle] = useState("Software Engineer");
  const [email, setEmail] = useState("ihuvtech@gmail.com");
  const [phone, setPhone] = useState("+1 (000) 000-0000");
  const [location, setLocation] = useState("Virginia, USA");
  const [summary, setSummary] = useState(
    "Entry-level software engineer building cloud systems and web applications. Strong in TypeScript, React, and AWS. Seeking SWE roles."
  );
  const [skills, setSkills] = useState("TypeScript, Next.js, React, AWS, Node.js, SQL");
  const [exp1, setExp1] = useState("Software Engineer — Amazon (2025–Present)\n• Built platform components and tooling\n• Improved developer velocity with automation");
  const [proj1, setProj1] = useState("IHUV Portfolios\n• Built premium portfolio UI with Next.js\n• Deployed on Vercel with custom domain");
  const [edu, setEdu] = useState("Roosevelt University — M.S. Computer Science (2023–2024)");

  const skillBadges = useMemo(
    () =>
      skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [skills]
  );

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Resume Builder · <span className="font-medium">No signup needed</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Build a resume fast
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Fill your details on the left. Preview updates on the right. Click{" "}
            <span className="font-medium text-slate-900">Download PDF</span> to print/save.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Download PDF
            </button>
            <a
              href="/editor"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Portfolio Editor
            </a>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Your details</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
              <input className="sm:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            </div>

            <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} placeholder="Summary" />

            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />

            <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={exp1} onChange={(e) => setExp1(e.target.value)} rows={5} placeholder="Experience (use new lines + bullets)" />

            <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={proj1} onChange={(e) => setProj1(e.target.value)} rows={5} placeholder="Projects" />

            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={edu} onChange={(e) => setEdu(e.target.value)} placeholder="Education" />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              Download uses your browser “Print to PDF”. Later we can generate a real PDF file from backend.
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div id="resume-preview" className="space-y-5">
              <div>
                <div className="text-2xl font-semibold tracking-tight text-slate-900">{name}</div>
                <div className="text-sm text-slate-700">{title}</div>
                <div className="mt-2 text-sm text-slate-600">
                  {email} · {phone} · {location}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Summary</div>
                <div className="mt-2 text-sm text-slate-700">{summary}</div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skillBadges.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Experience</div>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-700 font-sans">{exp1}</pre>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Projects</div>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-700 font-sans">{proj1}</pre>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Education</div>
                <div className="mt-2 text-sm text-slate-700">{edu}</div>
              </div>
            </div>

            {/* Print styling note */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              For best PDF: click Download PDF → “Save as PDF” → set margins “Default”.
            </div>
          </div>
        </div>
      </section>

      {/* Print-friendly tweaks */}
      <style jsx global>{`
        @media print {
          header, footer { display: none !important; }
          body { background: white !important; }
          main section:first-child { display: none !important; }
          #resume-preview { page-break-inside: avoid; }
        }
      `}</style>
    </main>
  );
}