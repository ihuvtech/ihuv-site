"use client";

import { type Node } from "@xyflow/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface NodeDetailsPanelProps {
  node: Node | null;
  onClose: () => void;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  url: string;
  image: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
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
  profilePhoto?: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

interface SavedPortfolio {
  id: string;
  name: string;
  slug: string;
  data: PortfolioData;
  updatedAt: string;
}

export function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'personal' | 'projects' | 'experience' | 'education'>('personal');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [lastNode, setLastNode] = useState<Node | null>(null);
  
  // Debug logging and handle visibility for transition
  useEffect(() => {
    if (node) {
      setLastNode(node);
      setShouldRender(true);
      // Delay visibility to trigger transition
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      // Wait for transition to complete before unmounting
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [node]);
  
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
  const [showSuccess, setShowSuccess] = useState(false);

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
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
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
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
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

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, { title: "", description: "", technologies: [], url: "", image: "" }],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...portfolioData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setPortfolioData({ ...portfolioData, projects: newProjects });
  };

  const removeProject = (index: number) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experience: [...portfolioData.experience, { company: "", position: "", duration: "", description: "" }],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...portfolioData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setPortfolioData({ ...portfolioData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setPortfolioData({
      ...portfolioData,
      experience: portfolioData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    setPortfolioData({
      ...portfolioData,
      education: [...portfolioData.education, { institution: "", degree: "", year: "" }],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...portfolioData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setPortfolioData({ ...portfolioData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    setPortfolioData({
      ...portfolioData,
      education: portfolioData.education.filter((_, i) => i !== index),
    });
  };

  if (!shouldRender) return null;

  const displayNode = node || lastNode;
  const nodeType = displayNode?.data.type;

  const renderPersonalTab = () => (
    <div className="space-y-6">
      {/* Profile Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {portfolioData.profilePhoto ? (
            <div className="relative group">
              <img
                src={portfolioData.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-lg"
              />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs">Change</span>
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {portfolioData.name ? portfolioData.name[0].toUpperCase() : '?'}
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'profile')}
              disabled={uploadingPhoto}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white hover:file:from-indigo-700 hover:file:to-purple-700 file:cursor-pointer disabled:opacity-50 file:transition-all"
            />
            <p className="text-xs text-gray-400 mt-2">
              {uploadingPhoto ? 'Uploading...' : 'Max 5MB. Will be resized to 400x400px'}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={portfolioData.name}
          onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
          placeholder="John Doe"
          className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Professional Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={portfolioData.title}
          onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
          placeholder="Full Stack Developer"
          className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio <span className="text-red-400">*</span>
        </label>
        <textarea
          value={portfolioData.bio}
          onChange={(e) => setPortfolioData({ ...portfolioData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={4}
          className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm resize-none transition-all"
        />
      </div>

      {/* Contact Information */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-indigo-400 mb-4">Contact Information</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={portfolioData.email}
              onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={portfolioData.phone}
              onChange={(e) => setPortfolioData({ ...portfolioData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={portfolioData.location}
              onChange={(e) => setPortfolioData({ ...portfolioData, location: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-indigo-400 mb-4">Social Links</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
            <input
              type="url"
              value={portfolioData.website}
              onChange={(e) => setPortfolioData({ ...portfolioData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
            <input
              type="url"
              value={portfolioData.github}
              onChange={(e) => setPortfolioData({ ...portfolioData, github: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
            <input
              type="url"
              value={portfolioData.linkedin}
              onChange={(e) => setPortfolioData({ ...portfolioData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
            <input
              type="url"
              value={portfolioData.twitter}
              onChange={(e) => setPortfolioData({ ...portfolioData, twitter: e.target.value })}
              placeholder="https://twitter.com/username"
              className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-indigo-400 mb-4">Skills</h4>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            placeholder="Add a skill (press Enter)"
            className="flex-1 bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
          />
          <button
            onClick={addSkill}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-indigo-500/50"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {portfolioData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30 hover:border-indigo-500/50 transition-all"
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
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-indigo-400">Projects</h4>
        <button
          onClick={addProject}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-medium transition-all shadow-lg hover:shadow-indigo-500/50"
        >
          + Add Project
        </button>
      </div>

      {portfolioData.projects.length === 0 ? (
        <div className="text-center py-12 px-4 bg-[#252836] rounded-lg border border-dashed border-gray-600">
          <div className="text-4xl mb-3">📁</div>
          <p className="text-gray-400 text-sm mb-4">No projects yet</p>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="p-4 bg-[#252836] rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Project {index + 1}</span>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg border border-gray-600"
                />
              )}

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'project', index)}
                  disabled={uploadingPhoto}
                  className="block w-full text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:cursor-pointer disabled:opacity-50 file:transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  placeholder="Project name"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Describe your project"
                  rows={3}
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                  placeholder="React, TypeScript, Node.js"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Project URL</label>
                <input
                  type="url"
                  value={project.url}
                  onChange={(e) => updateProject(index, 'url', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderExperienceTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-indigo-400">Work Experience</h4>
        <button
          onClick={addExperience}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-medium transition-all shadow-lg hover:shadow-indigo-500/50"
        >
          + Add Experience
        </button>
      </div>

      {portfolioData.experience.length === 0 ? (
        <div className="text-center py-12 px-4 bg-[#252836] rounded-lg border border-dashed border-gray-600">
          <div className="text-4xl mb-3">💼</div>
          <p className="text-gray-400 text-sm mb-4">No work experience yet</p>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="p-4 bg-[#252836] rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Experience {index + 1}</span>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-400 hover:text-red-300 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder="Company name"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  placeholder="Job title"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  placeholder="Jan 2020 - Present"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  rows={3}
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm resize-none transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEducationTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-indigo-400">Education</h4>
        <button
          onClick={addEducation}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-medium transition-all shadow-lg hover:shadow-indigo-500/50"
        >
          + Add Education
        </button>
      </div>

      {portfolioData.education.length === 0 ? (
        <div className="text-center py-12 px-4 bg-[#252836] rounded-lg border border-dashed border-gray-600">
          <div className="text-4xl mb-3">🎓</div>
          <p className="text-gray-400 text-sm mb-4">No education yet</p>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all"
          >
            Add Your First Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="p-4 bg-[#252836] rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Education {index + 1}</span>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-400 hover:text-red-300 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="University name"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="2020"
                  className="w-full bg-[#1a1d28] text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPortfolioContent = () => (
    <div className="space-y-6">
      {/* Saved Portfolios List */}
      {savedPortfolios.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">
              Saved Portfolios
            </h3>
            <button
              onClick={createNewPortfolio}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + New
            </button>
          </div>
          <div className="space-y-2">
            {savedPortfolios.map((portfolio) => (
              <button
                key={portfolio.id}
                onClick={() => loadPortfolioData(portfolio)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  selectedPortfolioId === portfolio.id
                    ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/20"
                    : "bg-[#252836] border-gray-700 hover:border-indigo-500/50 hover:shadow-md"
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
          Portfolio Name (Internal) <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          placeholder="e.g., Main Portfolio, Tech Portfolio"
          className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
        />
        <p className="text-xs text-gray-400 mt-1.5">
          This name is for your reference only and won't be shown publicly
        </p>
      </div>

      {/* Portfolio Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Portfolio URL Slug <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={portfolioSlug}
          onChange={(e) => setPortfolioSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
          placeholder="e.g., tech-portfolio, design-work"
          className="w-full bg-[#252836] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm font-mono transition-all"
        />
        <p className="text-xs text-gray-400 mt-1.5">
          Your portfolio will be at: /u/{session?.user?.name || 'username'}/{portfolioSlug || 'slug'}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'personal', label: 'Personal Info', icon: '👤' },
            { id: 'projects', label: 'Projects', icon: '📁' },
            { id: 'experience', label: 'Experience', icon: '💼' },
            { id: 'education', label: 'Education', icon: '🎓' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                  : 'bg-[#252836] text-gray-400 hover:text-white hover:bg-[#2d3142]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' && renderPersonalTab()}
        {activeTab === 'projects' && renderProjectsTab()}
        {activeTab === 'experience' && renderExperienceTab()}
        {activeTab === 'education' && renderEducationTab()}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-700">
        <button
          onClick={handleSavePortfolio}
          disabled={loading || !portfolioName || !portfolioSlug || !portfolioData.name || !portfolioData.title || !portfolioData.bio}
          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        
        <button
          onClick={handleViewPortfolio}
          disabled={loading || !portfolioName || !portfolioSlug || !portfolioData.name || !portfolioData.title || !portfolioData.bio}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/50"
        >
          View Portfolio
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        <span className="text-red-400">*</span> Required fields: Portfolio Name, URL Slug, Full Name, Professional Title, and Bio
      </p>
    </div>
  );

  const renderContent = () => {
    switch (nodeType) {
      case "portfolio":
        return renderPortfolioContent();
      default:
        return (
          <div className="text-center py-12 px-4">
            <div className="text-4xl mb-3">🚧</div>
            <p className="text-gray-400 text-sm">This node type is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div
      className="absolute right-0 top-0 h-full w-96 bg-gradient-to-br from-[#1a1d28] to-[#151821] border-l border-gray-700/50 shadow-2xl z-50"
      style={{ 
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        overflow: displayNode ? "auto" : "hidden",
        transition: "transform 300ms ease-in-out",
        willChange: "transform"
      }}
    >
      {/* Success Toast */}
      {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Saved successfully!</span>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Saving...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#1a1d28] to-[#151821] backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{displayNode?.data.icon as React.ReactNode}</span>
          <h2 className="text-white text-base font-semibold">{displayNode?.data.label as React.ReactNode}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded-lg"
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
