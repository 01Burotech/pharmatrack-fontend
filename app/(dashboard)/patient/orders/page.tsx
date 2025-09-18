"use client";
import PageContainer from "@/components/layout/PageContainer";
import OrderList from "@/components/patient/OrderList";
import { sidebarLinksPatient } from "@/constants/mockData";

export default function PatientOrdersPage() {
  return (
    <PageContainer
      sidebarLinks={sidebarLinksPatient}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Mes commandes"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <OrderList />
    </PageContainer>
  );
}
