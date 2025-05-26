"use client";
import React from "react";
import { notFound } from "next/navigation";
import { useEmployees, useBookmarks } from "@/hooks/useEmployeeHooks";
import EmployeeDetailsView from "@/Component/EmployeeDetailsView";
import toast from 'react-hot-toast';

interface EmployeePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EmployeePage({ params }: EmployeePageProps) {
  const { employees, isLoading } = useEmployees();
  const { toggleBookmark } = useBookmarks();
  
  // Unwrap the params promise
  const resolvedParams = React.use(params);
  
  // Find the specific employee
  const employee = employees.find(emp => emp.id === resolvedParams.id);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p className="text-neutral-400">Loading employee details...</p>
        </div>
      </div>
    );
  }

  // Handle employee not found
  if (!employee) {
    notFound();
  }

  const handleBookmarkToggle = () => {
    toggleBookmark(employee.id);
    toast.success(
      !employee.bookmarked
        ? `${employee.name} added to bookmarks`
        : `${employee.name} removed from bookmarks`,
      {
        icon: !employee.bookmarked ? "🔖" : "❌",
      }
    );
  };

  return (
    <EmployeeDetailsView 
      employee={employee} 
      onBookmarkToggle={handleBookmarkToggle}
    />
  );
}