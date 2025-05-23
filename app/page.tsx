import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import HomeButton from "@/components/ui/HomeButton";



export default function Home() {
  return (

    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 tracking-tight ">
       
        <span
          className="bg-clip-text text-transparent font-bold"
          style={{
            backgroundImage: "linear-gradient(to bottom, #222, #b9fa00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FlamApp.ai
        </span>
        <br />
        HR Dashboard <span className="italic font-normal">Solution</span>
      </h2>
      <HomeButton />
    </BackgroundLines>
  );
}
