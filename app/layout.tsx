import localFont from "next/font/local";
import type { Metadata } from "next";
import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full !scroll-smooth" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-full items-center justify-center bg-gradient-to-tr from-gray-900 to-slate-700 text-gray-50 antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
