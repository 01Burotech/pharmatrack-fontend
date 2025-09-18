"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  href,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  href?: string;
}) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow p-5 flex items-center space-x-4 cursor-pointer"
    >
      <div className={`${color} p-3 rounded-lg text-white`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
