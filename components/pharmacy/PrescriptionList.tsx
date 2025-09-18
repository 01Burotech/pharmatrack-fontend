"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeIcon, UploadCloud, PlusCircle, Download } from "lucide-react";
import { CSVLink } from "react-csv";
import PrescriptionDetail from "./PrescriptionDetail";
import { usePrescriptions } from "@/hooks/usePharmacy";
import { Prescription } from "@/types";

export default function PrescriptionList() {
  const [selected, setSelected] = useState<Prescription | null>(null);
  const { filtered, search, setSearch, statusFilter, setStatusFilter } = usePrescriptions();

  if (selected) {
    return <PrescriptionDetail prescription={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="p-4">
         <div className="mb-4">
        <Link
          href="/pharmacist"
          className="inline-flex items-center gap-2 px-5 py-2 bg-amber-100 text-green-600 rounded-full shadow hover:bg-amber-200 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <label className="flex items-center gap-1 bg-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600">
          <UploadCloud className="w-4 h-4" /> Scanner ordonnance
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) console.log("Fichier scanné :", file);
            }}
          />
        </label>

        <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <PlusCircle className="w-4 h-4" /> Ajouter manuellement
        </button>
        <CSVLink
          data={filtered}
          filename={`ordonnances_${new Date().toISOString().slice(0, 10)}.csv`}
          className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <Download className="w-4 h-4" /> Export CSV
        </CSVLink>
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
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(p)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.patientName}</p>
              <p className="text-sm text-gray-500">
                {p.medications.map((m) => m.name).join(", ")} – {p.date} ({p.source})
              </p>
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
        {filtered.length === 0 && <p className="text-gray-500 text-center mt-4">Aucune ordonnance trouvée.</p>}
      </div>
    </div>
  );
}
