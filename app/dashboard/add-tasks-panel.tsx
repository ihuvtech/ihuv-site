"use client";

import { useState } from "react";

const nodeTypes = [
  { type: "portfolio", label: "Portfolio", icon: "💼", description: "Display portfolio items", color: "#10b981" },
  { type: "resumes", label: "Resumes", icon: "📋", description: "Manage resume documents", color: "#3b82f6" },
  { type: "update-profile", label: "Update Profile", icon: "👤", description: "Edit profile information", color: "#f59e0b" },
  { type: "update-portfolio", label: "Update Portfolio", icon: "✏️", description: "Edit portfolio content", color: "#8b5cf6" },
];

interface AddTasksPanelProps {
  open: boolean;
  onClose: () => void;
  onNodeSelect: (nodeType: string) => void;
}

export function AddTasksPanel({ open, onClose, onNodeSelect }: AddTasksPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div 
      className={`absolute left-16 top-1/2 -translate-y-1/2 bg-[#1a1d28] rounded-lg shadow-2xl z-40 flex flex-col transition-all duration-300 ease-in-out ${
        open ? 'w-[380px] h-[600px] opacity-100 translate-x-0' : 'w-[380px] h-[600px] opacity-0 -translate-x-4 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Add tasks</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find tasks"
            className="w-full bg-[#0f1117] text-white px-3 py-2 pl-9 rounded border border-gray-600 focus:border-teal-500 focus:outline-none text-sm placeholder-gray-500"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {nodeTypes.map((node) => (
            <button
              key={node.type}
              onClick={() => {
                onNodeSelect(node.type);
                onClose();
              }}
              className="w-full p-2 bg-[#252836] rounded hover:bg-[#2d3142] transition-all duration-200 text-left group border border-transparent hover:border-teal-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{node.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white group-hover:text-teal-400 text-xs font-medium">
                    {node.label}
                  </div>
                  <div className="text-gray-400 text-xs">{node.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>
  );
}
