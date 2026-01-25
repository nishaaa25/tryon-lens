import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Try On Lens - Virtual Try On",
  description:
    "Virtual Try On application for accurate, high-quality AI results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased  w-full h-screen flex justify-center items-center bg-white relative overflow-hidden`}
      >
        <div className="min-w-60 w-60 relative h-full">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full relative h-full">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
