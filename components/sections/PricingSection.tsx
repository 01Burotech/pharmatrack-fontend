"use client";
import { useTranslations } from "next-intl";

export default function PricingSection() {
  const t = useTranslations("pricings");

  const plans = [
    {
      name: t("free"),
      price: "0€",
      features: ["Accès de base", "Support limité", "Ordonnances numériques"]
    },
    {
      name: t("pro"),
      price: "29€/mois",
      features: ["Toutes les fonctionnalités", "Support prioritaire", "Analyses avancées"]
    },
    {
      name: t("enterprise"),
      price: "Sur devis",
      features: ["Solutions sur mesure", "Support dédié", "Intégrations API"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {t("title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition transform hover:scale-105`}
            >
              {/* Badge pour le plan Pro */}
              {plan.name.toLowerCase().includes("pro") && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white bg-emerald-600 rounded-full shadow-md">
                  Populaire
                </span>
              )}

              <h3 className="text-xl font-semibold text-emerald-600">{plan.name}</h3>
              <p className="text-4xl font-extrabold mt-4 text-gray-900 dark:text-gray-100">{plan.price}</p>

              <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> {f}
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition transform hover:scale-105">
                {t("cta")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
