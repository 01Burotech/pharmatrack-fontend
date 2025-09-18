import { SidebarLink, StatItem, Doctor, Patient, Prescription, Appointment, Order, Product } from "@/types";
import { HomeIcon, User, ClipboardCheck, FileText, ShoppingBag, Users, Calendar, Settings, Stethoscope, ChartBar, CalendarIcon, ChartBarIcon, ClipboardCheckIcon, FileTextIcon, PlusCircleIcon, ShoppingBagIcon, StethoscopeIcon, UsersIcon } from "lucide-react";

// Sidebar Links
export const sidebarLinksPatient: SidebarLink[] = [
  { label: "Tableau de bord", icon: HomeIcon, href: "/patient", active: true },
  { label: "Mes ordonnances", icon: FileText, href: "/patient/prescriptions" },
  { label: "Rendez-vous", icon: Calendar, href: "/patient/appointments" },
  { label: "Commandes", icon: ShoppingBag, href: "/patient/orders" },
  { label: "Médecins", icon: Stethoscope, href: "/patient/doctors" },
  { label: "Profil", icon: User, href: "/profile" },
];

export const doctorSidebarLinks: SidebarLink[] = [
  { label: "Tableau de bord", icon: HomeIcon, href: "/doctor", active: true },
  { label: "Mes patients", icon: Users, href: "/doctor/patients" },
  { label: "Commandes Urgentes", icon: ShoppingBag, href: "/doctor/orders" },
  { label: "Rendez-vous", icon: Calendar, href: "/doctor/appointments" },
  { label: "Ordonnances", icon: FileText, href: "/doctor/prescriptions" },
  { label: "Profil", icon: User, href: "/doctor/profile" },
];

export const pharmacySidebarLinks: SidebarLink[] = [
  { label: "Tableau de bord", icon: HomeIcon, href: "/pharmacist", active: true },
  { label: "Prescriptions", icon: FileText, href: "/pharmacist/prescriptions" },
  { label: "Commandes", icon: ShoppingBag, href: "/pharmacist/orders" },
  { label: "Produits", icon: ClipboardCheck, href: "/pharmacist/products" },
  { label: "Rapports", icon: ChartBar, href: "/pharmacist/reports" },
  { label: "Paramètres", icon: Settings, href: "/pharmacist/settings" },
];

// Stats for dashboard
export const statsPatient: StatItem[] = [
  { label: "Ordonnances", value: 5, icon: FileTextIcon, color: "bg-emerald-500", href: "/patient/prescriptions" },
  { label: "Médecins", value: 3, icon: StethoscopeIcon, color: "bg-blue-500", href: "/patient/doctors" },
  { label: "RDV", value: 3, icon: CalendarIcon, color: "bg-blue-500", href: "/patient/appointments" },
  { label: "Commandes", value: 2, icon: ShoppingBagIcon, color: "bg-purple-500", href: "/patient/orders" },
  { label: "Activité", value: "Stable", icon: ChartBarIcon, color: "bg-orange-500", href: "/profile" },
];

export const doctorStats: StatItem[] = [
  { label: "Patients suivis", value: 120, icon: UsersIcon, color: "bg-emerald-500", href: "/doctor/patients" },
  { label: "Commandes", value: 5, icon: ShoppingBagIcon, color: "bg-red-500", href: "/doctor/orders" },
  { label: "RDV aujourd’hui", value: 8, icon: CalendarIcon, color: "bg-blue-500", href: "/doctor/appointments" },
  { label: "Ordonnances créées", value: 45, icon: FileTextIcon, color: "bg-purple-500", href: "/doctor/prescriptions" },
  { label: "Activité", value: "Élevée", icon: ChartBarIcon, color: "bg-orange-500", href: "/doctor/activity" },
];

export const pharmacyStats: StatItem[] = [
  { label: "Commandes en cours", value: 42, icon: ShoppingBagIcon, color: "bg-amber-500", href: "/pharmacist/orders" },
  { label: "Produits disponibles", value: 128, icon: ClipboardCheckIcon, color: "bg-green-500", href: "/pharmacist/products" },
  { label: "Ordonnancier Digital", value: 128, icon: FileTextIcon, color: "bg-green-500", href: "/pharmacist/prescriptions" },
  { label: "Revenus mensuels", value: "1 250k", icon: PlusCircleIcon, color: "bg-blue-500", href: "/pharmacist/reports" },
];

// Graph data
export const graphDataPatient = [
  { date: "Jan", poids: 72 },
  { date: "Fév", poids: 71 },
  { date: "Mar", poids: 70 },
  { date: "Avr", poids: 71 },
  { date: "Mai", poids: 69 },
  { date: "Juin", poids: 68 },
];

export const doctorGraphData = [
  { mois: "Jan", ordos: 15 },
  { mois: "Fév", ordos: 18 },
  { mois: "Mar", ordos: 20 },
  { mois: "Avr", ordos: 24 },
  { mois: "Mai", ordos: 22 },
  { mois: "Juin", ordos: 28 },
];

export const pharmacyGraphData = [
  { month: "Jan", orders: 90 },
  { month: "Fév", orders: 120 },
  { month: "Mar", orders: 80 },
  { month: "Avr", orders: 150 },
];

// Mock doctors
export const doctorsMock: Doctor[] = [
  { id: "1", name: "Dr. Dupont", specialty: "Généraliste", location: "Clinique Centrale", rating: 4.5, available: true },
  { id: "2", name: "Dr. Martin", specialty: "Dentiste", location: "Centre Dentaire", rating: 4.0, available: false },
];

// Mock prescriptions
export const prescriptionsMock: Prescription[] = [
  { id: "1", date: "2025-09-10", doctor: "Dr. Dupont", status: "Validée", medications: [{ name: "Paracétamol", dosage: "500mg", quantity: 20 }, { name: "Ibuprofène", dosage: "200mg", quantity: 10 }] },
  { id: "2", date: "2025-08-15", doctor: "Dr. Martin", status: "Expirée", medications: [{ name: "Amoxicilline", dosage: "500mg", quantity: 15 }] },
];

// Mock appointments
export const appointmentsMock: Appointment[] = [
  { id: "1", date: "2025-09-20", time: "10:00", doctor: "Dr. Dupont", status: "À venir", type: "Consultation générale", location: "Clinique Centrale", notes: "Apporter les résultats d’analyses récentes" },
  { id: "2", date: "2025-08-05", time: "14:30", doctor: "Dr. Martin", status: "Passé", type: "Dentiste", location: "Centre Dentaire", notes: "Contrôle annuel" },
];

export const docAppointments: Appointment[] = [
  { id: "1", patientName: "Alice Dupont", date: "2025-09-20", time: "09:30", reason: "Contrôle annuel", status: "Confirmé" },
  { id: "2", patientName: "Jean Martin", date: "2025-09-21", time: "15:00", reason: "Douleur dentaire", status: "En attente" },
];

export const docPrescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Alice Dupont",
    date: "2025-09-10",
    medications: [
      { name: "Paracétamol", dosage: "500mg", quantity: 20 },
      { name: "Ibuprofène", dosage: "200mg", quantity: 10 },
    ],
    status: "Validée",
  },
  {
    id: "2",
    patientName: "Jean Martin",
    date: "2025-08-15",
    medications: [{ name: "Amoxicilline", dosage: "500mg", quantity: 15 }],
    status: "En attente",
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Alice Dupont",
    date: "2025-09-10",
    medications: [
      { name: "Paracétamol", dosage: "500mg", quantity: 20 },
      { name: "Ibuprofène", dosage: "200mg", quantity: 10 },
    ],
    status: "Validée",
    source: "En ligne",
  },
  {
    id: "2",
    patientName: "Jean Martin",
    date: "2025-08-15",
    medications: [{ name: "Amoxicilline", dosage: "500mg", quantity: 15 }],
    status: "En attente",
    source: "Scan",
  },
];

// Mock products pharmacist
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Paracétamol",
    category: "Analgésique",
    stock: 50,
    price: 3.5,
    description: "Paracétamol 500mg, 20 comprimés",
  },
  {
    id: "2",
    name: "Ibuprofène",
    category: "Anti-inflammatoire",
    stock: 30,
    price: 4.0,
    description: "Ibuprofène 200mg, 15 comprimés",
  },
  {
    id: "3",
    name: "Amoxicilline",
    category: "Antibiotique",
    stock: 10,
    price: 5.5,
    description: "Amoxicilline 500mg, 10 comprimés",
  },
];

export const ordersSummary: Order[] = [
  { date: "2025-09-01", totalOrders: 5, revenue: 150 },
  { date: "2025-09-02", totalOrders: 8, revenue: 240 },
  { date: "2025-09-03", totalOrders: 6, revenue: 180 },
  { date: "2025-09-04", totalOrders: 10, revenue: 300 },
];

export const topProducts: Product[] = [
  { name: "Paracétamol", sold: 50 },
  { name: "Ibuprofène", sold: 30 },
  { name: "Amoxicilline", sold: 20 },
];

// Mock orders
export const ordersMock: Order[] = [
  { id: "1", date: "2025-09-12", status: "En livraison", items: [{ name: "Paracétamol 500mg", quantity: 2 }, { name: "Ibuprofène 200mg", quantity: 1 }], total: 25.5, pharmacy: "Pharmacie Centrale" },
  { id: "2", date: "2025-08-20", status: "Livrée", items: [{ name: "Amoxicilline 500mg", quantity: 1 }], total: 15.0, pharmacy: "Pharmacie Martin" },
];

export const docOrders: Order[] = [
  {
    id: "1",
    patient: "Alice Dupont",
    pharmacy: "Pharmacie Centrale",
    items: [
      { name: "Paracétamol 500mg", quantity: 20 },
      { name: "Ibuprofène 200mg", quantity: 10 },
    ],
    status: "En attente",
    date: "2025-09-10",
    total: 45.0,
  },
  {
    id: "2",
    patient: "Jean Martin",
    pharmacy: "Pharmacie du Centre",
    items: [{ name: "Amoxicilline 500mg", quantity: 15 }],
    status: "Validée",
    date: "2025-08-15",
    total: 30.0,
  },
];

export const phOrders: Order[] = [
  {
    id: "1",
    patient: "Alice Dupont",
    date: "2025-09-10",
    items: [
      { name: "Paracétamol", quantity: 20 },
      { name: "Ibuprofène", quantity: 10 },
    ],
    status: "En attente",
    deliveryPerson: null,
  },
  {
    id: "2",
    patient: "Jean Martin",
    date: "2025-09-12",
    items: [{ name: "Amoxicilline", quantity: 15 }],
    status: "Prête",
    deliveryPerson: "Livreur 1",
  },
];

export const docPatients: Patient[] = [
  { id: "1", name: "Alice Dupont", age: 30, status: "Actif", lastAppointment: "2025-09-10" },
  { id: "2", name: "Jean Martin", age: 45, status: "Suivi(e)", lastAppointment: "2025-08-28" },
];
