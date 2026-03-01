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
        relative bg-[#2a2d3a] rounded-lg border-2 transition-all duration-200
        ${selected ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-gray-700"}
        ${isHovered ? "shadow-xl border-blue-400" : "shadow-md"}
        w-[225px] min-h-[56px] max-h-[56px]
      `}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
      />

      {/* Node Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="text-3xl flex-shrink-0">{data.icon}</div>

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
                className="w-full bg-[#1e2130] text-white px-2 py-1 rounded border border-blue-500 focus:outline-none text-sm font-semibold"
              />
            ) : (
              <div
                onDoubleClick={handleDoubleClick}
                className="text-white font-semibold text-sm cursor-text hover:text-blue-400 transition"
              >
                {label}
              </div>
            )}

            {/* Description */}
            <div className="text-xs text-gray-400 mt-1">{data.description}</div>
          </div>
        </div>

        {/* Edit Button (shown on hover) */}
        {isHovered && !isEditing && (
          <button
            onClick={handleDoubleClick}
            className="absolute top-2 right-2 w-6 h-6 bg-[#363a4d] hover:bg-[#3f4458] rounded flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
}

// Node type registry
export const customNodeTypes = {
  portfolioNode: PortfolioNode,
};
