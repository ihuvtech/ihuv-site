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
    // Load sidebar state from sessionStorage on mount
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('sidebar-open');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Save sidebar state to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sidebar-open', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#16191f]">
      {/* Top Header */}
      <TopHeader 
        workflowName="MyWorkflow-176824B773225" 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} username={session.user?.name || session.user?.email || "User"} />

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <FlowCanvas username={session.user?.name || session.user?.email || "User"} />
        </div>
      </div>
    </div>
  );
}
