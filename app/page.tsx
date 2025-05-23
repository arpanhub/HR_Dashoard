import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import HomeButton from "@/components/ui/HomeButton";

export default function Home() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full min-h-screen flex-col px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans py-4 sm:py-6 md:py-8 lg:py-10 relative z-20 tracking-tight leading-tight">
          <span
            className="bg-clip-text text-transparent font-bold block "
            style={{
              backgroundImage: "linear-gradient(to bottom, #222, #b9fa00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FlamApp.ai
          </span>
          <span className="block">
            HR Dashboard{" "}
            <span className="italic font-normal">Solution</span>
          </span>
        </h2>
        
        <div className="mt-6 sm:mt-8 md:mt-10">
          <HomeButton />
        </div>
      </div>
    </BackgroundLines>
  );
}