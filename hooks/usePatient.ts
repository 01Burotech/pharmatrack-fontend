import { useState } from "react";
import { appointmentsMock, doctorsMock, ordersMock, prescriptionsMock, statsPatient, graphDataPatient} from "@/constants/mockData";

export function useDashboard() {
  const [stats] = useState(statsPatient);
  const [graphData] = useState(graphDataPatient);

  return { stats, graphData };
}

export function useAppointments() {
  const [appointments] = useState(appointmentsMock);
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentsMock[0] | null>(null);

  const filtered = appointments.filter(a =>
    a.doctor.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );

  const selectAppointment = (a: typeof appointmentsMock[0]) => setSelectedAppointment(a);
  const backToList = () => setSelectedAppointment(null);

  return {
    appointments,
    search,
    setSearch,
    filtered,
    selectedAppointment,
    selectAppointment,
    backToList,
  };
}

export function useDoctors() {
  const [doctors] = useState(doctorsMock);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsMock[0] | null>(null);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const selectDoctor = (d: typeof doctorsMock[0]) => setSelectedDoctor(d);
  const backToList = () => setSelectedDoctor(null);

  return {
    doctors,
    search,
    setSearch,
    filtered,
    selectedDoctor,
    selectDoctor,
    backToList,
  };
}

export function useOrders() {
  const [orders] = useState(ordersMock);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersMock[0] | null>(null);

  const filtered = orders.filter(o =>
    o.pharmacy.toLowerCase().includes(search.toLowerCase()) ||
    o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  const selectOrder = (o: typeof ordersMock[0]) => setSelectedOrder(o);
  const backToList = () => setSelectedOrder(null);

  return { orders, search, setSearch, filtered, selectedOrder, selectOrder, backToList };
}

export function usePrescriptions() {
  const [prescriptions] = useState(prescriptionsMock);
  const [search, setSearch] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<typeof prescriptionsMock[0] | null>(null);

  const filtered = prescriptions.filter(p =>
    p.doctor.toLowerCase().includes(search.toLowerCase()) ||
    p.medications.some(m => m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const selectPrescription = (p: typeof prescriptionsMock[0]) => setSelectedPrescription(p);
  const backToList = () => setSelectedPrescription(null);

  return { prescriptions, search, setSearch, filtered, selectedPrescription, selectPrescription, backToList };
}



