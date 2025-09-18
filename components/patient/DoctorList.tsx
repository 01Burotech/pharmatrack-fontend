"use client";
import { useDoctors } from "@/hooks/usePatient";
import DoctorDetail from "./DoctorDetail";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function DoctorList() {
  const { filtered, search, setSearch, selectedDoctor, selectDoctor, backToList } = useDoctors();

  if (selectedDoctor) return <DoctorDetail doctor={selectedDoctor} onBack={backToList} />;

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/patient"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <input
        type="text"
        placeholder="Rechercher par nom ou spécialité..."
        className="w-full p-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filtered.map(d => (
          <div
            key={d.id}
            onClick={() => selectDoctor(d)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{d.name}</p>
              <p className="text-sm text-gray-500">{d.specialty} – {d.location}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-white text-xs ${d.available ? "bg-green-500" : "bg-gray-400"}`}>
              {d.available ? "Disponible" : "Indisponible"}
            </span>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500 text-center mt-4">Aucun médecin trouvé.</p>}
      </div>
    </div>
  );
}
