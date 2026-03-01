"use client";

import { type Node } from "@xyflow/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface NodeDetailsPanelProps {
  node: Node | null;
  onClose: () => void;
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  profilePhoto?: string; // NEW: Profile photo URL
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    url: string;
    image: string; // Project image URL
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

interface SavedPortfolio {
  id: string;
  name: string;
  slug: string;
  data: PortfolioData;
  updatedAt: string;
}

export function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savedPortfolios, setSavedPortfolios] = useState<SavedPortfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioSlug, setPortfolioSlug] = useState("");
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    profilePhoto: "",
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });
  const [skillInput, setSkillInput] = useState("");

  // Load existing portfolio data when panel opens
  useEffect(() => {
    if (node?.data.type === "portfolio") {
      loadPortfolios();
    }
  }, [node]);

  const loadPortfolios = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.ok && data.portfolios) {
        setSavedPortfolios(data.portfolios);
      }
    } catch (error) {
      // Silent fail
    }
  };

  const loadPortfolioData = (portfolio: SavedPortfolio) => {
    setSelectedPortfolioId(portfolio.id);
    setPortfolioName(portfolio.name);
    setPortfolioSlug(portfolio.slug);
    setPortfolioData(portfolio.data as PortfolioData);
  };

  const createNewPortfolio = () => {
    setSelectedPortfolioId(null);
    setPortfolioName("");
    setPortfolioSlug("");
    setPortfolioData({
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
      profilePhoto: "",
      skills: [],
      projects: [],
      experience: [],
      education: [],
    });
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'project', projectIndex?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      
      if (result.ok) {
        if (type === 'profile') {
          setPortfolioData({ ...portfolioData, profilePhoto: result.url });
        } else if (type === 'project' && projectIndex !== undefined) {
          const newProjects = [...portfolioData.projects];
          newProjects[projectIndex].image = result.url;
          setPortfolioData({ ...portfolioData, projects: newProjects });
        }
      } else {
        alert(`Failed to upload image: ${result.error}${result.details ? ' - ' + result.details : ''}`);
      }
    } catch (error) {
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSavePortfolio = async () => {
    if (!session?.user) {
      alert("Please log in to save your portfolio");
      return;
    }

    if (!portfolioName?.trim()) {
      alert("Please enter a portfolio name");
      return;
    }

    if (!portfolioSlug?.trim()) {
      alert("Please enter a portfolio slug");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          portfolioId: selectedPortfolioId,
          portfolioName: portfolioName.trim(),
          portfolioSlug: portfolioSlug.trim().toLowerCase(),
          data: portfolioData 
        }),
      });

      const result = await res.json();
      
      if (result.ok) {
        alert(`Portfolio saved! URL: ${result.portfolioUrl}`);
        // Reload portfolios list
        await loadPortfolios();
      } else {
        alert(result.error || "Failed to save portfolio");
      }
    } catch (error) {
      alert("Failed to save portfolio. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPortfolio = async () => {
    if (!session?.user) {
      alert("Please log in to view your portfolio");
      return;
    }

    if (!portfolioName?.trim()) {
      alert("Please enter a portfolio name");
      return;
    }

    if (!portfolioSlug?.trim()) {
      alert("Please enter a portfolio slug");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          portfolioId: selectedPortfolioId,
          portfolioName: portfolioName.trim(),
          portfolioSlug: portfolioSlug.trim().toLowerCase(),
          data: portfolioData 
        }),
      });

      const result = await res.json();
      
      if (result.ok) {
        // Open portfolio in new tab
        window.open(result.portfolioUrl, '_blank');
      } else {
        alert(result.error || "Failed to save portfolio");
      }
    } catch (error) {
      alert("Failed to save portfolio. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !portfolioData.skills.includes(skillInput.trim())) {
      setPortfolioData({
        ...portfolioData,
        skills: [...portfolioData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setPortfolioData({
      ...portfolioData,
      skills: portfolioData.skills.filter((s) => s !== skill),
    });
  };

  if (!node) return null;

  const nodeType = node.data.type;

  const renderContent = () => {
    switch (nodeType) {
      case "portfolio":
        return (
          <div className="space-y-6">
            {/* Saved Portfolios List */}
            {savedPortfolios.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                    Saved Portfolios
                  </h3>
                  <button
                    onClick={createNewPortfolio}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    + New
                  </button>
                </div>
                <div className="space-y-2">
                  {savedPortfolios.map((portfolio) => (
                    <button
                      key={portfolio.id}
                      onClick={() => loadPortfolioData(portfolio)}
                      className={`w-full p-3 rounded border text-left transition-colors ${
                        selectedPortfolioId === portfolio.id
                          ? "bg-teal-600/20 border-teal-500"
                          : "bg-[#252836] border-gray-700 hover:border-teal-500/50"
                      }`}
                    >
                      <div className="text-sm text-white font-medium">{portfolio.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-3" />
              </div>
            )}

            {/* Portfolio Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio Name (Internal) *
              </label>
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="e.g., Main Portfolio, Tech Portfolio"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                This name is for your reference only and won't be shown publicly
              </p>
            </div>

            {/* Portfolio Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio URL Slug *
              </label>
              <input
                type="text"
                value={portfolioSlug}
                onChange={(e) => setPortfolioSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                placeholder="e.g., tech-portfolio, design-work"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                Your portfolio will be at: /u/{session?.user?.name || 'username'}/{portfolioSlug || 'slug'}
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Personal Information
              </h3>
              
              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  {portfolioData.profilePhoto && (
                    <img
                      src={portfolioData.profilePhoto}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'profile')}
                      disabled={uploadingPhoto}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:cursor-pointer disabled:opacity-50"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {uploadingPhoto ? 'Uploading...' : 'Max 5MB. Will be resized to 400x400px'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={portfolioData.name}
                  onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  value={portfolioData.title}
                  onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
                  placeholder="Full Stack Developer"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio *
                </label>
                <textarea
                  value={portfolioData.bio}
                  onChange={(e) => setPortfolioData({ ...portfolioData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm resize-none"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Contact Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={portfolioData.email}
                  onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={portfolioData.phone}
                  onChange={(e) => setPortfolioData({ ...portfolioData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={portfolioData.location}
                  onChange={(e) => setPortfolioData({ ...portfolioData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Social Links
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={portfolioData.website}
                  onChange={(e) => setPortfolioData({ ...portfolioData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={portfolioData.github}
                  onChange={(e) => setPortfolioData({ ...portfolioData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={portfolioData.linkedin}
                  onChange={(e) => setPortfolioData({ ...portfolioData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={portfolioData.twitter}
                  onChange={(e) => setPortfolioData({ ...portfolioData, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Skills
              </h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill (press Enter)"
                  className="flex-1 bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#252836] text-teal-400 rounded-full text-sm border border-teal-500/30"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSavePortfolio}
                disabled={loading || !portfolioName || !portfolioSlug || !portfolioData.name || !portfolioData.title || !portfolioData.bio}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded text-sm font-medium transition-colors"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              
              <button
                onClick={handleViewPortfolio}
                disabled={loading || !portfolioName || !portfolioSlug || !portfolioData.name || !portfolioData.title || !portfolioData.bio}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded text-sm font-medium transition-colors"
              >
                View Portfolio
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              * Required fields: Portfolio Name, URL Slug, Full Name, Professional Title, and Bio
            </p>
          </div>
        );

      case "resumes":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resume Documents
              </label>
              <div className="space-y-2">
                <div className="p-3 bg-[#252836] rounded border border-gray-700 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">Resume_2024.pdf</div>
                    <div className="text-xs text-gray-400">Updated 2 days ago</div>
                  </div>
                  <button className="text-teal-400 hover:text-teal-300 text-xs">
                    Edit
                  </button>
                </div>
                <button className="w-full p-2 border border-dashed border-gray-600 rounded text-sm text-gray-400 hover:border-teal-500 hover:text-teal-400 transition-colors">
                  + Upload Resume
                </button>
              </div>
            </div>
          </div>
        );

      case "update-profile":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              <input
                type="text"
                placeholder="React, TypeScript, Node.js"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        );

      case "update-portfolio":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your project"
                rows={4}
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies
              </label>
              <input
                type="text"
                placeholder="React, Next.js, Tailwind"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="w-full bg-[#252836] text-white px-3 py-2 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
              />
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded text-sm font-medium transition-colors">
              Update Portfolio
            </button>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-400">
            No details available for this node type.
          </div>
        );
    }
  };

  return (
    <div
      className={`absolute right-0 top-0 h-full bg-[#1a1d28] border-l border-gray-700 shadow-2xl z-50 transition-all duration-300 ease-in-out ${
        node ? "w-80 opacity-100" : "w-0 opacity-0"
      }`}
      style={{ overflow: node ? "auto" : "hidden" }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Saving...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-[#1a1d28] z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">{node.data.icon}</span>
          <h2 className="text-white text-base font-semibold">{node.data.label}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">{renderContent()}</div>
    </div>
  );
}
