"use client";
import { useTranslations } from "next-intl";
import { ShieldCheckIcon, ClipboardDocumentListIcon, UsersIcon, LifebuoyIcon } from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  const t = useTranslations("feature");
  const features = [
    { icon: ClipboardDocumentListIcon, title: t("f1") },
    { icon: ShieldCheckIcon, title: t("f2") },
    { icon: UsersIcon, title: t("f3") },
    { icon: LifebuoyIcon, title: t("f4") }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">{t("title")}</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("subtitle")}</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 dark:bg-emerald-800 rounded-full mb-4">
                <f.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-2 font-semibold text-lg text-gray-900 dark:text-gray-100">{f.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Optionnel: animation des cartes au scroll */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          div > div {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.6s forwards;
          }
          div > div:nth-child(1) { animation-delay: 0.1s; }
          div > div:nth-child(2) { animation-delay: 0.2s; }
          div > div:nth-child(3) { animation-delay: 0.3s; }
          div > div:nth-child(4) { animation-delay: 0.4s; }
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
