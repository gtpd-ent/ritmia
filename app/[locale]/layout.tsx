import localFont from "next/font/local";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { routing } from "@/i18n/routing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  description:
    "Seamlessly merge your favorite artists' liked songs into new playlists.",
  title: "Ritmia",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  let { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale || "en";
  }

  const messages = await import(`../../messages/${locale}.json`).then(
    (mod) => mod.default,
  );

  return (
    <html className="h-full !scroll-smooth bg-slate-900" lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-full items-center justify-center bg-gradient-to-tr from-gray-900 to-slate-700 text-sm text-gray-50 antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
