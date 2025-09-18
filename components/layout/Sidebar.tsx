"use client";
import React, { FC } from "react";
import Image from "next/image";
import { SidebarLink } from "@/types";
import { MenuItem } from "../menu/MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";

interface SidebarProps {
  links: SidebarLink[];
  logoSrc: string;
  brandName: string;
  sidebarOpen: boolean;
  onClose?: () => void;
  user?: { role: string } | null;
}

const sidebarMotion = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

const Sidebar: FC<SidebarProps> = ({ links, logoSrc, brandName, sidebarOpen, onClose, user }) => {
  return (
    <>
      {/* Overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-20 lg:hidden"
            onClick={onClose}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobile animated drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarMotion}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed z-30 inset-y-0 left-0 w-72 bg-white shadow-2xl rounded-tr-2xl rounded-br-2xl lg:hidden"
            aria-label="Navigation principale"
            role="navigation"
          >
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Image src={logoSrc} alt={`${brandName} logo`} width={44} height={44} className="rounded-md" />
                <span className="text-2xl font-extrabold text-[#00CFA0]">{brandName}</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-3 space-y-1 overflow-y-auto h-full">
              {links.map((l) => (
                <MenuItem
                  key={l.href}
                  label={l.label}
                  href={l.href}
                  icon={l.icon}
                  active={l.active}
                  isMobile
                  className="text-gray-700"
                  activeClassName="bg-[#00CFA0] text-white"
                />
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop fixed sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-xl rounded-tr-2xl rounded-br-2xl",
        )}
        aria-label="Navigation principale"
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <Image src={logoSrc} alt={`${brandName} logo`} width={44} height={44} className="rounded-md" />
          <span className="text-2xl font-extrabold text-[#00CFA0]">{brandName}</span>
        </div>

        <nav className="mt-4 flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {links.map((l) => (
            <MenuItem
              key={l.href}
              label={l.label}
              href={l.href}
              icon={l.icon}
              active={l.active}
              isMobile={false}
              className="text-gray-700 hover:bg-emerald-50"
              activeClassName="bg-[#00CFA0] text-white shadow"
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          {/* Small footer: user role / version etc. */}
          <p className="text-xs text-gray-500">Pharmatrack · v1.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
