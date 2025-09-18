"use client";

import PageContainer from "@/components/layout/PageContainer";
import PrescriptionList from "@/components/doctor/PrescriptionList";
import { doctorSidebarLinks } from "@/constants/mockData";

export default function DoctorPrescriptionsPage() {
  return (
    <PageContainer
      sidebarLinks={doctorSidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Mes ordonnances"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <PrescriptionList />
    </PageContainer>
  );
}
