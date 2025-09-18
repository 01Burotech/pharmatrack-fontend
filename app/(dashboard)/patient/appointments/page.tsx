"use client";
import PageContainer from "@/components/layout/PageContainer";
import AppointmentList from "@/components/patient/AppointmentList";
import { sidebarLinksPatient } from "@/constants/mockData";

export default function PatientAppointmentsPage() {
  return (
    <PageContainer
      sidebarLinks={sidebarLinksPatient}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Mes rendez-vous"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <AppointmentList />
    </PageContainer>
  );
}
