"use client";
import React from "react";
import { useBookmarks } from "@/hooks/useEmployeeHooks";
import EmployeeCard from '@/Component/EmployeeCard';

export default function Bookmarks() {
  const { bookmarkedEmployees, bookmarkCount, toggleBookmark } = useBookmarks();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]" />
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-semibold text-transparent">
            Bookmarked Employees
          </h1>
          <p className="text-neutral-400 mt-2">
            {bookmarkCount} bookmarked
          </p>
        </div>

        {/* Bookmarked Employees */}
        {bookmarkedEmployees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                {...employee}
                onBookmarkToggle={() => toggleBookmark(employee.id)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <p className="text-neutral-400 text-lg mb-2">No bookmarked employees</p>
            <p className="text-neutral-500 text-sm">
              Bookmark employees from the dashboard to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}