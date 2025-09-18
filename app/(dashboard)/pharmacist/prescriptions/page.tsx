"use client";
import PageContainer from "@/components/layout/PageContainer";
import PrescriptionList from "@/components/pharmacy/PrescriptionList";
import { pharmacySidebarLinks } from "@/constants/mockData";

export default function PharmacistPrescriptionsPage() {
  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Ordonnancier Digital"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <PrescriptionList />
    </PageContainer>
  );
}
