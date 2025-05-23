"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EmployeeCard from "@/Component/EmployeeCard";
import { useRouter } from "next/navigation";
import { useEmployees, useEmployeeSearch, useBookmarks } from "@/hooks/useEmployeeHooks";
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const { employees, isLoading, hasLoaded } = useEmployees();
  const { toggleBookmark } = useBookmarks();
  const { employees: filteredEmployees, hasResults } = useEmployeeSearch(searchValue);

 
  useEffect(() => {
    if (hasLoaded && employees.length > 0) {
      toast.success(`${employees.length} employees loaded!`, { icon: "👥" });
    }
  }, [hasLoaded, employees.length]);


  const handleAddEmployee = () => {
    router.push("/add-employee");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      {/* Background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 p-4 sm:p-6 md:p-8">
        {/* Left side - Title */}
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <Spotlight className="-top-20 -left-10 opacity-70" fill="white" />
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent leading-tight">
            Welcome to your HR command center!
          </h1>
        </div>

        {/* Right side - Search */}
        <div className="flex-shrink-0 w-full sm:w-80 lg:w-80 lg:ml-8">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="search" className="text-neutral-300 text-sm">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search employees, departments..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-black/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 pt-0 sm:pt-2">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <p className="text-neutral-400">Loading employees...</p>
          </div>
        )}

        {/* Employee Cards Grid */}
        {!isLoading && hasResults && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                {...employee}
                onBookmarkToggle={() => {
                  toggleBookmark(employee.id);
                  toast.success(
                    !employee.bookmarked
                      ? `${employee.name} added to bookmarks`
                      : `${employee.name} removed from bookmarks`,
                    {
                      icon: !employee.bookmarked ? "🔖" : "❌",
                    }
                  );
                }}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !hasResults && searchValue && (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-lg mb-2">No employees found</p>
            <p className="text-neutral-500 text-sm">
              Try different search terms or{" "}
              <button
                onClick={() => setSearchValue("")}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                clear search
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}