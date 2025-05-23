import Navbar from '@/Component/Navbar';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee | HR SaaS",
  description: "View your employee details",
};

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
