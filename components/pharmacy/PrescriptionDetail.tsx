"use client";
import { Medication, Prescription } from "@/types";
import { MessageCircle, Download, PlusCircle, CheckCircle } from "lucide-react";

export default function PrescriptionDetail({
  prescription,
  onBack,
}: {
  prescription: Prescription;
  onBack: () => void;
}) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-purple-600 mb-4 flex items-center gap-1">
        ← Retour à l’ordonnancier
      </button>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <div className="bg-purple-50 p-4">
          <h2 className="text-lg font-semibold text-purple-700">
            Ordonnance pour {prescription.patientName}
          </h2>
          <p className="text-sm text-purple-500">Date : {prescription.date}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
            Statut : {prescription.status}
          </span>
          <span className="inline-block mt-2 ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            Source : {prescription.source}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2">Médicaments :</h3>
          <ul className="list-disc list-inside mb-4">
            {prescription.medications.map((m: Medication, i: number) => (
              <li key={i}>
                {m.name} - {m.dosage} x {m.quantity}
              </li>
            ))}
          </ul>

          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
              <MessageCircle className="w-4 h-4" /> Contacter patient
            </button>
            <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
              <PlusCircle className="w-4 h-4" /> Renouveler
            </button>
            <button className="flex items-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
              <CheckCircle className="w-4 h-4" /> Marquer validée
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
