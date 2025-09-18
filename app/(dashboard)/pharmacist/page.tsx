"use client";

import PageContainer from "@/components/layout/PageContainer";
import StatsGrid from "@/components/pharmacy/StatsGrid";
import OrdersChart from "@/components/pharmacy/OrdersChart";
import { pharmacySidebarLinks } from "@/constants/mockData";
import { usePharmacyDashboard } from "@/hooks/usePharmacy";

export default function PharmacyDashboardPage() {
  const { stats, graphData } = usePharmacyDashboard();

  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
      logoSrc="/logo.png"
      brandName="PharmaTrack"
      pageTitle="Tableau de bord Pharmacie"
      avatarUrl="/avatar.png"
      notificationCount={3}
    >
      <StatsGrid stats={stats} />
      <OrdersChart data={graphData} />
    </PageContainer>
  );
}
