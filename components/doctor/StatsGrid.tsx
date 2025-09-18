"use client";
import StatCard from "./StatCard";

export default function StatsGrid({
  stats,
}: {
  stats: { label: string; value: number | string; icon: any; color: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
