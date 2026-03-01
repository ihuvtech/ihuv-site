"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { TopHeader } from "./top-header";
import FlowCanvas from "./flow-canvas";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('sidebar-open');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch the actual username from the user's portfolios
    const fetchUsername = async () => {
      if (!session?.user?.email) return;
      
      try {
        const res = await fetch(`/api/portfolio`);
        const data = await res.json();
        
        if (data.ok && data.portfolios && data.portfolios.length > 0) {
          // Get username from the first portfolio
          const fetchedUsername = data.portfolios[0].username;
          setUsername(fetchedUsername);
        }
      } catch (error) {
        // Silently fail
      }
    };

    if (session?.user?.email) {
      fetchUsername();
    }
  }, [session]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sidebar-open', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-white font-medium">Loading your workspace...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Top Header */}
      <TopHeader 
        workflowName="MyWorkflow-176824B773225" 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} username={username || session.user?.email || "User"} />

        {/* Canvas Area with Curved Header */}
        <div className="flex-1 relative flex flex-col">
          {/* Header Section with Breadcrumbs */}
          <div className="relative bg-[#242a39] z-[5]">
            <div className="px-6 py-3">
              {/* Breadcrumbs - Only IHUV */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">IHUV</span>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div 
            className="flex-1 relative"
            style={{ 
              borderTopLeftRadius: '32px',
              overflow: 'hidden',
              marginTop: '-1px'
            }}
          >
            <FlowCanvas username={username || session.user?.email || "User"} />
          </div>
        </div>
      </div>
    </div>
  );
}
