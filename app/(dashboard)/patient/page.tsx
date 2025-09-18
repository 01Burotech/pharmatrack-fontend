"use client";

import PageContainer from "@/components/layout/PageContainer";
import StatsGrid from "@/components/patient/StatsGrid";
import WeightChart from "@/components/patient/WeightChart";
import { sidebarLinksPatient } from "@/constants/mockData";
import { useDashboard } from "@/hooks/usePatient";

export default function PatientDashboardPage() {
  const { stats, graphData } = useDashboard();

  return (
    <PageContainer
      sidebarLinks={sidebarLinksPatient}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Bonjour, Alice"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <StatsGrid stats={stats} />
      <WeightChart data={graphData} />
    </PageContainer>
  );
}
