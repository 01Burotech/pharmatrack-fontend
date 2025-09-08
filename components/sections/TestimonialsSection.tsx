"use client";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("testimonial");

  const testimonials = [
    {
      name: "Dr. Ahouansou",
      role: "Médecin généraliste",
      quote:
        "Pharmatrack m’a simplifié la prescription numérique. Un vrai gain de temps avec mes patients."
    },
    {
      name: "Pharmacie Camp Guezo",
      role: "Pharmacie partenaire",
      quote:
        "La connexion fluide entre médecins et patients est révolutionnaire. Pharmatrack change nos habitudes."
    },
    {
      name: "Patient Bénininois",
      role: "Utilisateur",
      quote:
        "Je reçois mes ordonnances et mes rappels de traitement directement. Très pratique !"
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-20 animate-animateSlow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-20 animate-animateSlow"></div>

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">{t("title")}</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("subtitle")}</p>

        <div className="grid gap-8 mt-12 md:grid-cols-3">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transform transition-all duration-500"
            >
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 text-lg">“{testi.quote}”</p>
              <h4 className="font-semibold text-emerald-600 text-lg">{testi.name}</h4>
              <p className="text-sm text-gray-500">{testi.role}</p>

              {/* Quote icon flottante */}
              <span className="absolute -top-4 -left-4 text-emerald-100 text-6xl opacity-30 select-none">“</span>
            </div>
          ))}
        </div>
      </div>

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
