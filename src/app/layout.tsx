import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "MTD Gayrimenkul & Emlak - Alanya & Antalya Gayrimenkul",
  description: "Alanya & Antalya'da hayalinizdeki evi birlikte bulalım. Satılık ve kiralık daireler, villalar ve arsalar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${manrope.variable} font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
