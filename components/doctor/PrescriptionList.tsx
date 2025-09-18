"use client";

import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { usePrescriptions } from "@/hooks/useDoctor";
import PrescriptionDetail from "./PrescriptionDetail";

export default function PrescriptionList() {
  const {
    prescriptions,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedPrescription,
    setSelectedPrescription,
  } = usePrescriptions();

  if (selectedPrescription) {
    return <PrescriptionDetail prescription={selectedPrescription} onBack={() => setSelectedPrescription(null)} />;
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/doctor"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Rechercher par patient ou médicament..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter || ""}
          onChange={(e) => setStatusFilter(e.target.value || null)}
        >
          <option value="">Tous statuts</option>
          <option value="Validée">Validée</option>
          <option value="En attente">En attente</option>
        </select>
      </div>

      <div className="space-y-2">
        {prescriptions.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPrescription(p)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.patientName}</p>
              <p className="text-sm text-gray-500">{p.medications.map((m) => m.name).join(", ")} – {p.date}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs ${
                p.status === "Validée" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {p.status}
            </span>
          </div>
        ))}
        {prescriptions.length === 0 && <p className="text-gray-500 text-center mt-4">Aucune prescription trouvée.</p>}
      </div>
    </div>
  );
}
