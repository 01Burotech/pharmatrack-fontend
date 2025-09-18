"use client";
import PageContainer from "@/components/layout/PageContainer";
import StatsGrid from "@/components/doctor/StatsGrid";
import OrdosChart from "@/components/doctor/OrdosChart";
import { doctorSidebarLinks } from "@/constants/mockData";
import { useDoctorDashboard } from "@/hooks/useDoctor";

export default function DoctorDashboardPage() {
  const { stats, graphData } = useDoctorDashboard();

  return (
    <PageContainer
      sidebarLinks={doctorSidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Bonjour, Dr MOUSSA"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <StatsGrid stats={stats} />
      <OrdosChart data={graphData} />
    </PageContainer>
  );
}
