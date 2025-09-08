"use client";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex items-center min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texte */}
        <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left">
          <span className="px-4 py-2 text-sm font-semibold bg-emerald-100 text-emerald-700 rounded-full inline-block animate-bounce">
            {t("badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            {t("subtitle")}
          </p>

          <div className="flex gap-4 flex-wrap justify-center lg:justify-start mt-4">
            <button className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition transform hover:scale-105">
              {t("ctaStart")}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button className="flex items-center px-6 py-3 border border-emerald-600 rounded-xl font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 transition transform hover:scale-105">
              <PlayIcon className="w-5 h-5 mr-2" />
              {t("ctaDemo")}
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center order-1 lg:order-2 mb-12 lg:mb-0 relative">
          {/* Forme flottante derrière l'image */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-50 animate-animateSlow"></div>
          <Image
            src="/pharmatrack-hero.png"
            alt="Pharmatrack illustration"
            width={600}
            height={400}
            className="w-full max-w-lg rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes animateSlow {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(20px) }
        }
        .animate-animateSlow {
          animation: animateSlow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
