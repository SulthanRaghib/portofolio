"use client";

import React, { useRef, useCallback, useState } from "react";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showShine?: boolean;
  shineColor?: string;
}

export default function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 14,
  scaleOnHover = 1.05,
  showShine = true,
  shineColor = "rgba(255,255,255,0.1)",
}: TiltedCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * rotateAmplitude;
      const rotateY = (x - 0.5) * rotateAmplitude;
      setTransform(
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`
      );
      setShinePos({ x: x * 100, y: y * 100 });
    },
    [rotateAmplitude, scaleOnHover]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {showShine && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, ${shineColor} 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
