"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FiMenu, FiBell, FiSearch, FiPlus, FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/**
 * Admin Dashboard - Next.js 15 + TypeScript + TailwindCSS
 * Single-file implementation for demo / copy-paste.
 */

/* ---------------------------
   Fake data
   --------------------------- */
type Role = "Admin" | "Doctor" | "Pharmacy" | "Patient";

const fakeUsers = [
  { id: "u1", name: "Jean Dupont", email: "jean.dupont@example.com", role: "Doctor" as Role, kyc: true },
  { id: "u2", name: "Alice Durand", email: "alice.durand@example.com", role: "Patient" as Role, kyc: false },
  { id: "u3", name: "Pharma Benin", email: "contact@pharmabenin.com", role: "Pharmacy" as Role, kyc: false },
  { id: "u4", name: "Maya K.", email: "maya.k@example.com", role: "Doctor" as Role, kyc: true },
  { id: "u5", name: "Carlos R.", email: "carlos.r@example.com", role: "Patient" as Role, kyc: false },
];

const activityData = [
  { day: "Mon", signups: 12, prescriptions: 5 },
  { day: "Tue", signups: 18, prescriptions: 8 },
  { day: "Wed", signups: 9, prescriptions: 12 },
  { day: "Thu", signups: 22, prescriptions: 15 },
  { day: "Fri", signups: 16, prescriptions: 9 },
  { day: "Sat", signups: 7, prescriptions: 4 },
  { day: "Sun", signups: 4, prescriptions: 2 },
];

const kycQueue = [
  { id: "k1", name: "Dr. Jean Dupont", type: "Doctor", doc: "Licence médicale" },
  { id: "k2", name: "Pharma Benin", type: "Pharmacy", doc: "Registre de commerce" },
];

/* ---------------------------
   Small utility components
   --------------------------- */

function IconButton({ children, title, onClick }: { children: React.ReactNode; title?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
}

/* ---------------------------
   Sidebar
   --------------------------- */
function AdminSidebar({
  collapsed,
  setCollapsed,
  active,
  setActive,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  active: string;
  setActive: (s: string) => void;
}) {
  const items = [
    { id: "Overview", label: "Overview" },
    { id: "Users", label: "Utilisateurs" },
    { id: "KYC", label: "KYC Vérifications" },
    { id: "Prescriptions", label: "Prescriptions" },
    { id: "Appointments", label: "Rendez-vous" },
    { id: "Reports", label: "Rapports" },
    { id: "Pharmacies", label: "Pharmacies & Produits" },
    { id: "Permissions", label: "Permissions" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 264 }}
      className="bg-emerald-600 text-white flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">PT</div>
          {!collapsed && <div className="text-lg font-semibold">PharmaTrack</div>}
        </div>
        <IconButton title="Menu" onClick={() => setCollapsed(!collapsed)}>
          <FiMenu className="text-white" />
        </IconButton>
      </div>

      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {items.map((it) => {
            const activeCls = active === it.id ? "bg-emerald-700 text-white" : "text-white/90 hover:bg-emerald-700/60";
            return (
              <li key={it.id}>
                <button
                  onClick={() => setActive(it.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${activeCls}`}
                >
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-sm">{it.id[0]}</div>
                  {!collapsed && <span className="font-medium">{it.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-emerald-500">
        {!collapsed && <div className="text-xs text-white/80 mb-2">Admin • Super</div>}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20" />
          {!collapsed && (
            <div>
              <div className="text-sm">Admin</div>
              <div className="text-xs text-white/80">admin@pharmatrack.com</div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

/* ---------------------------
   Header
   --------------------------- */
function AdminHeader({ onSearch, onNotify }: { onSearch?: (q: string) => void; onNotify?: () => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full max-w-lg">
        <div className="relative flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch?.(q)}
            placeholder="Rechercher utilisateurs, pharmacies, ordonnances..."
            className="w-full rounded-lg border border-gray-200 p-3 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <div className="absolute left-3 top-0 bottom-0 flex items-center text-gray-400">
            <FiSearch />
          </div>
        </div>
        <button
          onClick={() => {
            toast.promise(
              new Promise((res) => setTimeout(res, 900)),
              {
                loading: "Génération du rapport...",
                success: "Rapport généré ✓",
                error: "Erreur",
              },
            );
          }}
          className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <FiPlus /> Nouveau rapport
        </button>
      </div>

      <div className="flex items-center gap-3">
        <IconButton title="Notifications" onClick={onNotify}>
          <FiBell />
        </IconButton>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <Image src="/default-avatar.png" alt="avatar" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   KPI Cards
   --------------------------- */
function KpiGrid({ usersCount, prescriptionsCount, pharmaciesCount, appointmentsCount }: any) {
  const kpis = [
    { label: "Utilisateurs", value: usersCount, delta: "+12%" },
    { label: "Prescriptions", value: prescriptionsCount, delta: "+4%" },
    { label: "Pharmacies", value: pharmaciesCount, delta: "-1%" },
    { label: "Rendez-vous", value: appointmentsCount, delta: "+8%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((k) => (
        <div key={k.label} className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-500">{k.label}</div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs text-emerald-600 mt-1">{k.delta}</div>
            </div>
            <div className="bg-emerald-100 text-emerald-700 rounded-lg px-3 py-2 text-sm">Live</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------
   Charts area
   --------------------------- */
function ChartsSection({ activity }: { activity: typeof activityData }) {
  const pieData = useMemo(
    () => [
      { name: "KYC ok", value: 65 },
      { name: "KYC pending", value: 25 },
      { name: "KYC rejected", value: 10 },
    ],
    [],
  );
  const COLORS = ["#059669", "#10B981", "#F59E0B"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-gray-500">Activité (inscriptions / ordonnances)</div>
            <div className="text-lg font-semibold text-gray-900">Dernière semaine</div>
          </div>
        </div>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="signups" name="Inscriptions" stroke="#059669" strokeWidth={2} />
              <Line type="monotone" dataKey="prescriptions" name="Prescriptions" stroke="#0ea5a4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="text-sm text-gray-500 mb-2">Statut KYC</div>
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Users Table
   --------------------------- */
function UsersTable({ users, onEdit, onDelete }: { users: typeof fakeUsers; onEdit: (u: any) => void; onDelete: (id: string) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Utilisateurs récents</h3>
        <div className="text-sm text-gray-500">{users.length} total</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-gray-500 uppercase text-xs">
            <tr>
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Rôle</th>
              <th className="py-2">KYC</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="py-3">{u.name}</td>
                <td className="py-3">{u.email}</td>
                <td className="py-3">{u.role}</td>
                <td className="py-3">{u.kyc ? <span className="text-green-600">✓</span> : <span className="text-orange-500">⧗</span>}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-600 text-white text-xs"
                    >
                      <FiEdit2 /> Éditer
                    </button>
                    <button
                      onClick={() => onDelete(u.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white text-xs"
                    >
                      <FiTrash2 /> Suppr.
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------
   KYC queue list
   --------------------------- */
function KycList({ items, onApprove, onReject }: { items: typeof kycQueue; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">KYC en attente</h3>
        <div className="text-sm text-gray-500">{items.length} items</div>
      </div>

      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">{it.type} • {it.doc}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onApprove(it.id)}
                className="px-3 py-1 bg-emerald-600 text-white rounded text-sm flex items-center gap-2"
              >
                <FiCheckCircle /> Approuver
              </button>
              <button
                onClick={() => onReject(it.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Rejeter
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------
   Main Admin Page
   --------------------------- */
export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<string>("Overview");
  const [users, setUsers] = useState(fakeUsers);
  const [kyc, setKyc] = useState(kycQueue);

  useEffect(() => {
    // small welcome toast
    toast.success("Bienvenue dans le panneau Admin");
  }, []);

  const handleEdit = (u: any) => {
    toast(`Édition simulée: ${u.name}`, { icon: "✏️" });
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((p) => p.id !== id));
    toast.success("Utilisateur supprimé");
  };

  const handleApprove = (id: string) => {
    setKyc((prev) => prev.filter((k) => k.id !== id));
    toast.success("KYC approuvé");
  };

  const handleReject = (id: string) => {
    setKyc((prev) => prev.filter((k) => k.id !== id));
    toast.error("KYC rejeté");
  };

  const stats = useMemo(
    () => ({
      usersCount: users.length,
      prescriptionsCount: 120,
      pharmaciesCount: 45,
      appointmentsCount: 60,
    }),
    [users],
  );

  return (
    <div className="h-screen flex bg-gray-50">
      <Toaster position="top-right" />
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <AdminHeader
              onSearch={(q) => toast(`Recherche: ${q}`)}
              onNotify={() => toast("Aucune nouvelle notification")}
            />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Top: title + actions */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{active}</h2>
                <p className="text-sm text-gray-500 mt-1">Vue d'ensemble & gestion rapide</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toast.promise(new Promise((res) => setTimeout(res, 800)), { loading: "Sauvegarde...", success: "Sauvegardé", error: "Erreur" })}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
                >
                  Sauvegarder les changements
                </button>
                <button onClick={() => toast("Exporter CSV (simulé)")} className="px-4 py-2 rounded-lg border">
                  Exporter
                </button>
              </div>
            </div>

            {/* KPIs */}
            <KpiGrid {...stats} />

            {/* Charts */}
            <ChartsSection activity={activityData} />

            {/* Content area: depending on active section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {/* Users */}
                <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

                {/* KYC list */}
                <KycList items={kyc} onApprove={handleApprove} onReject={handleReject} />
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Recent activity card */}
                <div className="bg-white rounded-2xl shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm text-gray-500">Activité récente</div>
                      <div className="text-lg font-semibold">Logs système</div>
                    </div>
                  </div>

                  <ul className="divide-y">
                    <li className="py-3 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">✓</div>
                      <div>
                        <div className="text-sm font-medium">KYC approuvé</div>
                        <div className="text-xs text-gray-500">Dr. Jean Dupont • 10 min</div>
                      </div>
                    </li>
                    <li className="py-3 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">!</div>
                      <div>
                        <div className="text-sm font-medium">Nouvelle commande</div>
                        <div className="text-xs text-gray-500">Pharma Benin • 30 min</div>
                      </div>
                    </li>
                    <li className="py-3 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">💬</div>
                      <div>
                        <div className="text-sm font-medium">Nouveau message</div>
                        <div className="text-xs text-gray-500">Alice Durand • 1h</div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-2xl shadow p-4">
                  <h3 className="text-lg font-semibold mb-2">Actions rapides</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-3 py-2 bg-emerald-600 text-white rounded">Créer utilisateur</button>
                    <button className="px-3 py-2 border rounded" onClick={() => toast("Invitation envoyée (simulé)")}>Inviter</button>
                    <button className="px-3 py-2 border rounded" onClick={() => toast("Purger données (simulé)")}>Purger</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer small */}
            <div className="mt-8 text-xs text-gray-400">© Pharmatrack — Dashboard admin • Demo data</div>
          </div>
        </main>
      </div>
    </div>
  );
}
