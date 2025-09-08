import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ReactNode } from "react";

// Fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"] });

// Metadata
export const metadata: Metadata = {
  title: "Pharmatrack",
  description: "Votre santé connectée",
};

// Import statique des messages
import enMessages from "../local/en.json";
import frMessages from "../local/fr.json";
import { AuthProvider } from "@/contexts/AuthContext";

// Mapping des locales
const messagesMap: Record<string, Record<string, string>> = {
  en: enMessages,
  fr: frMessages,
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // Vérifie si la locale est supportée sinon fallback sur 'fr'
  const messages = messagesMap[locale] || frMessages;
  const lang = messagesMap[locale] ? locale : "fr";

  return (
    <html lang={lang}>
      <body className={`${poppins.className} ${openSans.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
          <NextIntlClientProvider locale={lang} messages={messages}>
            <Navbar />
            {children}
          </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
