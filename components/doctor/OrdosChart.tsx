"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdosChart({
  data,
}: {
  data: { mois: string; ordos: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Ordonnances créées par mois</h2>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="ordos"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
