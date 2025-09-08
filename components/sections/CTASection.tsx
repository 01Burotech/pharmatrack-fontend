"use client";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      id="cta"
      className="relative py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden"
    >
      {/* Formes abstraites en arrière-plan */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>

      <div className="relative max-w-5xl mx-auto text-center px-6 space-y-6">
        <h2 className="text-4xl sm:text-4xl font-extrabold leading-tight">
          {t("title")}
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <button className="mt-6 px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl shadow-xl hover:scale-105 hover:bg-gray-100 transition transform duration-300">
          {t("button")}
        </button>
      </div>

      {/* Animation des formes */}
      <style jsx>{`
        @keyframes animateSlow {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(20px) }
        }
        .animate-animateSlow {
          animation: animateSlow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
