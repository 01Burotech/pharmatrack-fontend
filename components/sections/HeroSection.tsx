"use client";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const primaryBtn =
  "flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition transform hover:scale-105";
const secondaryBtn =
  "flex items-center px-6 py-3 border border-emerald-600 rounded-xl font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 transition transform hover:scale-105";


export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex items-center min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Blobs décoratifs */}
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-animateSlow will-change-transform"></div>
      <div className="absolute -bottom-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-teal-300 rounded-full blur-3xl opacity-20 animate-animateSlow will-change-transform"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texte */}
        <motion.div
          className="space-y-6 order-2 lg:order-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="px-4 py-2 text-sm font-semibold bg-emerald-100 text-emerald-700 rounded-full inline-block animate-bounce">
            {t("badge")}
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            {t("subtitle")}
          </p>

          <div className="flex gap-4 flex-wrap justify-center lg:justify-start mt-4">
      <Link
        href="/register"
        className={primaryBtn}
      >
        {t("ctaStart")}
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </Link>

      <Link
        href="/demo"
        className={secondaryBtn}
      >
        <PlayIcon className="w-5 h-5 mr-2" />
        {t("ctaDemo")}
      </Link>
    </div>
        </motion.div>

        {/* Image */}
   <motion.div
  className="relative mx-auto flex justify-center order-1 lg:order-2 mb-12 lg:mb-0 max-w-4xl"
  initial={{ opacity: 0, scale: 0.9, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
>
  <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-300 rounded-full blur-2xl opacity-30 animate-animateSlow"></div>

  <Image
    src="/hero.png"
    alt="Pharmatrack illustration"
    width={1200}
    height={800}
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
    className="w-full max-w-lg max-h-[70vh] object-contain rounded-2xl shadow-2xl 
               hover:scale-105 hover:brightness-110 transition-transform duration-300"
    priority
  />
</motion.div>

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
