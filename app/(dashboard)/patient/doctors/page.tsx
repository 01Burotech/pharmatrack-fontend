"use client";
import PageContainer from "@/components/layout/PageContainer";
import DoctorList from "@/components/patient/DoctorList";
import { sidebarLinksPatient } from "@/constants/mockData";

export default function PatientDoctorsPage() {
  return (
    <PageContainer
      sidebarLinks={sidebarLinksPatient}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Médecins"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <DoctorList />
    </PageContainer>
  );
}
