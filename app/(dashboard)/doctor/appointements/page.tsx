"use client";
import PageContainer from "@/components/layout/PageContainer";
import AppointmentList from "@/components/doctor/AppointmentList";
import { doctorSidebarLinks } from "@/constants/mockData";


export default function DoctorsAppointmentsPage() {
  return (
    <PageContainer
      sidebarLinks={doctorSidebarLinks}
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
