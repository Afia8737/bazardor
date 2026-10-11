import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { getCategories, getProducts } from "@/lib/api";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <html lang="bn" data-theme="bazar" className={hind.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
