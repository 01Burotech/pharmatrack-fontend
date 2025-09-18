"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/utils/cn";

interface AuthButtonsProps {
  user?: { role: string } | null;
  isMobile?: boolean;
  onClick?: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ user, isMobile = false, onClick }) => {
  if (user) {
    return (
      <Link
        href={`/${user.role}`}
        onClick={onClick}
        className={cn(
          isMobile ? "block w-full text-left py-2 px-4 rounded-md text-gray-700" : "text-sm font-medium text-gray-700",
          "hover:text-[#00CFA0]"
        )}
      >
        Dashboard
      </Link>
    );
  }

  return (
    <div className={isMobile ? "px-4 py-3" : "flex items-center gap-4"}>
      <Link
        href="/login"
        onClick={onClick}
        className={cn(
          isMobile ? "block w-full text-center py-2 rounded-md text-gray-700" : "text-sm font-medium text-gray-700",
          "hover:text-[#00CFA0]"
        )}
      >
        Se connecter
      </Link>

      <Link
        href="/register"
        onClick={onClick}
        className={cn(
          isMobile ? "block w-full mt-2 py-2 rounded-md text-white" : "px-4 py-2 rounded-xl text-white font-semibold",
          "bg-gradient-to-r from-[#00CFA0] to-[#00B894] hover:shadow-lg text-center"
        )}
      >
        Commencer
      </Link>
    </div>
  );
};
