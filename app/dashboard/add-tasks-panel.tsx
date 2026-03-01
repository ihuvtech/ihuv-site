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

  const filteredNodes = nodeTypes.filter(node => 
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`absolute left-20 top-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-40 flex flex-col transition-all duration-300 ease-in-out border border-gray-200 ${
        open ? 'w-[320px] h-[500px] opacity-100 translate-x-0' : 'w-[320px] h-[500px] opacity-0 -translate-x-4 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 text-base font-semibold">Add Node</h2>
          <p className="text-gray-500 text-xs mt-0.5">Choose a node type</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="w-full bg-gray-50 text-gray-900 px-3 py-2 pl-9 rounded-md border border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm placeholder-gray-400 transition-all"
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
      <div className="flex-1 overflow-y-auto p-2">
        {filteredNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="text-sm mb-2">🔍</div>
            <div className="text-gray-500 text-sm">No nodes found</div>
            <div className="text-gray-400 text-xs mt-1">Try a different search term</div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {filteredNodes.map((node) => (
              <button
                key={node.type}
                onClick={() => {
                  onNodeSelect(node.type);
                  onClose();
                  setSearchQuery("");
                }}
                className="w-full p-3 bg-white hover:bg-gray-50 rounded-md transition-all text-left group border border-gray-200 hover:border-teal-500"
              >
                <div className="flex items-center gap-2.5">
                  <div className="text-xs">
                    {node.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 group-hover:text-teal-600 text-sm font-medium transition-colors">
                      {node.label}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5 leading-snug">
                      {node.description}
                    </div>
                  </div>
                  <svg 
                    width="8" 
                    height="8" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Tip */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 mt-0.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-teal-600 font-mono text-xs">Shift+A</kbd> to quickly add nodes</span>
        </div>
      </div>
    </div>
  );
}
