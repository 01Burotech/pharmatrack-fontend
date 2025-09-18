// components/menu/MenuItem.tsx
"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface MenuItemProps {
  label: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  active?: boolean;
  isMobile?: boolean;
  className?: string; // base when not active
  activeClassName?: string; // extra when active
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(({
  label,
  href,
  icon: Icon,
  onClick,
  active = false,
  isMobile = false,
  className = "",
  activeClassName = "",
}) => {
  const baseMobile = "flex items-center gap-3 w-full text-left py-2 px-4 rounded-lg transition-colors duration-200";
  const baseDesktop = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200";

  const defaultInactive = "text-gray-700 dark:text-gray-300 hover:text-[#00CFA0] hover:bg-emerald-50";
  const defaultActive = "bg-[#00CFA0] text-white shadow-sm";

  const combined = useMemo(() => {
    const base = isMobile ? baseMobile : baseDesktop;
    const stateClasses = active ? cn(defaultActive, activeClassName) : cn(defaultInactive, className);
    return cn(base, stateClasses, "focus:outline-none focus:ring-2 focus:ring-[#00CFA0]/40");
  }, [isMobile, active, className, activeClassName]);

  const content = (
    <>
      {Icon && <Icon className={cn("h-5 w-5 flex-shrink-0", active ? "opacity-100" : "opacity-90")} aria-hidden />}
      <span className="truncate">{label}</span>
    </>
  );

  const sharedProps = {
    onClick,
    className: combined,
    "aria-current": active ? "page" : undefined,
  } as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>;

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" {...sharedProps}>
      {content}
    </button>
  );
});
MenuItem.displayName = "MenuItem";
