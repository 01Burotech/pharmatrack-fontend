import { Patient } from "@/types";
import { MessageCircle, PlusCircle, Calendar, Download } from "lucide-react";

interface Props {
  patient: Patient;
  onBack: () => void;
}

export default function PatientDetail({ patient, onBack }: Props) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-indigo-600 mb-4 flex items-center gap-1">
        ← Retour aux patients
      </button>

      <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4">
          {patient.name[0]}
        </div>

        <h2 className="text-xl font-bold">{patient.name}</h2>
        <p className="text-gray-500">Âge : {patient.age} ans</p>
        <p className="text-gray-500">Dernier RDV : {patient.lastAppointment}</p>

        <span className="mt-2 inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
          Statut : {patient.status}
        </span>

        <div className="flex gap-2 flex-wrap mt-6">
          <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
            <MessageCircle className="w-4 h-4" /> Message
          </button>
          <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
            <PlusCircle className="w-4 h-4" /> Nouvelle ordonnance
          </button>
          <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
            <Calendar className="w-4 h-4" /> Programmer RDV
          </button>
          <button className="flex items-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
            <Download className="w-4 h-4" /> Exporter dossier
          </button>
        </div>
      </div>
    </div>
  );
}
