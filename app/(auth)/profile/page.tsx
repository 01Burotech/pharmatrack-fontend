"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";

type UserRole = "patient" | "doctor" | "pharmacy";

type ProfileProps = {
  role: UserRole;
  user: {
    username?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    kycVerified: boolean;
  };
  patientProfile?: {
    biometrics?: any;
  };
  doctorProfile?: {
    licenseNumber: string;
    clinicName?: string;
    clinicAddress?: string;
  };
  pharmacyProfile?: {
    pharmacyName: string;
    pharmacyAddress: string;
    registrationNumber: string;
  };
};

// Fake user data
const fakeUserData: ProfileProps = {
  role: "doctor",
  user: {
    username: "Dr John",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+22990000000",
    kycVerified: true,
  },
  doctorProfile: {
    licenseNumber: "DOC12345",
    clinicName: "Clinique Pharmatrack",
    clinicAddress: "123 Rue de l'Hôpital, Cotonou",
  },
};

export default function ProfilePageWrapper() {
  const [userData, setUserData] = useState<ProfileProps | null>(null);

  useEffect(() => {
    // Simulation d'un fetch côté client
    setTimeout(() => setUserData(fakeUserData), 500);
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Chargement du profil...</span>
      </div>
    );
  }

  return <ProfilePage {...userData} />;
}

function ProfilePage({ role, user, patientProfile, doctorProfile, pharmacyProfile }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");
  const tabs = ["overview", "settings"];

  // Formulaire pour Settings
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phone: user.phone || "",
      ...(doctorProfile && { clinicName: doctorProfile.clinicName || "", clinicAddress: doctorProfile.clinicAddress || "" }),
      ...(pharmacyProfile && { pharmacyName: pharmacyProfile.pharmacyName, pharmacyAddress: pharmacyProfile.pharmacyAddress }),
    },
  });

  const onSubmit = (data: any) => {
    console.log("Données sauvegardées:", data);
    alert("Profil mis à jour avec succès !");
    // Simule update côté client
    reset(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-white shadow-md w-full lg:w-80 flex flex-col items-center py-8 px-4">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4">
            <Image src="/default-avatar.png" alt="Avatar" fill className="object-cover" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.username || user.firstName}</h2>
          <p className="text-gray-500 text-sm">{role.toUpperCase()}</p>
          {user.kycVerified && (
            <span className="mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              KYC vérifié
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-8 w-full flex justify-around lg:flex-col lg:justify-start lg:space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "overview" | "settings")}
              className={`w-full lg:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab ? "bg-emerald-500 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "overview" ? "Aperçu" : "Paramètres"}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-12">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold text-gray-900">Aperçu du profil</h1>
              <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-sm text-gray-500">Nom complet</h2>
                  <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-500">Email</h2>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <h2 className="text-sm text-gray-500">Téléphone</h2>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
              </div>

              {role === "doctor" && doctorProfile && (
                <div className="bg-white rounded-xl shadow p-6 space-y-2">
                  <h2 className="text-lg font-bold text-gray-900">Profil Docteur</h2>
                  <p><span className="text-gray-500">Licence:</span> {doctorProfile.licenseNumber}</p>
                  {doctorProfile.clinicName && <p><span className="text-gray-500">Clinique:</span> {doctorProfile.clinicName}</p>}
                  {doctorProfile.clinicAddress && <p><span className="text-gray-500">Adresse:</span> {doctorProfile.clinicAddress}</p>}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold text-gray-900">Paramètres du profil</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    {...register("firstName", { required: "Champ requis" })}
                    className={`mt-1 block w-full rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} p-3`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    {...register("lastName", { required: "Champ requis" })}
                    className={`mt-1 block w-full rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} p-3`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    {...register("email", { required: "Champ requis" })}
                    className={`mt-1 block w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} p-3`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    {...register("phone")}
                    className="mt-1 block w-full rounded-lg border border-gray-300 p-3"
                  />
                </div>

                {/* Doctor / Pharmacy specific */}
                {role === "doctor" && doctorProfile && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Clinique</label>
                      <input {...register("clinicName")} className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse Clinique</label>
                      <input {...register("clinicAddress")} className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
                    </div>
                  </>
                )}

                {role === "pharmacy" && pharmacyProfile && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom Pharmacie</label>
                      <input {...register("pharmacyName")} className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse Pharmacie</label>
                      <input {...register("pharmacyAddress")} className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
                    </div>
                  </>
                )}

                <button type="submit" className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors">
                  Sauvegarder
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
