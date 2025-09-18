"use client";
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarLink } from "@/types";

interface PageContainerProps {
  children: ReactNode;
  sidebarLinks: SidebarLink[];
  logoSrc: string;
  brandName: string;
  pageTitle: string;
  avatarUrl: string;
  notificationCount?: number;
  user?: { role: string };
}

const PageContainer = ({
  children,
  sidebarLinks,
  logoSrc,
  brandName,
  pageTitle,
  avatarUrl,
  notificationCount = 0,
  user,
}: PageContainerProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        links={sidebarLinks}
        logoSrc={logoSrc}
        brandName={brandName}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          title={pageTitle}
          avatarUrl={avatarUrl}
          notificationCount={notificationCount}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-6 space-y-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default PageContainer;
