"use client";
import Navbar from '@/Component/Navbar';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
      <Navbar />
      <Toaster />
      <main className='pt-20'>{children}</main>
   </>
  );
}

