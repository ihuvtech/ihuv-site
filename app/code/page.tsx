"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FileItem {
  name: string;
  type: "file" | "directory";
  path: string;
}

interface CommitInfo {
  hash: string;
  author: string;
  date: string;
  message: string;
}

export default function CodeBrowserPage() {
  const [currentPath, setCurrentPath] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [commits, setCommits] = useState<CommitInfo[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepoInfo();
  }, []);

  useEffect(() => {
    if (currentPath) {
      fetchFileContent(currentPath);
    } else {
      fetchFiles("");
    }
  }, [currentPath]);

  const fetchRepoInfo = async () => {
    setLoading(true);
    try {
      // Fetch branches
      const branchRes = await fetch("/api/git/branches");
      const branchData = await branchRes.json();
      setBranches(branchData.branches || ["main"]);
      setCurrentBranch(branchData.current || "main");

      // Fetch recent commits
      const commitRes = await fetch("/api/git/commits");
      const commitData = await commitRes.json();
      setCommits(commitData.commits || []);

      // Fetch root files
      await fetchFiles("");
    } catch (error) {
      console.error("Error fetching repo info:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async (path: string) => {
    try {
      const res = await fetch(`/api/git/files?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      setFiles(data.files || []);
      setFileContent(null);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchFileContent = async (path: string) => {
    try {
      const res = await fetch(`/api/git/file-content?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      if (data.content) {
        setFileContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === "directory") {
      setCurrentPath(file.path);
      fetchFiles(file.path);
    } else {
      setCurrentPath(file.path);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const pathParts = currentPath.split("/").filter(Boolean);
    const newPath = pathParts.slice(0, index + 1).join("/");
    setCurrentPath(newPath);
  };

  const pathParts = currentPath.split("/").filter(Boolean);
  const latestCommit = commits[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                📁 IHUV Tech
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Portfolio Builder</span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={currentBranch}
                onChange={(e) => setCurrentBranch(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    🌿 {branch}
                  </option>
                ))}
              </select>
              <Link
                href="/"
                className="px-4 py-1.5 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Latest Commit Info */}
        {latestCommit && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                  {latestCommit.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{latestCommit.author}</span>
                    <span className="text-gray-500 text-sm">{latestCommit.message}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <span className="font-mono">{latestCommit.hash.substring(0, 7)}</span>
                    <span>•</span>
                    <span>{latestCommit.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">{commits.length} commits</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Browser */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Breadcrumb */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => {
                      setCurrentPath("");
                      setFileContent(null);
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Root
                  </button>
                  {pathParts.map((part, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-400">/</span>
                      <button
                        onClick={() => handleBreadcrumbClick(index)}
                        className="text-blue-600 hover:underline"
                      >
                        {part}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Content or File List */}
              {fileContent ? (
                <div className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{pathParts[pathParts.length - 1]}</h3>
                    <button
                      onClick={() => {
                        setFileContent(null);
                        const parentPath = pathParts.slice(0, -1).join("/");
                        setCurrentPath(parentPath);
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ← Back to files
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono ml-2">{currentPath}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm text-green-400 font-mono leading-relaxed">
                        {fileContent}
                      </code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {files.length === 0 ? (
                    <div className="px-4 py-12 text-center text-gray-500">
                      {loading ? "Loading..." : "No files found"}
                    </div>
                  ) : (
                    files.map((file) => (
                      <button
                        key={file.path}
                        onClick={() => handleFileClick(file)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-xl">
                          {file.type === "directory" ? "📁" : "📄"}
                        </span>
                        <span className="text-sm text-gray-900 font-medium">{file.name}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Commit History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900 text-sm">Recent Commits</h3>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {commits.map((commit) => (
                  <div key={commit.hash} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {commit.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-900 font-medium truncate">
                          {commit.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{commit.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400 font-mono">
                            {commit.hash.substring(0, 7)}
                          </span>
                          <span className="text-xs text-gray-400">{commit.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
