"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Star, Bookmark, BookmarkCheck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmployeeCardProps {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  profileImage: string;
  performanceRating: number;
  skills: string[];
  bookmarked: boolean;
  isActive: boolean;
  onBookmarkToggle?: () => void;
}

interface AddEmployeeCardProps {
  onClick: () => void;
}

export default function EmployeeCard({
  id,
  name,
  email,
  department,
  designation,
  profileImage,
  performanceRating,
  skills,
  bookmarked,
  isActive,
  onBookmarkToggle,
}: EmployeeCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/Employee/${id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    onBookmarkToggle?.();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 4.0) return "text-blue-400";
    if (rating >= 3.5) return "text-yellow-400";
    return "text-orange-400";
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-400/10 border-green-400/20";
    if (rating >= 4.0) return "bg-blue-400/10 border-blue-400/20";
    if (rating >= 3.5) return "bg-yellow-400/10 border-yellow-400/20";
    return "bg-orange-400/10 border-orange-400/20";
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-black/40 hover:bg-black/60 border border-neutral-800 hover:border-neutral-200 rounded-xl p-6 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5"
    >
      {/* Bookmark Button */}
      <button
        onClick={handleBookmarkClick}
        className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/50 hover:bg-black/80 transition-colors z-10"
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4 text-yellow-400" />
        ) : (
          <Bookmark className="w-4 h-4 text-neutral-400 hover:text-yellow-400" />
        )}
      </button>

      {/* Active Indicator */}
      <div className="absolute top-4 left-4">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            isActive ? "bg-green-400" : "bg-red-400"
          )}
        />
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-4 mt-2">
        <div className="relative">
          <img
            src={profileImage}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-700 group-hover:border-neutral-500 transition-colors"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f1f1f&color=ffffff&size=64`;
            }}
          />
        </div>
      </div>

      {/* Employee Info */}
      <div className="text-center mb-4">
        <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-blue-300 transition-colors">
          {name}
        </h3>
        <p className="text-neutral-400 text-sm mb-1">{designation}</p>
        <p className="text-neutral-500 text-xs">{department}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center mb-4">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border",
            getRatingBgColor(performanceRating)
          )}
        >
          <Star className={cn("w-4 h-4", getRatingColor(performanceRating))} fill="currentColor" />
          <span className={cn("text-sm font-medium", getRatingColor(performanceRating))}>
            {performanceRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-neutral-800/80 text-neutral-300 rounded-md border border-neutral-700/50"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 text-xs bg-neutral-800/80 text-neutral-400 rounded-md border border-neutral-700/50">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#b9fa00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
    </div>
  );
}

export function AddEmployeeCard({ onClick }: AddEmployeeCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-black/20 hover:bg-black/40 border-2 border-dashed border-neutral-700 hover:border-neutral-500 rounded-xl p-6 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center min-h-[320px]"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center mb-4 group-hover:bg-neutral-700/50 transition-colors">
          <Plus className="w-8 h-8 text-neutral-400 group-hover:text-neutral-300 transition-colors" />
        </div>
        <h3 className="text-neutral-400 group-hover:text-neutral-300 text-lg font-medium mb-2 transition-colors">
          Add Employee
        </h3>
        <p className="text-neutral-500 text-sm">
          Click to add a new team member
        </p>
      </div>
    </div>
  );
}