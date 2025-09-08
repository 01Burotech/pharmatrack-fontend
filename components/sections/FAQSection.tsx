"use client";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <div className="mt-8 space-y-6 text-left">
          {faqs.map((item, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="font-semibold text-emerald-600">{item.q}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
