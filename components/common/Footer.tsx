"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-950 text-center text-sm text-gray-600 dark:text-gray-400">
      {t("rights")}
    </footer>
  );
}
