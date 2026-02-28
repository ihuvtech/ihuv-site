"use client";

import type { Metadata } from "next";
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

const defaultDraft: Draft = {
  name: "Your Name",
  headline: "Software Engineer",
  location: "City, Country",
  email: "you@email.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  about:
    "Write 2–4 sentences about yourself. Mention what you build, your strengths, and what roles you’re seeking.",
  skills: ["TypeScript", "React", "Next.js", "Node.js", "AWS"],
  projects: [
    {
      name: "Project One",
      desc: "A short description of what you built, who it helped, and the outcome.",
      tags: ["Next.js", "UI"],
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      org: "Company",
      period: "2025 – Present",
      bullets: [
        "Built a feature that improved X by Y%",
        "Optimized performance and improved developer velocity",
      ],
    },
  ],
  education: [
    { school: "University", degree: "B.S. / M.S. Computer Science", period: "2023 – 2024" },
  ],
};

function safeParseDraft(raw: string | null): Draft | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return null;
    return obj as Draft;
  } catch {
    return null;
  }
}

function toSlugList(text: string) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function EditorPage() {
  const router = useRouter();

  const [draft, setDraft] = useState<Draft>(defaultDraft);

  // helper fields for "comma separated" inputs
  const [skillsText, setSkillsText] = useState(defaultDraft.skills.join(", "));

  // Load existing draft if present
  useEffect(() => {
    const saved = safeParseDraft(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setDraft(saved);
      setSkillsText((saved.skills || []).join(", "));
    }
  }, []);

  // Derived: show save status
  const draftValid = useMemo(() => {
    return (draft.name || "").trim().length > 0 && (draft.headline || "").trim().length > 0;
  }, [draft.name, draft.headline]);

  function saveDraft() {
    const next: Draft = {
      ...draft,
      skills: toSlugList(skillsText),
    };
    setDraft(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function previewDraft() {
    saveDraft();
    router.push("/preview");
  }

  function resetDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setDraft(defaultDraft);
    setSkillsText(defaultDraft.skills.join(", "));
  }

  // Project editing helpers (single project UI, but supports multiple)
  function updateProject(idx: number, patch: Partial<Draft["projects"][number]>) {
    setDraft((d) => {
      const copy = [...d.projects];
      copy[idx] = { ...copy[idx], ...patch };
      return { ...d, projects: copy };
    });
  }

  function addProject() {
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        { name: "New Project", desc: "Description...", tags: ["Tag"] },
      ],
    }));
  }

  function removeProject(idx: number) {
    setDraft((d) => ({
      ...d,
      projects: d.projects.filter((_, i) => i !== idx),
    }));
  }

  // Experience helpers
  function updateExp(idx: number, patch: Partial<Draft["experience"][number]>) {
    setDraft((d) => {
      const copy = [...d.experience];
      copy[idx] = { ...copy[idx], ...patch };
      return { ...d, experience: copy };
    });
  }

  function addExp() {
    setDraft((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { role: "Role", org: "Company", period: "Year – Year", bullets: ["Bullet 1", "Bullet 2"] },
      ],
    }));
  }

  function removeExp(idx: number) {
    setDraft((d) => ({
      ...d,
      experience: d.experience.filter((_, i) => i !== idx),
    }));
  }

  // Education helpers
  function updateEdu(idx: number, patch: Partial<Draft["education"][number]>) {
    setDraft((d) => {
      const copy = [...d.education];
      copy[idx] = { ...copy[idx], ...patch };
      return { ...d, education: copy };
    });
  }

  function addEdu() {
    setDraft((d) => ({
      ...d,
      education: [...d.education, { school: "School", degree: "Degree", period: "Year – Year" }],
    }));
  }

  function removeEdu(idx: number) {
    setDraft((d) => ({
      ...d,
      education: d.education.filter((_, i) => i !== idx),
    }));
  }

  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Editor · <span className="font-medium">Draft → Preview (no backend)</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Portfolio Editor
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Edit your portfolio data here, then preview a premium template. Saving uses localStorage (frontend only).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveDraft}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={previewDraft}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Preview
            </button>

            <button
              type="button"
              onClick={resetDraft}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Reset
            </button>

            <Link
              href="/demo"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Demo
            </Link>
          </div>

          {!draftValid && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              Add at least a <b>Name</b> and <b>Headline</b> for best preview.
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Profile */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Profile</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Full name"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Headline (e.g., Frontend Engineer)"
                    value={draft.headline}
                    onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Location"
                    value={draft.location}
                    onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Email"
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="GitHub URL"
                    value={draft.github}
                    onChange={(e) => setDraft({ ...draft, github: e.target.value })}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="LinkedIn URL"
                    value={draft.linkedin}
                    onChange={(e) => setDraft({ ...draft, linkedin: e.target.value })}
                  />
                </div>

                <textarea
                  className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="About (2–4 sentences)"
                  rows={4}
                  value={draft.about}
                  onChange={(e) => setDraft({ ...draft, about: e.target.value })}
                />
              </div>

              {/* Skills */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Skills</div>
                <div className="mt-2 text-sm text-slate-600">
                  Comma separated (example: React, Next.js, AWS)
                </div>
                <input
                  className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                />
              </div>

              {/* Projects */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Projects</div>
                  <button
                    type="button"
                    onClick={addProject}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  >
                    + Add
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {draft.projects.map((p, idx) => (
                    <div key={idx} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-slate-500">
                          Project {idx + 1}
                        </div>
                        {draft.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(idx)}
                            className="text-xs font-medium text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <input
                        className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                        placeholder="Project name"
                        value={p.name}
                        onChange={(e) => updateProject(idx, { name: e.target.value })}
                      />

                      <textarea
                        className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                        placeholder="Project description"
                        rows={3}
                        value={p.desc}
                        onChange={(e) => updateProject(idx, { desc: e.target.value })}
                      />

                      <input
                        className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                        placeholder="Tags (comma separated)"
                        value={p.tags.join(", ")}
                        onChange={(e) =>
                          updateProject(idx, { tags: toSlugList(e.target.value) })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Experience */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Experience</div>
                  <button
                    type="button"
                    onClick={addExp}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  >
                    + Add
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {draft.experience.map((e, idx) => (
                    <div key={idx} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-slate-500">
                          Experience {idx + 1}
                        </div>
                        {draft.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExp(idx)}
                            className="text-xs font-medium text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="Role"
                          value={e.role}
                          onChange={(ev) => updateExp(idx, { role: ev.target.value })}
                        />
                        <input
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="Company"
                          value={e.org}
                          onChange={(ev) => updateExp(idx, { org: ev.target.value })}
                        />
                        <input
                          className="sm:col-span-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="Period (e.g., 2024 – 2025)"
                          value={e.period}
                          onChange={(ev) => updateExp(idx, { period: ev.target.value })}
                        />
                      </div>

                      <textarea
                        className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                        rows={4}
                        placeholder={"Bullets (one per line)\nExample:\nImproved X by Y%\nBuilt feature Z"}
                        value={e.bullets.join("\n")}
                        onChange={(ev) =>
                          updateExp(idx, {
                            bullets: ev.target.value
                              .split("\n")
                              .map((b) => b.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Education</div>
                  <button
                    type="button"
                    onClick={addEdu}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  >
                    + Add
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {draft.education.map((ed, idx) => (
                    <div key={idx} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-slate-500">
                          Education {idx + 1}
                        </div>
                        {draft.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEdu(idx)}
                            className="text-xs font-medium text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="School"
                          value={ed.school}
                          onChange={(e) => updateEdu(idx, { school: e.target.value })}
                        />
                        <input
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="Degree"
                          value={ed.degree}
                          onChange={(e) => updateEdu(idx, { degree: e.target.value })}
                        />
                        <input
                          className="sm:col-span-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                          placeholder="Period"
                          value={ed.period}
                          onChange={(e) => updateEdu(idx, { period: e.target.value })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action box */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                <div className="font-semibold text-slate-900">How preview works</div>
                <div className="mt-2">
                  Save Draft writes your data to <span className="font-medium text-slate-900">localStorage</span>.
                  Preview reads it from <span className="font-medium text-slate-900">/preview</span>.
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={previewDraft}
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            Note: Later, after backend + auth, this data will save per user account and publish to /u/username.
          </div>
        </div>
      </section>
    </main>
  );
}