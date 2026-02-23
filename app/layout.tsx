import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import HeaderWithLogin from "@/components/layout/HeaderWithLogin";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Try On Lens - Virtual Try On",
  description:
    "Virtual Try On application for accurate, high-quality AI results",
  viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased w-full h-dvh min-h-0 lg:min-h-screen lg:h-screen flex flex-col lg:flex-row justify-center items-stretch bg-background relative overflow-x-hidden overflow-y-hidden`}
      >
        <div className="hidden lg:block lg:min-w-60 lg:w-60 relative lg:h-full shrink-0">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full min-w-0 min-h-0 relative flex-1 lg:h-full overflow-hidden">
          <Suspense fallback={<header className="w-full h-[70px]" />}>
            <HeaderWithLogin />
          </Suspense>
          {children}
        </div>
      </body>
    </html>
  );
}
