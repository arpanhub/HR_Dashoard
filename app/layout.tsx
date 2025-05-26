import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "@/Component/SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "Smart, sleek employee management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{ touchAction: 'manipulation' }}
        >
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
      
    </html>
  );
}