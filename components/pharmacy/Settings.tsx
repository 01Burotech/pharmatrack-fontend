"use client";
import { Pencil, Trash2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-full bg-emerald-400 text-white font-medium shadow hover:bg-emerald-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);


interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border p-6 space-y-4 ${className}`}>
    {children}
  </div>
);

export const ProfileTab = () => (
  <SectionCard>
    <h2 className="text-xl font-semibold text-gray-800">Informations générales</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input type="text" placeholder="Nom de la pharmacie" className="input" />
      <input type="text" placeholder="Adresse" className="input" />
      <input type="email" placeholder="Email" className="input" />
      <input type="text" placeholder="Téléphone" className="input" />
      <input type="file" className="input" />
    </div>
    <PrimaryButton>Enregistrer</PrimaryButton>
  </SectionCard>
);

export const StaffTab = () => {
  const staffList = [
    { id: "1", name: "Alice Dupont", role: "Pharmacien" },
    { id: "2", name: "Jean Martin", role: "Assistant" },
  ];

  return (
    <SectionCard>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Équipe</h2>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Rôle</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.role}</td>
                <td className="p-3 flex gap-2">
                  <button className="action-btn bg-teal-600 hover:bg-teal-700">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="action-btn bg-red-500 hover:bg-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PrimaryButton className="mt-4 bg-green-600 hover:bg-green-700">
        Ajouter membre
      </PrimaryButton>
    </SectionCard>
  );
};

export const NotificationsTab = () => (
  <SectionCard>
    <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
    {["email", "push", "SMS"].map((type) => (
      <label key={type} className="flex items-center gap-2">
        <input type="checkbox" className="checkbox" /> Notifications {type}
      </label>
    ))}
    <PrimaryButton>Enregistrer</PrimaryButton>
  </SectionCard>
);

export const SecurityTab = () => (
  <SectionCard>
    <h2 className="text-xl font-semibold text-gray-800">Sécurité</h2>
    {["Ancien mot de passe", "Nouveau mot de passe", "Confirmer mot de passe"].map((p, i) => (
      <input key={i} type="password" placeholder={p} className="input" />
    ))}
    <PrimaryButton>Changer le mot de passe</PrimaryButton>
    <PrimaryButton className="mt-2 bg-green-600 hover:bg-green-700">Activer 2FA</PrimaryButton>
  </SectionCard>
);

export const PreferencesTab = () => (
  <SectionCard>
    <h2 className="text-xl font-semibold text-gray-800">Préférences</h2>
    {["Recevoir alertes de stock faible", "Activer rapport quotidien"].map((pref, i) => (
      <label key={i} className="flex items-center gap-2">
        <input type="checkbox" className="checkbox" /> {pref}
      </label>
    ))}
    <PrimaryButton>Enregistrer</PrimaryButton>
  </SectionCard>
);

