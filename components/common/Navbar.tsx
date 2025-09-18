"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import useScrollSpy from "@/hooks/useScrollSpy";
import { MenuItem } from "../menu/MenuItem";
import { AuthButtons } from "../menu/AuthButtons";
import { useIsMobile } from "@/hooks/useIsMobile";

const Navbar: React.FC = () => {
const isMobile = useIsMobile();
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const sectionIds = ["home", "features", "pricing", "testimonials", "contact-form"];
  const activeSection = useScrollSpy(sectionIds, 100);

  const menuItems = isAuthPage
    ? [{ label: t("home"), id: "home" }]
    : [
        { label: t("features"), id: "features" },
        { label: t("pricing"), id: "pricing" },
        { label: t("testimonials"), id: "testimonials" },
        { label: t("contact"), id: "contact-form" },
      ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavigation = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?scrollTo=${id}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Pharmatrack" width={30} height={40} priority />
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg md:text-xl">
              Pharmatrack
            </span>
          </button>

          {/* Menu Desktop */}
          {!isAuthPage && !isMobile && (
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  label={item.label}
                  onClick={() => handleNavigation(item.id)}
                  active={activeSection === item.id}
                  isMobile={false}
                />
              ))}
            </div>
          )}


          {/* Partie droite : thème + auth */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>

            <div className="hidden lg:flex items-center space-x-4">
              <AuthButtons user={user} />
            </div>

            {/* Menu Mobile */}
            {isMobile && (
  <button
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
  >
    {isMobileMenuOpen ? (
      <XMarkIcon className="h-6 w-6" />
    ) : (
      <Bars3Icon className="h-6 w-6" />
    )}
  </button>
)}
          </div>
        </div>
      </div>

      {/* Dropdown mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed right-0 top-16 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl z-50"
        >
          <div className="py-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => {
                  handleNavigation(item.id);
                  setIsMobileMenuOpen(false);
                }}
                isMobile={true} // ✅ automatiquement mobile
              />
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 px-6">
              <AuthButtons user={user} isMobile onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
