// Centralized dummy data for open-source contributors to use
// All demo users share the same password for convenience

export const DEMO_PASSWORD = 'password123';

export type Doctor = {
  id: string;
  role: 'doctor';
  email: string;
  password: string;
  name: string;
  specialization: string;
  availability: string[];
};

export type Patient = {
  id: string;
  role: 'patient';
  email: string;
  password: string;
  name: string;
};

export type Pharmacist = {
  id: string;
  role: 'pharmacist';
  email: string;
  password: string;
  name: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

// === Data Arrays ===
export const doctors: Doctor[] = [
  {
    id: 'doc1',
    role: 'doctor',
    email: 'sarah.j@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    availability: ['09:00 AM', '11:00 AM', '02:00 PM'],
  },
  {
    id: 'doc2',
    role: 'doctor',
    email: 'emily.w@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Dr. Emily White',
    specialization: 'Dermatology',
    availability: ['10:00 AM', '12:00 PM', '03:00 PM'],
  },
];

export const patients: Patient[] = [
  {
    id: 'pat1',
    role: 'patient',
    email: 'john.d@caresync.com',
    password: DEMO_PASSWORD,
    name: 'John Doe',
  },
  {
    id: 'pat2',
    role: 'patient',
    email: 'jane.s@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Jane Smith',
  },
];

export const pharmacists: Pharmacist[] = [
  {
    id: 'pharma1',
    role: 'pharmacist',
    email: 'mike.w@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Mike Wilson',
  },
  {
    id: 'pharma2',
    role: 'pharmacist',
    email: 'susan.c@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Susan Clark',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'pat1',
    doctorId: 'doc1',
    date: '2025-08-15',
    time: '09:00 AM',
    status: 'Confirmed',
  },
  {
    id: 'apt2',
    patientId: 'pat2',
    doctorId: 'doc2',
    date: '2025-08-16',
    time: '10:00 AM',
    status: 'Pending',
  },
];

// === Utility Collections ===
export const allUsers = [...patients, ...doctors, ...pharmacists];

export const usersByEmail: Record<string, Doctor | Patient | Pharmacist> = allUsers.reduce(
  (acc, u) => {
    acc[u.email] = u;
    return acc;
  },
  {} as Record<string, Doctor | Patient | Pharmacist>
);

// === Utility Functions ===
export const findDoctorById = (id: string) =>
  allUsers.find((d) => d.id === id && d.role === 'doctor') as Doctor | undefined;

export const findPatientById = (id: string) =>
  allUsers.find((p) => p.id === id && p.role === 'patient') as Patient | undefined;

export const addUser = (user: Doctor | Patient | Pharmacist) => {
  if (user.role === 'patient') {
    patients.push(user);
  } else if (user.role === 'doctor') {
    doctors.push(user);
  } else if (user.role === 'pharmacist') {
    pharmacists.push(user);
  }
  allUsers.push(user);
  usersByEmail[user.email] = user;
};
