"use client";
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { User, Users, Bell, Lock, Settings } from "lucide-react";
import { pharmacySidebarLinks } from "@/constants/mockData";
import { NotificationsTab, PreferencesTab, ProfileTab, SecurityTab, StaffTab } from "@/components/pharmacy/Settings";

const tabs = [
  { id: "profile", label: "Profil", icon: User, component: <ProfileTab /> },
  { id: "staff", label: "Équipe", icon: Users, component: <StaffTab /> },
  { id: "notifications", label: "Notifications", icon: Bell, component: <NotificationsTab /> },
  { id: "security", label: "Sécurité", icon: Lock, component: <SecurityTab /> },
  { id: "preferences", label: "Préférences", icon: Settings, component: <PreferencesTab /> },
];

export default function PharmacySettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Paramètres"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <div className="flex flex-col sm:flex-row gap-6">
      

        <div className="sm:w-1/4 bg-white rounded-2xl shadow-sm border">
          <nav className="flex sm:flex-col overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-4 w-full text-left hover:bg-gray-50 transition ${
                  activeTab === tab.id ? "bg-gray-50 font-semibold border-l-4 border-teal-600" : ""
                }`}
              >
                <tab.icon className="w-5 h-5 text-teal-600" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sm:w-3/4">{tabs.find((t) => t.id === activeTab)?.component}</div>
      </div>
    </PageContainer>
  );
}
