"use client";

import PageContainer from "@/components/layout/PageContainer";
import OrderList from "@/components/pharmacy/OrderList";
import { pharmacySidebarLinks } from "@/constants/mockData";


export default function PharmacyOrdersPage() {
  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
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
