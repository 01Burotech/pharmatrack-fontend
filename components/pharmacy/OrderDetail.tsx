"use client";

import { Item, Order } from "@/types";
import { CalendarCheck, Truck, Download, XCircle } from "lucide-react";

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

export default function OrderDetail({ order, onBack }: OrderDetailProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <button
        onClick={onBack}
        className="text-blue-600 mb-6 hover:underline flex items-center gap-1"
      >
        ← Retour
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Commande #{order.id}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "En cours"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "Livrée"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-600">
          <span className="font-semibold">Patient :</span> {order.patient}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Date :</span> {order.date}
        </p>
      </div>

      <h3 className="font-semibold mt-6 mb-3 text-gray-700">Médicaments :</h3>
      <ul className="bg-gray-50 rounded-xl p-4 divide-y divide-gray-100">
        {order.items.map((m: Item, i: number) => (
          <li key={i} className="py-2 flex justify-between">
            <span>{m.name}</span>
            <span className="text-gray-500">{m.quantity} pcs</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-6">
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition">
          <CalendarCheck className="w-4 h-4" /> Marquer prête
        </button>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
          <Truck className="w-4 h-4" /> Assigner livreur
        </button>
        <button className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition">
          <Download className="w-4 h-4" /> Exporter
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
          <XCircle className="w-4 h-4" /> Annuler
        </button>
      </div>
    </div>
  );
}
