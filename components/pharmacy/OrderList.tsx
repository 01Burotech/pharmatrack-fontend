"use client";

import Link from "next/link";
import { HomeIcon } from "lucide-react";
import OrderDetail from "./OrderDetail";
import { useState } from "react";
import { useOrders } from "@/hooks/usePharmacy";
import { Order } from "@/types";

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    filteredOrders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useOrders();

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/pharmacist"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Rechercher par patient ou ID..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Prête">Prête</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOrder(o)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center transition"
          >
            <div>
              <p className="font-semibold">
                Commande #{o.id} – {o.patient}
              </p>
              <p className="text-sm text-gray-500">
                {o.status} – {o.date}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs ${
                o.status === "Prête"
                  ? "bg-green-500"
                  : o.status === "Livrée"
                  ? "bg-blue-500"
                  : o.status === "Annulée"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center mt-4">Aucune commande trouvée.</p>
        )}
      </div>
    </div>
  );
}
