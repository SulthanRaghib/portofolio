"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text ${disabled ? "" : "animate-shiny-text"} bg-[length:250%_100%] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
        WebkitTextFillColor: "inherit",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shiny-text-anim {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shiny-text {
          animation: shiny-text-anim ${speed}s linear infinite;
        }
      `}</style>
    </span>
  );
}
