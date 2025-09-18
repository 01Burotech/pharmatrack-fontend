"use client";
import { Users, FileText, ClipboardCheck, Calendar, BarChart3, Store, Shield } from "lucide-react";

const menuItems = [
  { icon: Users, label: "Utilisateurs" },
  { icon: ClipboardCheck, label: "KYC Vérifications" },
  { icon: FileText, label: "Prescriptions & Ordonnances" },
  { icon: Calendar, label: "Rendez-vous" },
  { icon: BarChart3, label: "Rapports" },
  { icon: Store, label: "Produits & Pharmacies" },
  { icon: Shield, label: "Permissions" },
];

export default function AdminSidebar({ active, onSelect }: { active: string; onSelect: (item: string) => void }) {
  return (
    <div className="bg-emerald-600 text-white w-64 h-screen flex flex-col">
      <div className="text-2xl font-bold px-6 py-4 border-b border-emerald-500">PharmaTrack Admin</div>
      <ul className="flex-1 overflow-y-auto">
        {menuItems.map(({ icon: Icon, label }) => (
          <li
            key={label}
            onClick={() => onSelect(label)}
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-emerald-700 transition ${
              active === label ? "bg-emerald-700" : ""
            }`}
          >
            <Icon size={20} /> <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
