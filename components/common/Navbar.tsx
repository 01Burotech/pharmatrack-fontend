"use client"; // Indique que ce composant est côté client (pas server component)

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation"; // Hooks Next.js 13+ pour navigation
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"; // Icônes Heroicons
import { useTheme } from "@/contexts/ThemeContext"; // Contexte custom pour thème clair/sombre
import { useAuth } from "@/contexts/AuthContext"; // Contexte custom pour authentification
import useScrollSpy from "@/hooks/useScrollSpy"; // Hook custom pour détecter la section active
import { StethoscopeIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const t = useTranslations();
  // Gère l'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gestion du thème (dark/light)
  const { isDark, toggleTheme } = useTheme();

  // Récupération de l'utilisateur connecté
  const { user } = useAuth();

  // Hooks Next.js pour connaître l'URL courante et faire des redirections
  const pathname = usePathname();
  const router = useRouter();

  // Référence pour fermer le menu mobile si clic en dehors
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Vérifie si la page actuelle est Login ou Register → menu réduit
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Liste des sections pour le scroll spy
  const sectionIds = ["home", "features", "pricing", "testimonials", "contact-form"];
  const activeSection = useScrollSpy(sectionIds, 100); // Hook qui renvoie la section active

  // Ferme le menu mobile si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Navigation vers une section (scroll sur home, sinon redirection)
  const handleNavigation = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?scrollTo=${id}`);
    }
  };

  // Gestion du clic sur le logo (scroll en haut si déjà sur home, sinon redirection home)
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  // Menu affiché différemment si page login/register
  const menuItems = isAuthPage
    ? [{ name: t("home"), id: "home" },]
    : [
        { name: t("features"), id: "features" },
        { name: t("pricing"), id: "pricing" },
        { name: t("testimonials"), id: "testimonials" },
        { name: t("contact"), id: "contact-form" }
      ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button onClick={handleLogoClick} className="flex items-center space-x-2">
              <StethoscopeIcon className="h-8 w-8 md:h-10 md:w-10 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg md:text-xl">
                Pharmatrack
              </span>
            </button>
          </div>

          {/* Menu Desktop */}
          {!isAuthPage && (
            <div className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {/* Partie droite : thème + auth */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Bouton thème */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>

            {/* Boutons Auth */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <Link href={`/${user.role}`} className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium">
                  {t("dashboard")}
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium">
                    {t("signin")}
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                  >
                    {t("getstart")}
                  </Link>
                </>
              )}
            </div>

            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown mobile */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed right-0 top-16 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div className="py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigation(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-6 ${
                  activeSection === item.id
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Auth Mobile */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 px-6">
              {user ? (
                <Link href={`/${user.role}`} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-4 py-2 rounded-lg text-center font-semibold mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
