"use client";

import React, { useRef, useState, useCallback } from "react";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
}

export default function Magnet({
  children,
  className = "",
  padding = 50,
  disabled = false,
  magnetStrength = 0.3,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * magnetStrength;
      const deltaY = (e.clientY - centerY) * magnetStrength;
      setTransform(`translate(${deltaX}px, ${deltaY}px)`);
    },
    [disabled, magnetStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("translate(0, 0)");
  }, []);

  const displayClass = className.includes("block") ? "" : "inline-block";

  return (
    <div
      ref={ref}
      className={`${displayClass} ${className}`}
      style={{
        padding: `${padding}px`,
        margin: `-${padding}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform,
          transition: "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
