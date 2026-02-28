"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export default function PortfolioClient({ username }: { username: string }) {
  const router = useRouter();
  const [nextUser, setNextUser] = useState("");

  const safeUsername = (username || "").toString().trim() || "user";
  const isRavi = safeUsername.toLowerCase() === "rvalluri";

  const profile = useMemo(() => {
    if (isRavi) {
      return {
        name: "Ravichandra Valluri",
        headline: "Software Engineer · Cloud & Platform",
        location: "Virginia, USA",
        about:
          "Building cloud systems and platform tooling. Creating IHUV to help developers ship beautiful portfolios fast.",
        skills: [
          "TypeScript",
          "Next.js",
          "React",
          "AWS",
          "Node.js",
          "PostgreSQL",
          "Docker",
          "CI/CD",
        ],
        projects: [
          {
            name: "IHUV Portfolios",
            desc: "Dynamic portfolio pages with premium UI and fast hosting on Vercel.",
            tags: ["Next.js", "Tailwind", "Vercel"],
          },
          {
            name: "Job Tracker (Coming Soon)",
            desc: "Track applications, interviews, and follow-ups in one dashboard.",
            tags: ["Productivity", "Dashboard"],
          },
          {
            name: "AI Resume Tailor (Coming Soon)",
            desc: "Paste a JD → generate a tailored resume version in seconds.",
            tags: ["AI", "Resume"],
          },
        ],
        experience: [
          {
            role: "Software Engineer",
            org: "Amazon",
            period: "2025 – Present",
            bullets: [
              "Worked on platform/service components in the AWS ecosystem.",
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
          email: "ihuvtech@gmail.com",
        },
      };
    }

    const display = safeUsername.replace(/[-_]/g, " ");
    const name = display
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");

    return {
      name,
      headline: "Developer",
      location: "Online",
      about:
        "This is a demo portfolio template. Later, users will edit and save real content in IHUV.",
      skills: ["JavaScript", "React", "Next.js", "HTML", "CSS"],
      projects: [
        {
          name: "Project One",
          desc: "A project description goes here. Add real projects later.",
          tags: ["Web", "Frontend"],
        },
        {
          name: "Project Two",
          desc: "Another project description goes here.",
          tags: ["API", "Backend"],
        },
      ],
      experience: [
        {
          role: "Student / Intern",
          org: "—",
          period: "—",
          bullets: ["Add experience later using the IHUV editor (coming soon)."],
        },
      ],
      education: [
        { school: "Your University", degree: "Your Degree", period: "—" },
      ],
      links: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        email: "example@email.com",
      },
    };
  }, [isRavi, safeUsername]);

  const avatarText = initialsFromName(profile.name);

  return (
    <main>
      {/* Header background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-140px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-160px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
              ← Back Home
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
                Pricing
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-slate-200 bg-white/70 px-3 py-1.5 text-slate-700 hover:bg-white"
              >
                Try another
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
                  {profile.name}
                </h1>
                <p className="mt-1 text-slate-600">{profile.headline}</p>
                <p className="mt-1 text-sm text-slate-500">{profile.location}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Try another username */}
            <div className="w-full md:w-[360px] rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">
                Try another username
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Example: <span className="font-medium">rvalluri</span>
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

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {["rvalluri", "test", "john", "sarah"].map((u) => (
                  <Link
                    key={u}
                    href={`/u/${u}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-white"
                  >
                    /u/{u}
                  </Link>
                ))}
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
              <p className="mt-3 text-slate-700">{profile.about}</p>
            </div>

            {/* Projects */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Projects</h2>
                <span className="text-xs text-slate-500">
                  {profile.projects.length} items
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {profile.projects.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {p.name}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
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
                {profile.experience.map((e) => (
                  <div
                    key={`${e.role}-${e.org}`}
                    className="rounded-3xl border border-slate-200 p-6"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-semibold text-slate-900">
                        {e.role} · {e.org}
                      </div>
                      <div className="text-xs text-slate-500">{e.period}</div>
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                      {e.bullets.map((b) => (
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
                {profile.education.map((ed) => (
                  <div key={ed.school} className="rounded-3xl border border-slate-200 p-6">
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

            {/* Contact card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Contact</h2>
              <p className="mt-3 text-sm text-slate-700">{profile.links.email}</p>
              <p className="mt-1 text-xs text-slate-500">Demo email (placeholder)</p>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${profile.links.email}`}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-800"
                >
                  Email
                </a>
                <Link
                  href="/"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  Home
                </Link>
              </div>
            </div>

            {/* Small note */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              This portfolio is generated from mock data. Later you’ll be able to edit and save
              real profiles.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}