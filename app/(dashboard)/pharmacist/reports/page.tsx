"use client";

import PageContainer from "@/components/layout/PageContainer";
import {
  Download,
  HomeIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { CSVLink } from "react-csv";
import Link from "next/link";
import { ordersSummary, pharmacySidebarLinks, topProducts } from "@/constants/mockData";
import { usePharmacyReports } from "@/hooks/usePharmacy";


export default function PharmacyReportsPage() {
  const {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    filteredOrders,
    topProducts: products,
    csvFileName,
  } = usePharmacyReports(ordersSummary, topProducts);

  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Rapports"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      {/* Bouton retour */}
      <div className="mb-6">
         <Link
        href="/pharmacist"
        className="inline-flex items-center gap-2 px-5 py-2 bg-amber-100 text-green-600 rounded-full shadow hover:bg-amber-200 transition"
      >
        <HomeIcon className="w-5 h-5" /> Tableau de bord
      </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-6 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">De :</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">À :</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <CSVLink
          data={filteredOrders}
          filename={csvFileName}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          <Download className="w-4 h-4" /> Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Total commandes</th>
              <th className="px-4 py-3 text-left">Revenu ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.date} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-t">{o.date}</td>
                <td className="px-4 py-3 border-t">{o.totalOrders}</td>
                <td className="px-4 py-3 border-t">{o.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Commandes par jour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredOrders}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalOrders" fill="#3b82f6" name="Total commandes" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Revenu par jour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredOrders}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="revenue"
                stroke="#10b981"
                name="Revenu ($)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Produits les plus vendus
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#f97316" name="Vendus" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PageContainer>
  );
}
