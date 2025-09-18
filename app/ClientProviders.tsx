"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NextIntlClientProvider } from "next-intl";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export default function ClientProviders({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Toaster position="top-right" />
          </NextIntlClientProvider>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
