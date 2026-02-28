"use client";

import { useMemo, useState } from "react";

function normalize(text: string) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueWords(text: string) {
  const n = normalize(text);
  if (!n) return new Set<string>();
  return new Set(n.split(" ").filter(Boolean));
}

function extractKeywordsFromJD(jd: string) {
  // Simple heuristic: keep tokens that look like skills/tech or meaningful words.
  // Remove common stopwords.
  const stop = new Set([
    "the","and","or","to","of","in","for","with","on","a","an","as","is","are","be","by","we","you",
    "our","your","will","can","may","should","must","have","has","had","this","that","these","those",
    "from","at","it","they","their","them","also","into","over","more","less","than","such","including",
    "experience","years","year","skills","ability","knowledge","responsible","requirements","preferred",
    "plus","minimum","qualification","qualifications","role","team","work","working","strong","good",
    "design","develop","development","building","build","software","engineer","engineering"
  ]);

  const tokens = normalize(jd)
    .split(" ")
    .filter(Boolean)
    .filter((t) => !stop.has(t))
    .filter((t) => t.length >= 2);

  // Keep unique, but preserve “skill-like” tokens:
  // allow c#, c++, node.js variants simplified by normalize, keep aws, react, etc.
  const uniq = Array.from(new Set(tokens));

  // Prefer common tech words by boosting if they appear (we’ll just keep as list)
  return uniq.slice(0, 80); // cap
}

function countLines(text: string) {
  return (text || "").split("\n").filter((l) => l.trim().length > 0).length;
}

function hasEmail(text: string) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text || "");
}

function hasPhone(text: string) {
  // basic phone detection (US/international-ish)
  return /(\+?\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/.test(text || "");
}

export default function ResumePage() {
  // Inputs
  const [name, setName] = useState("Ravichandra Valluri");
  const [headline, setHeadline] = useState("Software Engineer");
  const [email, setEmail] = useState("ihuvtech@gmail.com");
  const [phone, setPhone] = useState("+1 (000) 000-0000");
  const [location, setLocation] = useState("Virginia, USA");
  const [links, setLinks] = useState("LinkedIn: linkedin.com/in/yourname | GitHub: github.com/yourname");

  const [summary, setSummary] = useState(
    "Entry-level software engineer building cloud systems and web applications. Strong in TypeScript, React, and AWS. Seeking SWE roles."
  );

  const [skills, setSkills] = useState(
    "TypeScript, JavaScript, React, Next.js, Node.js, AWS, SQL, Docker, CI/CD"
  );

  const [experience, setExperience] = useState(
    "Software Engineer — Amazon | 2025–Present\n• Built platform components and internal tooling in AWS ecosystem\n• Automated validation workflows to improve developer velocity\n\nSoftware Engineer Intern — Company | 2024\n• Built a responsive web app and improved performance by 30%\n• Implemented secure APIs with input validation and logging"
  );

  const [projects, setProjects] = useState(
    "IHUV Portfolios | Next.js, Tailwind, Vercel\n• Built premium portfolio pages under /u/username and deployed to custom domain\n• Implemented responsive UI and reusable components\n\nJob Tracker (Prototype) | React\n• Designed UI for tracking applications, interviews, and follow-ups"
  );

  const [education, setEducation] = useState(
    "Roosevelt University — M.S. Computer Science | 2023–2024"
  );

  const [jobDescription, setJobDescription] = useState(
    "Paste the job description here to get a match score. Example: Looking for experience with React, Next.js, TypeScript, AWS, Docker, SQL, and CI/CD..."
  );

  // Derived: “resume text” for matching
  const fullResumeText = useMemo(() => {
    return [
      name,
      headline,
      email,
      phone,
      location,
      links,
      summary,
      skills,
      experience,
      projects,
      education,
    ].join("\n");
  }, [name, headline, email, phone, location, links, summary, skills, experience, projects, education]);

  const jdKeywords = useMemo(() => extractKeywordsFromJD(jobDescription), [jobDescription]);

  const resumeWordSet = useMemo(() => uniqueWords(fullResumeText), [fullResumeText]);

  const keywordMatch = useMemo(() => {
    if (jdKeywords.length === 0) return { matched: [] as string[], missing: [] as string[] };
    const matched: string[] = [];
    const missing: string[] = [];
    for (const k of jdKeywords) {
      if (resumeWordSet.has(k)) matched.push(k);
      else missing.push(k);
    }
    // Keep only meaningful subsets
    return {
      matched: matched.slice(0, 30),
      missing: missing.slice(0, 30),
    };
  }, [jdKeywords, resumeWordSet]);

  // ATS checks + score
  const ats = useMemo(() => {
    const issues: string[] = [];
    const tips: string[] = [];

    const headerLine = `${email} ${phone} ${location} ${links}`;
    if (!hasEmail(headerLine)) issues.push("Missing a valid email in header.");
    if (!hasPhone(headerLine)) issues.push("Missing a valid phone number in header.");

    const expLines = countLines(experience);
    const projLines = countLines(projects);

    const bulletCount =
      (experience.match(/^\s*•/gm)?.length || 0) + (projects.match(/^\s*•/gm)?.length || 0);
    if (bulletCount < 6) tips.push("Add more bullet points (impact + metrics).");

    const hasSummary = normalize(summary).length >= 30;
    const hasSkills = normalize(skills).length >= 10;
    const hasExp = normalize(experience).length >= 30;
    const hasProj = normalize(projects).length >= 30;
    const hasEdu = normalize(education).length >= 10;

    if (!hasSummary) issues.push("Summary is too short.");
    if (!hasSkills) issues.push("Skills section is too short.");
    if (!hasExp) issues.push("Experience section is too short.");
    if (!hasProj) tips.push("Projects section is empty/too short (recommended for early-career).");
    if (!hasEdu) issues.push("Education section is missing/too short.");

    // Very rough “length” estimate: if too many lines, likely > 1 page
    const totalLines =
      countLines(summary) +
      countLines(skills) +
      countLines(experience) +
      countLines(projects) +
      countLines(education) +
      10; // header padding
    if (totalLines > 55) tips.push("Resume might exceed 1 page. Trim bullets or reduce text.");

    // No tables/columns: we are not using them; warn if user adds separators that might be bad
    if (fullResumeText.includes("|") && links.includes("|") === false) {
      tips.push("Avoid heavy table-like formatting; keep simple text with bullets.");
    }

    // Guidance
    tips.push("Use action verbs + measurable impact (e.g., reduced latency 20%).");
    tips.push("Mirror the job description keywords naturally in Skills/Experience.");

    return {
      issues,
      tips,
      expLines,
      projLines,
      totalLines,
      bulletCount,
      sections: { hasSummary, hasSkills, hasExp, hasProj, hasEdu },
    };
  }, [summary, skills, experience, projects, education, email, phone, location, links, fullResumeText]);

  const score = useMemo(() => {
    // Score breakdown (0–100)
    // 1) Keyword overlap (0–55)
    const total = jdKeywords.length || 0;
    const matchedCount = total ? keywordMatch.matched.length : 0;
    const keywordScore = total ? Math.round((matchedCount / Math.min(total, 30)) * 55) : 0; // use capped list

    // 2) ATS essentials (0–25)
    let atsScore = 25;
    atsScore -= ats.issues.length * 6; // heavy penalty
    if (atsScore < 0) atsScore = 0;

    // 3) Structure (0–20)
    let structure = 0;
    if (ats.sections.hasSummary) structure += 4;
    if (ats.sections.hasSkills) structure += 4;
    if (ats.sections.hasExp) structure += 6;
    if (ats.sections.hasProj) structure += 3;
    if (ats.sections.hasEdu) structure += 3;

    let totalScore = keywordScore + atsScore + structure;

    // clamp
    if (totalScore > 100) totalScore = 100;
    if (totalScore < 0) totalScore = 0;

    return {
      total: totalScore,
      keywordScore,
      atsScore,
      structure,
      matchedCount,
      totalKeywords: Math.min(total, 30),
    };
  }, [jdKeywords.length, keywordMatch.matched.length, ats.issues.length, ats.sections]);

  const scoreLabel = useMemo(() => {
    if (score.total >= 85) return { text: "Excellent match", pill: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    if (score.total >= 70) return { text: "Strong match", pill: "bg-green-100 text-green-800 border-green-200" };
    if (score.total >= 55) return { text: "Decent match", pill: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    return { text: "Needs improvement", pill: "bg-red-100 text-red-800 border-red-200" };
  }, [score.total]);

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
            Resume Builder · <span className="font-medium">ATS-friendly</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Resume builder + JD match score
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Paste a job description, edit your resume, and get a score + suggestions.
            Download as PDF using print.
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
          {/* Left: Inputs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 space-y-5">
            {/* Score */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Match score</div>
                  <div className="mt-1 text-sm text-slate-600">
                    Based on keyword overlap + ATS checks (frontend-only heuristic)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${scoreLabel.pill}`}>
                    {scoreLabel.text}
                  </span>
                  <div className="text-3xl font-semibold text-slate-900">{score.total}</div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="text-xs text-slate-500">Keyword score</div>
                  <div className="mt-1 font-semibold text-slate-900">{score.keywordScore}/55</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="text-xs text-slate-500">ATS score</div>
                  <div className="mt-1 font-semibold text-slate-900">{score.atsScore}/25</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="text-xs text-slate-500">Structure</div>
                  <div className="mt-1 font-semibold text-slate-900">{score.structure}/20</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600">
                Matched keywords: <span className="font-medium text-slate-900">{score.matchedCount}</span> /{" "}
                <span className="font-medium text-slate-900">{score.totalKeywords || "—"}</span>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="text-sm font-semibold text-slate-900">Job Description</label>
              <textarea
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                rows={7}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste JD here..."
              />
              <div className="mt-2 text-xs text-slate-600">
                Tip: include the “Requirements/Qualifications” section for best scoring.
              </div>
            </div>

            {/* Suggestions */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">ATS Issues</div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {ats.issues.length === 0 ? (
                    <div className="text-emerald-700">Looks good ✅</div>
                  ) : (
                    ats.issues.map((i) => <div key={i}>• {i}</div>)
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Tips</div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {ats.tips.slice(0, 5).map((t) => (
                    <div key={t}>• {t}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched / Missing keywords */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Keyword insights</div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Matched
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywordMatch.matched.length === 0 ? (
                      <span className="text-sm text-slate-500">—</span>
                    ) : (
                      keywordMatch.matched.map((k) => (
                        <span
                          key={k}
                          className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800"
                        >
                          {k}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Missing (consider adding if true)
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywordMatch.missing.length === 0 ? (
                      <span className="text-sm text-slate-500">—</span>
                    ) : (
                      keywordMatch.missing.map((k) => (
                        <span
                          key={k}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {k}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume inputs */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Resume content</div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" />
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                <input className="sm:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                <input className="sm:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={links} onChange={(e) => setLinks(e.target.value)} placeholder="Links (LinkedIn/GitHub)" />
              </div>

              <label className="mt-4 block text-sm font-medium text-slate-900">Summary</label>
              <textarea className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} />

              <label className="mt-4 block text-sm font-medium text-slate-900">Skills (comma separated)</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={skills} onChange={(e) => setSkills(e.target.value)} />

              <label className="mt-4 block text-sm font-medium text-slate-900">Experience (use bullets)</label>
              <textarea className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" rows={7} value={experience} onChange={(e) => setExperience(e.target.value)} />

              <label className="mt-4 block text-sm font-medium text-slate-900">Projects</label>
              <textarea className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" rows={6} value={projects} onChange={(e) => setProjects(e.target.value)} />

              <label className="mt-4 block text-sm font-medium text-slate-900">Education</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" value={education} onChange={(e) => setEducation(e.target.value)} />
            </div>
          </div>

          {/* Right: ATS preview (print-friendly) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">ATS Preview</div>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
              >
                Print / Save PDF
              </button>
            </div>

            <div id="resume-preview" className="mt-5">
              {/* One-column, ATS-friendly */}
              <div className="border-b border-slate-200 pb-4">
                <div className="text-2xl font-semibold tracking-tight text-slate-900">{name}</div>
                <div className="mt-1 text-sm text-slate-700">{headline}</div>
                <div className="mt-2 text-sm text-slate-600">
                  {email} · {phone} · {location}
                </div>
                <div className="mt-1 text-sm text-slate-600">{links}</div>
              </div>

              <div className="mt-4 space-y-4">
                <section>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Summary
                  </div>
                  <div className="mt-2 text-sm text-slate-800">{summary}</div>
                </section>

                <section>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Skills
                  </div>
                  <div className="mt-2 text-sm text-slate-800">{skills}</div>
                </section>

                <section>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Experience
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-800 font-sans">
                    {experience}
                  </pre>
                </section>

                <section>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Projects
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-800 font-sans">
                    {projects}
                  </pre>
                </section>

                <section>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Education
                  </div>
                  <div className="mt-2 text-sm text-slate-800">{education}</div>
                </section>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                ATS tip: keep one column, plain text, standard headings, and bullet points. Avoid icons/tables.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer { display: none !important; }
          body { background: #fff !important; }
          /* hide the left editor panel & header section; print only preview */
          main > section:first-child { display: none !important; }
          main > section:nth-child(2) > div { grid-template-columns: 1fr !important; }
          main > section:nth-child(2) > div > div:first-child { display: none !important; }

          #resume-preview {
            margin: 0 !important;
          }

          /* Ensure clean text */
          pre {
            white-space: pre-wrap !important;
          }
        }
      `}</style>
    </main>
  );
}