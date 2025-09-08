"use client";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contacts");

  return (
    <section id="contact-form" className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">{t("title")}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl">{t("subtitle")}</p>

        <form className="grid gap-6 max-w-2xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Nom"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition"
          />
          <textarea
            placeholder="Votre message"
            rows={5}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition"
          />
          <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition transform hover:scale-105">
            Envoyer
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes animateSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-animateSlow {
          animation: animateSlow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
