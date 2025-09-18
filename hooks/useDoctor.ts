import { useState } from "react";
import { doctorStats, doctorGraphData, docAppointments, docOrders, docPatients, docPrescriptions } from "@/constants/mockData";
import { Patient, Order, Appointment } from "@/types";

export function useDoctorDashboard() {
  const [stats] = useState(doctorStats);
  const [graphData] = useState(doctorGraphData);

  return { stats, graphData };
}

export function useAppointments() {
  const [appointments] = useState(docAppointments);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [search, setSearch] = useState("");

  const filtered = appointments.filter(a =>
    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    a.reason?.toLowerCase().includes(search.toLowerCase())
  );

  const selectAppointment = (appointment: Appointment) => setSelected(appointment);
  const clearSelection = () => setSelected(null);

  return { appointments, selected, filtered, search, setSearch, selectAppointment, clearSelection };
}

export function useOrders() {
  const [orders] = useState<Order[]>(docOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [searchPharmacy, setSearchPharmacy] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.patient?.toLowerCase().includes(searchPatient.toLowerCase()) &&
      o.pharmacy.toLowerCase().includes(searchPharmacy.toLowerCase()) &&
      (statusFilter ? o.status === statusFilter : true)
  );

  const selectOrder = (order: Order) => setSelectedOrder(order);
  const clearSelection = () => setSelectedOrder(null);

  return {
    selectedOrder,
    filteredOrders,
    searchPatient,
    searchPharmacy,
    statusFilter,
    setSearchPatient,
    setSearchPharmacy,
    setStatusFilter,
    selectOrder,
    clearSelection,
  };
}

export function usePatients() {
  const [patients] = useState<Patient[]>(docPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase())
  );

  const selectPatient = (patient: Patient) => setSelectedPatient(patient);
  const clearSelection = () => setSelectedPatient(null);

  return {
    patients,
    selectedPatient,
    filteredPatients,
    search,
    setSearch,
    selectPatient,
    clearSelection,
  };
}

export function usePrescriptions() {
  const [prescriptions] = useState(docPrescriptions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<typeof docPrescriptions[0] | null>(null);

  const filtered = prescriptions.filter((p) =>
    (p.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      p.medications.some((m) => m.name.toLowerCase().includes(search.toLowerCase()))) &&
    (!statusFilter || p.status === statusFilter)
  );

  return {
    prescriptions: filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedPrescription,
    setSelectedPrescription,
  };
}
