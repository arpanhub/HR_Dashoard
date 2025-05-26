"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/spotlight";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/Dashboard");
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

      <Spotlight className="-top-20 -left-10 opacity-70" fill="white" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <UserX className="w-24 h-24 text-neutral-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Employee Not Found</h1>
            <p className="text-neutral-400 mb-8">
              The employee you're looking for doesn't exist or may have been removed.
            </p>
          </div>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}