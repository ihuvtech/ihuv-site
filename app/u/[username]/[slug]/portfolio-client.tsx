"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PortfolioClientProps {
  portfolio: any;
  isOwner: boolean;
}

export function PortfolioClient({ portfolio, isOwner }: PortfolioClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState(portfolio.data);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId: portfolio.id,
          portfolioName: portfolio.name,
          portfolioSlug: portfolio.slug,
          data: data,
        }),
      });

      const result = await res.json();
      if (result.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        alert(result.error || "Failed to save");
      }
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-white relative">
      {/* Edit Controls */}
      {isOwner && (
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:shadow-xl"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Mode
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-slate-800 transition-all hover:shadow-xl"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all hover:shadow-xl disabled:bg-gray-400"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setData(portfolio.data);
                }}
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all hover:shadow-xl"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      {isEditing && (
        <div className="fixed top-24 right-6 z-40 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 shadow-lg max-w-xs">
          <p className="text-sm text-yellow-800 font-medium">
            ✏️ Edit Mode Active
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Click on any text to edit it
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-32 border-b border-slate-100">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            {/* Avatar with animation */}
            <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-5xl font-bold mb-8 shadow-2xl animate-scaleIn ring-4 ring-white ring-offset-4 overflow-hidden">
              {data.profilePhoto && data.profilePhoto.trim() !== "" ? (
                <img
                  src={data.profilePhoto}
                  alt={data.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{data.name?.charAt(0) || "U"}</span>
              )}
            </div>

            <h1 className="text-7xl font-extrabold tracking-tight text-slate-900 mb-6 animate-fadeInUp">
              {isEditing ? (
                <input
                  type="text"
                  value={data.name || ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full text-center border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              ) : (
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {data.name}
                </span>
              )}
            </h1>
            
            <p className="text-3xl text-indigo-600 font-semibold mb-8 animate-fadeInUp animation-delay-200">
              {isEditing ? (
                <input
                  type="text"
                  value={data.title || ""}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="Your Title"
                  className="w-full text-center border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              ) : (
                data.title
              )}
            </p>
            
            <div className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-400">
              {isEditing ? (
                <textarea
                  value={data.bio || ""}
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                  placeholder="Your bio"
                  className="w-full border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  rows={4}
                />
              ) : (
                data.bio
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-700 animate-fadeInUp animation-delay-600">
              {(isEditing || data.email) && (
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover-lift">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {isEditing ? (
                    <input
                      type="email"
                      value={data.email || ""}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="email@example.com"
                      className="border-2 border-indigo-300 rounded-lg px-3 py-1 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <a href={`mailto:${data.email}`} className="font-medium hover:text-indigo-600 transition-colors">
                      {data.email}
                    </a>
                  )}
                </div>
              )}
              {(isEditing || data.phone) && (
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover-lift">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={data.phone || ""}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="border-2 border-indigo-300 rounded-lg px-3 py-1 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <span className="font-medium">{data.phone}</span>
                  )}
                </div>
              )}
              {(isEditing || data.location) && (
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover-lift">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.location || ""}
                      onChange={(e) => setData({ ...data, location: e.target.value })}
                      placeholder="City, Country"
                      className="border-2 border-indigo-300 rounded-lg px-3 py-1 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <span className="font-medium">{data.location}</span>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-10 flex justify-center gap-4 flex-wrap animate-fadeInUp animation-delay-800">
              {(isEditing || data.website) && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover-lift">
                  <span className="text-xl">🌐</span>
                  {isEditing ? (
                    <input
                      type="url"
                      value={data.website || ""}
                      onChange={(e) => setData({ ...data, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="text-sm border-2 border-white rounded-lg px-3 py-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  ) : (
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                      Website
                    </a>
                  )}
                </div>
              )}
              {(isEditing || data.github) && (
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover-lift">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {isEditing ? (
                    <input
                      type="url"
                      value={data.github || ""}
                      onChange={(e) => setData({ ...data, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="text-sm border-2 border-white rounded-lg px-3 py-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  ) : (
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                      GitHub
                    </a>
                  )}
                </div>
              )}
              {(isEditing || data.linkedin) && (
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover-lift">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  {isEditing ? (
                    <input
                      type="url"
                      value={data.linkedin || ""}
                      onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="text-sm border-2 border-white rounded-lg px-3 py-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  ) : (
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {(data.skills && data.skills.length > 0) || isEditing ? (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Skills & Expertise
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
              <p className="mt-4 text-lg text-slate-600">Technologies and tools I work with</p>
            </div>
            
            {isEditing ? (
              <div className="max-w-2xl mx-auto">
                <p className="text-sm text-slate-600 mb-3 font-medium">Add skills (comma-separated):</p>
                <textarea
                  value={data.skills?.join(", ") || ""}
                  onChange={(e) => setData({ ...data, skills: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                  className="w-full border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  rows={3}
                  placeholder="React, TypeScript, Node.js, Python, AWS"
                />
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {data.skills?.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-2xl bg-white border-2 border-indigo-200 px-6 py-3 text-base font-semibold text-slate-800 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition-all shadow-sm hover:shadow-md hover-lift animate-scaleIn"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="mr-2 text-indigo-600">✦</span>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Projects Section */}
      {(data.projects && data.projects.length > 0) || isEditing ? (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Projects</h2>
              <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                {data.projects?.map((project: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-xl border-2 border-indigo-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-slate-900">Project {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newProjects = data.projects.filter((_: any, i: number) => i !== index);
                          setData({ ...data, projects: newProjects });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={project.title || ""}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].title = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      placeholder="Project Title"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <textarea
                      value={project.description || ""}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].description = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      placeholder="Project Description"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                      rows={3}
                    />
                    <input
                      type="text"
                      value={project.technologies?.join(", ") || ""}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].technologies = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                        setData({ ...data, projects: newProjects });
                      }}
                      placeholder="Technologies (comma-separated)"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="url"
                      value={project.url || ""}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[index].url = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      placeholder="Project URL"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newProjects = [...(data.projects || []), { title: "", description: "", technologies: [], url: "" }];
                    setData({ ...data, projects: newProjects });
                  }}
                  className="w-full p-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  + Add Project
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {data.projects?.map((project: any, index: number) => (
                  <div
                    key={index}
                    className="group rounded-2xl border-2 border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        View Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Experience Section */}
      {(data.experience && data.experience.length > 0) || isEditing ? (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Work Experience</h2>
              <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                {data.experience?.map((exp: any, index: number) => (
                  <div key={index} className="p-6 bg-white rounded-xl border-2 border-indigo-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-slate-900">Experience {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newExperience = data.experience.filter((_: any, i: number) => i !== index);
                          setData({ ...data, experience: newExperience });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={exp.position || ""}
                      onChange={(e) => {
                        const newExperience = [...data.experience];
                        newExperience[index].position = e.target.value;
                        setData({ ...data, experience: newExperience });
                      }}
                      placeholder="Position"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={exp.company || ""}
                      onChange={(e) => {
                        const newExperience = [...data.experience];
                        newExperience[index].company = e.target.value;
                        setData({ ...data, experience: newExperience });
                      }}
                      placeholder="Company"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={exp.duration || ""}
                      onChange={(e) => {
                        const newExperience = [...data.experience];
                        newExperience[index].duration = e.target.value;
                        setData({ ...data, experience: newExperience });
                      }}
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <textarea
                      value={exp.description || ""}
                      onChange={(e) => {
                        const newExperience = [...data.experience];
                        newExperience[index].description = e.target.value;
                        setData({ ...data, experience: newExperience });
                      }}
                      placeholder="Description"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newExperience = [...(data.experience || []), { position: "", company: "", duration: "", description: "" }];
                    setData({ ...data, experience: newExperience });
                  }}
                  className="w-full p-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  + Add Experience
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {data.experience?.map((exp: any, index: number) => (
                  <div key={index} className="relative pl-8 border-l-4 border-indigo-600">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-600 border-4 border-slate-50" />
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {exp.position}
                      </h3>
                      <p className="text-indigo-600 font-medium mt-1">
                        {exp.company}
                      </p>
                      <p className="text-slate-500 text-sm mt-1">{exp.duration}</p>
                      <p className="mt-4 text-slate-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Education Section */}
      {(data.education && data.education.length > 0) || isEditing ? (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Education</h2>
              <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                {data.education?.map((edu: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-xl border-2 border-indigo-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-slate-900">Education {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newEducation = data.education.filter((_: any, i: number) => i !== index);
                          setData({ ...data, education: newEducation });
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) => {
                        const newEducation = [...data.education];
                        newEducation[index].degree = e.target.value;
                        setData({ ...data, education: newEducation });
                      }}
                      placeholder="Degree"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={edu.institution || ""}
                      onChange={(e) => {
                        const newEducation = [...data.education];
                        newEducation[index].institution = e.target.value;
                        setData({ ...data, education: newEducation });
                      }}
                      placeholder="Institution"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={edu.year || ""}
                      onChange={(e) => {
                        const newEducation = [...data.education];
                        newEducation[index].year = e.target.value;
                        setData({ ...data, education: newEducation });
                      }}
                      placeholder="Year (e.g., 2016 - 2020)"
                      className="w-full border-2 border-indigo-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newEducation = [...(data.education || []), { degree: "", institution: "", year: "" }];
                    setData({ ...data, education: newEducation });
                  }}
                  className="w-full p-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  + Add Education
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {data.education?.map((edu: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">
                          {edu.degree}
                        </h3>
                        <p className="text-indigo-600 font-medium mt-1">
                          {edu.institution}
                        </p>
                        <p className="text-slate-500 text-sm mt-1">{edu.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Built with ❤️ using IHUV Technologies
          </p>
        </div>
      </footer>
    </main>
  );
}
