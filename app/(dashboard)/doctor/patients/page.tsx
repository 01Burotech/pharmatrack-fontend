"use client";
import PageContainer from "@/components/layout/PageContainer";
import PatientList from "@/components/doctor/PatientList";
import { doctorSidebarLinks } from "@/constants/mockData";

export default function DoctorsPatientPage() {
  return (
    <PageContainer
      sidebarLinks={doctorSidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Mes patients"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <PatientList />
    </PageContainer>
  );
}
