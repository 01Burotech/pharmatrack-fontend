"use client";
import PageContainer from "@/components/layout/PageContainer";
import OrderList from "@/components/doctor/OrderList";
import { doctorSidebarLinks } from "@/constants/mockData";


export default function DoctorOrdersPage() {
  return (
    <PageContainer
      sidebarLinks={doctorSidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Commandes"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <OrderList />
    </PageContainer>
  );
}
