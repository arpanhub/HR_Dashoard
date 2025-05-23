"use client";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import React from 'react';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
    const [loading, setloading] = React.useState(false);
  const navItems = [
    {
      name: "Dashboard",
      href: "/Dashboard",
    },
    {
      name: "Bookmarks",
      href: "/Bookmarks",
    },
    {
      name: "Analytics",
      href: "/Analytics",
    },
  ];
  const handleLogout = async()=>{
        try {
            setloading(true);
            await axios.get('/api/users/logout');
            // toast.success("Logout successful");
            router.push('/');
        } catch (error:any) {
            console.log("Failed to logout",error.message);
            // toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            
            <NavbarButton variant="primary" onClick={handleLogout}>Logout</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
      {/* <DummyContent /> */}

      {/* Navbar */}
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto p-8 pt-24 bg-black">
      <h1 className="mb-4 mt-5 text-center text-3xl font-bold">
        Click on the View button to See  Details of each Employee
      </h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        For demo purpose we have kept the position as{" "}
        <span className="font-medium">Sticky</span>. Keep in mind that this
        component is <span className="font-medium">fixed</span> and will not
        move when scrolling.
      </p>
    </div>
  );
};
