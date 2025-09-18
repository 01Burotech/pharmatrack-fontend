export interface SidebarLink {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  href: string;
}

export interface Medication {
  name: string;
  dosage: string;
  quantity: number;
}

export interface Prescription {
  id: string;
  date: string;
  doctor?: string;
  status: string;
  medications: Medication[];
  patientName?: string;
  source?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  available: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: string;
  lastAppointment: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor?: string;
  patientName?: string;
  reason?: string;
  status: string;
  type?: string;
  location?: string;
  notes?: string;
}

export interface Item {
  name: string;
  quantity: number;
}

export interface Order {
  id?: string;
  date?: string;
  status?: string;
  items?: Item[];
  total?: number;
  pharmacy?: string;
  patient?: string;
  deliveryPerson?: string | null;
  totalOrders?: number;
  revenue?: number;
}

export interface Product {
  id?: string;
  name: string;
  category?: string;
  stock?: number;
  price?: number;
  description?: string;
  sold?: number;
}
