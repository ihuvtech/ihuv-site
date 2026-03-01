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
    <div className="h-10 bg-[#1a222c] border-b border-gray-800/50 flex items-center justify-between px-3 relative z-10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/3 to-transparent pointer-events-none"></div>
      
      {/* Left: Hamburger Menu */}
      <div className="flex items-center gap-3 relative z-10">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-teal-600/20 rounded-lg transition-all duration-200 group"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Notifications */}
        <button className="relative p-1.5 text-gray-400 hover:text-white hover:bg-teal-600/20 rounded-lg transition-all duration-200 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
          </svg>
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
        </button>

        {/* Help */}
        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-teal-600/20 rounded-lg transition-all duration-200 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </button>

        {/* Actions Dropdown */}
        <button
          onClick={(e) => setActionsAnchor(e.currentTarget)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-teal-600/20 rounded-lg transition-all duration-200 border border-transparent hover:border-teal-500/30"
        >
          <span className="font-medium">Actions</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-200">
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
                bgcolor: "#1e293b",
                color: "white",
                border: "1px solid rgba(45, 212, 191, 0.2)",
                borderRadius: "12px",
                mt: 1,
                minWidth: 180,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" });
              setActionsAnchor(null);
            }}
            sx={{ 
              fontSize: "14px",
              py: 1.5,
              px: 2,
              "&:hover": {
                bgcolor: "rgba(45, 212, 191, 0.2)",
              },
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
