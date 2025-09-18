import { Appointment } from "@/hooks/useDoctor";
import { CheckCircle, XCircle, Bell } from "lucide-react";

interface Props {
  appointment: Appointment;
  onBack: () => void;
}

export default function AppointmentDetail({ appointment, onBack }: Props) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-green-600 mb-4 flex items-center gap-1">
        ← Retour aux rendez-vous
      </button>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <div className="bg-green-50 p-4">
          <h2 className="text-lg font-semibold text-green-700">{appointment.patientName}</h2>
          <p className="text-sm text-green-500">{appointment.date} – {appointment.time}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Statut : {appointment.status}
          </span>
        </div>

        <div className="p-4">
          <p className="text-gray-700 font-medium">Motif : {appointment.reason}</p>

          <div className="flex gap-2 flex-wrap mt-4">
            <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
              <CheckCircle className="w-4 h-4" /> Confirmer
            </button>
            <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
              <XCircle className="w-4 h-4" /> Annuler
            </button>
            <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
              <Bell className="w-4 h-4" /> Notifier le patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
