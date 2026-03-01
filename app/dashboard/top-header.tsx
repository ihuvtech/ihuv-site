"use client";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface TopHeaderProps {
  workflowName: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function TopHeader({ workflowName, sidebarOpen, onToggleSidebar }: TopHeaderProps) {
  const [actionsAnchor, setActionsAnchor] = useState<null | HTMLElement>(null);

  return (
    <div className="h-12 bg-[#16191f] border-b border-gray-700 flex items-center justify-between px-4">
      {/* Left: Hamburger Menu Only */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>

      {/* Right: Actions Dropdown Only */}
      <div className="flex items-center gap-2">
        {/* Actions Dropdown */}
        <button
          onClick={(e) => setActionsAnchor(e.currentTarget)}
          className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors flex items-center gap-1"
        >
          Actions
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        <Menu
          anchorEl={actionsAnchor}
          open={Boolean(actionsAnchor)}
          onClose={() => setActionsAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#2a2d3a",
                color: "white",
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" });
              setActionsAnchor(null);
            }}
            sx={{ fontSize: "14px" }}
          >
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
