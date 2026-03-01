"use client";

import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  username?: string;
}

export function Sidebar({ isOpen, username }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Overview");
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user's portfolio image from their saved portfolios
    const fetchUserImage = async () => {
      if (!username) {
        return;
      }
      
      // Don't fetch if username looks like an email (no portfolio will be found)
      if (username.includes('@')) {
        return;
      }
      
      try {
        const res = await fetch(`/api/portfolio/${username}`);
        
        if (!res.ok) {
          return;
        }
        
        const data = await res.json();
        
        if (data.portfolios && data.portfolios.length > 0) {
          const latestPortfolio = data.portfolios[0];
          
          if (latestPortfolio.data) {
            const portfolioData = latestPortfolio.data;
            
            // Check for profilePhoto in portfolio data (this is where images are actually stored)
            if (portfolioData.profilePhoto) {
              const imageUrl = convertBlobUrlToApiRoute(portfolioData.profilePhoto);
              setUserImage(imageUrl);
              return;
            }
            
            // Fallback to project images if no profile photo
            if (portfolioData.projects && Array.isArray(portfolioData.projects)) {
              const projectWithImage = portfolioData.projects.find((proj: any) => proj.image);
              if (projectWithImage?.image) {
                const imageUrl = convertBlobUrlToApiRoute(projectWithImage.image);
                setUserImage(imageUrl);
                return;
              }
            }
          }
        }
      } catch (error) {
        // Silently fail - user might not have a portfolio yet
      }
    };

    fetchUserImage();
  }, [username]);

  // Helper function to convert blob URL to API route
  const convertBlobUrlToApiRoute = (url: string) => {
    if (!url) return url;
    
    // If it's already an API route, return as is
    if (url.startsWith('/api/image/')) return url;
    
    // If it's a blob URL, convert it
    if (url.includes('blob.vercel-storage.com')) {
      const match = url.match(/blob\.vercel-storage\.com\/(.+)/);
      if (match) {
        return `/api/image/${match[1]}`;
      }
    }
    
    return url;
  };

  const menuItems = [
    { 
      name: "Overview", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      name: "Portfolio", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "Resumes list", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      name: "Recruiter information", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      name: "Slack", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      name: "Email", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "Hot jobs", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      )
    },
  ];

  return (
    <div 
      className={`bg-[#242a39] text-gray-400 h-full overflow-y-auto flex flex-col border-r border-gray-800/50 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-56 opacity-100' : 'w-0 opacity-0'
      }`}
      style={{ 
        overflow: isOpen ? 'auto' : 'hidden',
        paddingLeft: isOpen ? '16px' : '0',
        paddingTop: '16px',
        paddingRight: isOpen ? '16px' : '0'
      }}
    >
      {/* Project Header */}
      <div className="pb-4 mb-3 border-b border-gray-800/50">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img 
              src={userImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} 
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-[#242a39]"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-white truncate">{username || "User"}</div>
            <div className="text-[11px] text-gray-500">Pro Plan</div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 space-y-0.5">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded transition-colors text-left group ${
              activeItem === item.name
                ? 'bg-[#464c57]'
                : 'hover:bg-gray-800/40'
            }`}
          >
            <span className={`${
              activeItem === item.name
                ? 'text-white'
                : 'text-gray-500 group-hover:text-gray-300'
            }`}>
              {item.icon}
            </span>
            <span className="text-[13px] font-normal text-white">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 mt-auto border-t border-gray-800/50">
        <a 
          href="#" 
          className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] hover:text-white hover:bg-gray-800/40 rounded transition-colors group"
        >
          <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-normal">Settings</span>
        </a>
      </div>
    </div>
  );
}
