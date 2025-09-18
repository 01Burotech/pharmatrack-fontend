"use client";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import OrderDetail from "./OrderDetail";
import { useOrders } from "@/hooks/useDoctor";

export default function OrderList() {
  const {
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
  } = useOrders();

  if (selectedOrder) return <OrderDetail order={selectedOrder} onBack={clearSelection} />;

  return (
    <div className="p-4 space-y-4">
      <div className="mb-4">
        <Link
          href="/doctor"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Filtrer par patient..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par pharmacie..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchPharmacy}
          onChange={(e) => setSearchPharmacy(e.target.value)}
        />
        <select
          className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous statuts</option>
          <option value="En attente">En attente</option>
          <option value="Validée">Validée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            onClick={() => selectOrder(o)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Commande #{o.id} – {o.patient}</p>
              <p className="text-sm text-gray-500">{o.pharmacy} – {o.date}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs ${
                o.status === "En attente" ? "bg-orange-500" :
                o.status === "Validée" ? "bg-green-500" :
                "bg-red-500"
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
        {filteredOrders.length === 0 && <p className="text-gray-500 text-center mt-4">Aucune commande trouvée.</p>}
      </div>
    </div>
  );
}
