import Navbar from '@/Component/Navbar';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | HR SaaS",
  description: "View your analytics",
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='pt-20'>{children}</main>
    </>
  );
}
