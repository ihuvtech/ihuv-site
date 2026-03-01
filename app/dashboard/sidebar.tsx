"use client";

interface SidebarProps {
  isOpen: boolean;
  username?: string;
}

export function Sidebar({ isOpen, username }: SidebarProps) {
  return (
    <div 
      className={`bg-[#232530] text-gray-300 h-full overflow-y-auto flex flex-col text-sm border-r border-gray-700 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
      }`}
      style={{ overflow: isOpen ? 'auto' : 'hidden' }}
    >
      {/* Project Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2 text-white">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=default" 
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs truncate">{username || "User"}</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-2">
        <div className="px-2 space-y-0.5">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">📊</span>
            <span className="text-xs">Overview</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">💼</span>
            <span className="text-xs">Portfolio</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">📄</span>
            <span className="text-xs">Resumes list</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">👥</span>
            <span className="text-xs">Recruiter information</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">💬</span>
            <span className="text-xs">Slack</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">📧</span>
            <span className="text-xs">Email</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2d3a] transition-colors text-left">
            <span className="text-base">🔥</span>
            <span className="text-xs">Hot jobs</span>
          </button>
        </div>
      </div>

      {/* Domain Management */}
      <div className="p-3 border-t border-gray-700">
        <a href="#" className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1">
          Settings
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
