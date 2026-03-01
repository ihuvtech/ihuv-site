"use client";

import { Handle, Position } from "@xyflow/react";
import { useState, useCallback } from "react";

export interface PortfolioNodeData {
  label: string;
  icon: string;
  description: string;
  type: string;
  content?: Record<string, any>;
}

interface PortfolioNodeProps {
  data: PortfolioNodeData;
  id: string;
  selected?: boolean;
}

export function PortfolioNode({ data, id, selected }: PortfolioNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    // TODO: Update node data in store
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setLabel(data.label);
      setIsEditing(false);
    }
  }, [data.label]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-[#131920] rounded-xl transition-all duration-300
        ${selected ? "border-2 border-teal-500 shadow-xl shadow-teal-500/20" : "shadow-[0_0_0_2px_#424650]"}
        ${isHovered ? "bg-[#1B232D] shadow-[0_0_0_2px_#424650] shadow-lg" : ""}
        w-[225px] h-[56px]
      `}
    >

      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-teal-500 !border-2 !border-[#131920] !shadow-lg"
      />

      {/* Node Content */}
      <div className="px-3 py-2 relative z-10 h-full flex items-center">
        <div className="flex items-center gap-2 w-full">
          {/* Icon */}
          <div className="text-2xl flex-shrink-0">
            {data.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Editable Title */}
            {isEditing ? (
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full bg-[#0d1117] text-white px-2 py-1 rounded border border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm font-medium"
              />
            ) : (
              <div
                onDoubleClick={handleDoubleClick}
                className="text-white font-medium text-sm cursor-text hover:text-teal-400 transition-colors truncate"
              >
                {label}
              </div>
            )}
          </div>

          {/* Edit Button (shown on hover) */}
          {isHovered && !isEditing && (
            <button
              onClick={handleDoubleClick}
              className="flex-shrink-0 w-6 h-6 bg-teal-600 hover:bg-teal-700 rounded flex items-center justify-center text-white transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-teal-500 !border-2 !border-[#131920] !shadow-lg"
      />
    </div>
  );
}

// Node type registry
export const customNodeTypes = {
  portfolioNode: PortfolioNode,
};
