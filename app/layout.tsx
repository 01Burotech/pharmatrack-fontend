import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import enMessages from "../local/en.json";
import frMessages from "../local/fr.json";
import ClientProviders from "./ClientProviders";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Pharmatrack - Saas",
  description: "Votre santé connectée",
};

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages,
  fr: frMessages,
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = messagesMap[locale] || frMessages;
  const lang = messagesMap[locale] ? locale : "fr";

  return (
    <html lang={lang}>
      <body className={`${poppins.className} ${openSans.className} antialiased`}>
        <ClientProviders locale={lang} messages={messages}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
