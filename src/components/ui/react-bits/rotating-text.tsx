"use client";

import React, { useEffect, useState } from "react";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  rotationType?: "up" | "down";
}

export default function RotatingText({
  texts,
  className = "",
  interval = 3000,
  rotationType = "up",
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const direction = rotationType === "up" ? "-100%" : "100%";

  return (
    <span className={`inline-flex overflow-hidden relative ${className}`}>
      <span
        className="inline-block transition-transform duration-300 ease-in-out"
        style={{
          transform: isAnimating ? `translateY(${direction})` : "translateY(0)",
          opacity: isAnimating ? 0 : 1,
        }}
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
}
