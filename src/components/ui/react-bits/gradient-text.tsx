"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#6366f1", "#4f46e5", "#3b82f6", "#a78bfa", "#6366f1"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span className={`gradient-text-wrapper relative inline-block ${className}`}>
      {showBorder && (
        <span
          className="gradient-text-border absolute inset-0 rounded-lg z-0"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
            animation: `gradient-text-shimmer ${animationSpeed}s linear infinite`,
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <span
        className="gradient-text-content relative z-10 bg-clip-text text-transparent"
        style={{
          ...gradientStyle,
          backgroundSize: "300% 100%",
          animation: `gradient-text-shimmer ${animationSpeed}s linear infinite`,
        }}
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes gradient-text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}
