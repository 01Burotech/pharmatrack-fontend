"use client";
import MedicationItem from "./MedicationItem";
import { Download, Share2, RefreshCcw } from "lucide-react";

interface PrescriptionDetailProps {
  prescription: {
    id: string;
    date: string;
    doctor: string;
    status: string;
    medications: { name: string; dosage: string; quantity: number }[];
  };
  onBack: () => void;
}

export default function PrescriptionDetail({ prescription, onBack }: PrescriptionDetailProps) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-purple-600 mb-4 flex items-center gap-1">
        ← Retour aux prescriptions
      </button>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <div className="bg-purple-50 p-4">
          <h2 className="text-lg font-semibold text-purple-700">Ordonnance du {prescription.date}</h2>
          <p className="text-sm text-purple-500">Prescripteur : {prescription.doctor}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
            Statut : {prescription.status}
          </span>
        </div>

        <div className="p-4 space-y-2">
          {prescription.medications.map((med, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
              <MedicationItem {...med} />
            </div>
          ))}

          <div className="flex gap-2 flex-wrap mt-4">
            <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
              <Download className="w-4 h-4" /> Télécharger
            </button>
            <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
              <RefreshCcw className="w-4 h-4" /> Renouveler
            </button>
            <button className="flex items-center gap-1 bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600">
              <Share2 className="w-4 h-4" /> Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
