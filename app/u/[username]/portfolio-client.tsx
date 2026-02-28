"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioClient({ username }: { username: string }) {
  const router = useRouter();
  const [nextUser, setNextUser] = useState("");

  const safeUsername = (username || "").toString();
  const isRavi = safeUsername.toLowerCase() === "rvalluri";

  const profile = isRavi
    ? {
        name: "Ravichandra Valluri",
        title: "Software Engineer",
        location: "Virginia, USA",
        about:
          "Building cloud systems and platforms. Creating IHUV to help developers launch portfolios faster with clean templates.",
        skills: ["TypeScript", "Next.js", "React", "AWS", "Node.js", "PostgreSQL"],
        projects: [
          {
            name: "IHUV Portfolios",
            desc: "Dynamic portfolio pages with clean UI and fast hosting on Vercel.",
          },
          {
            name: "Job Tracker (Coming Soon)",
            desc: "Track applications, interviews, and offers in one dashboard.",
          },
          {
            name: "AI Resume Tailor (Coming Soon)",
            desc: "Generate ATS-friendly resume versions from job descriptions.",
          },
        ],
        experience: [
          {
            role: "Software Engineer",
            company: "Amazon",
            period: "2025 – Present",
            points: [
              "Worked on platform and service components in the AWS ecosystem.",
              "Built internal tooling and automation to improve developer velocity.",
            ],
          },
        ],
        education: [
          {
            school: "Roosevelt University",
            degree: "M.S. Computer Science",
            period: "2023 – 2024",
          },
        ],
        links: {
          github: "https://github.com/",
          linkedin: "https://linkedin.com/",
        },
        contact: "ihuvtech@gmail.com",
      }
    : {
        name: safeUsername,
        title: "Developer",
        location: "Online",
        about:
          "This is a demo portfolio template. Later, users will edit and save real content in IHUV.",
        skills: ["JavaScript", "React", "Next.js"],
        projects: [
          { name: "Project One", desc: "A project description goes here." },
          { name: "Project Two", desc: "Another project description goes here." },
        ],
        experience: [
          {
            role: "Intern / Student Developer",
            company: "—",
            period: "—",
            points: ["Add experience later using the IHUV editor (coming soon)."],
          },
        ],
        education: [
          { school: "Your University", degree: "Your Degree", period: "—" },
        ],
        links: { github: "https://github.com/", linkedin: "https://linkedin.com/" },
        contact: "example@email.com",
      };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="flex items-center justify-between">
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back Home
          </a>
          <a href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
            Pricing
          </a>
        </header>

        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{profile.name}</h1>
              <p className="mt-1 text-slate-600">
                {profile.title} · {profile.location}
              </p>
              <p className="mt-4 text-slate-700">{profile.about}</p>

              <div className="mt-4 flex gap-3 text-sm">
                <a
                  className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:w-80">
              <div className="text-sm font-medium">Try another username</div>

              <div className="mt-2 flex gap-2">
                <input
                  value={nextUser}
                  onChange={(e) => setNextUser(e.target.value)}
                  placeholder="username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                />
                <button
                  onClick={() => {
                    const u = nextUser.trim();
                    if (u) router.push(`/u/${encodeURIComponent(u)}`);
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Go
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Example: <span className="font-medium">rvalluri</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Contact</h2>
            <p className="mt-3 text-sm text-slate-700">{profile.contact}</p>
            <p className="mt-1 text-xs text-slate-500">(placeholder demo)</p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Projects</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {profile.projects.map((p) => (
              <div key={p.name} className="rounded-2xl border border-slate-200 p-5">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-2 text-sm text-slate-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © 2026 IHUV Technologies · Hosted on Vercel
        </footer>
      </div>
    </main>
  );
}