"use client";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import PatientDetail from "./PatientDetail";
import { usePatients } from "@/hooks/useDoctor";

export default function PatientList() {
  const { selectedPatient, filteredPatients, search, setSearch, selectPatient, clearSelection } = usePatients();

  if (selectedPatient) return <PatientDetail patient={selectedPatient} onBack={clearSelection} />;

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/doctor"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <input
        type="text"
        placeholder="Rechercher par nom ou statut..."
        className="w-full p-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filteredPatients.map((p) => (
          <div
            key={p.id}
            onClick={() => selectPatient(p)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">{p.status} – Dernier RDV : {p.lastAppointment}</p>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs">{p.status}</span>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <p className="text-gray-500 text-center mt-4">Aucun patient trouvé.</p>
        )}
      </div>
    </div>
  );
}
