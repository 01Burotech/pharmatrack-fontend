import Link from "next/link";
import { HomeIcon } from "lucide-react";
import AppointmentDetail from "./AppointmentDetail";
import { useAppointments } from "@/hooks/useDoctor";

export default function AppointmentList() {
  const { selected, filtered, search, setSearch, selectAppointment, clearSelection } = useAppointments();

  if (selected) return <AppointmentDetail appointment={selected} onBack={clearSelection} />;

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
        placeholder="Rechercher par patient ou motif..."
        className="w-full p-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filtered.map((a) => (
          <div
            key={a.id}
            onClick={() => selectAppointment(a)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.patientName}</p>
              <p className="text-sm text-gray-500">{a.date} – {a.time} · {a.reason}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs ${
                a.status === "Confirmé" ? "bg-green-500" :
                a.status === "En attente" ? "bg-yellow-500" :
                "bg-gray-400"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500 text-center mt-4">Aucun rendez-vous trouvé.</p>}
      </div>
    </div>
  );
}
