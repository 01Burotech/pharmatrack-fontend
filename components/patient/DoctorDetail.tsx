"use client";
import { CalendarCheck, MessageCircle, Star } from "lucide-react";

interface DoctorDetailProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    available: boolean;
  };
  onBack: () => void;
}

export default function DoctorDetail({ doctor, onBack }: DoctorDetailProps) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-green-600 mb-4 flex items-center gap-1">
        ← Retour aux médecins
      </button>

      <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl font-bold mb-4">
          {doctor.name[0]}
        </div>

        <h2 className="text-xl font-bold">{doctor.name}</h2>
        <p className="text-gray-500">Spécialité : {doctor.specialty}</p>
        <p className="text-gray-500">Lieu : {doctor.location}</p>

        <div className="flex items-center gap-1 mt-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-700 font-medium">{doctor.rating} / 5</span>
        </div>

        <div className="flex gap-2 flex-wrap mt-6">
          <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            <CalendarCheck className="w-4 h-4" /> Prendre RDV
          </button>
          <button className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <MessageCircle className="w-4 h-4" /> Message
          </button>
          <button className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            <Star className="w-4 h-4" /> Favori
          </button>
        </div>
      </div>
    </div>
  );
}
