"use client";
import { Bell } from "lucide-react";

export default function NotificationButton({ count }: { count: number }) {
  return (
    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
      <Bell className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
      )}
    </button>
  );
}
