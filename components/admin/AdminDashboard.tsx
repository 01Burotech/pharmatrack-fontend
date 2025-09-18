"use client";
import { motion } from "framer-motion";

export default function AdminDashboard({ section }: { section: string }) {
  // Données fake
  const fakeUsers = [
    { id: 1, name: "Jean Dupont", role: "Doctor" },
    { id: 2, name: "Alice Durand", role: "Patient" },
    { id: 3, name: "Pharma Benin", role: "Pharmacy" },
  ];

  return (
    <motion.div
      key={section}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 p-6 overflow-y-auto bg-gray-50"
    >
      <h1 className="text-xl font-bold mb-4 text-emerald-700">{section}</h1>

      {section === "Utilisateurs" && (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="py-2">Nom</th>
                <th className="py-2">Rôle</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fakeUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-100">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2 flex gap-2">
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded text-xs">Éditer</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-xs">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded">+ Ajouter un utilisateur</button>
        </div>
      )}

      {section === "KYC Vérifications" && (
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Liste des documents KYC à vérifier (fake data)</p>
          <ul className="mt-2">
            <li className="py-2 border-b">Dr. Jean Dupont — Licence médicale</li>
            <li className="py-2 border-b">Pharma Benin — Registre commerce</li>
          </ul>
        </div>
      )}

      {section === "Rapports" && (
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600 mb-2">Statistiques globales</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">350</div>
              <div>Utilisateurs</div>
            </div>
            <div className="bg-emerald-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">120</div>
              <div>Prescriptions</div>
            </div>
            <div className="bg-emerald-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">45</div>
              <div>Pharmacies</div>
            </div>
            <div className="bg-emerald-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">60</div>
              <div>Rendez-vous</div>
            </div>
          </div>
        </div>
      )}

      {/* On peut continuer à ajouter d'autres sections */}
    </motion.div>
  );
}
