"use client";
import PageContainer from "@/components/layout/PageContainer";
import PrescriptionList from "@/components/patient/PrescriptionList";
import { sidebarLinksPatient } from "@/constants/mockData";

export default function PatientPrescriptionsPage() {
  return (
    <PageContainer
      sidebarLinks={sidebarLinksPatient}
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
