"use client";

import React, { useRef, useCallback } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  sparkSize?: number;
  duration?: number;
  className?: string;
}

export default function ClickSpark({
  children,
  sparkColor = "#6366f1",
  sparkCount = 8,
  sparkSize = 10,
  duration = 400,
  className = "inline-block",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparks = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = containerRef.current?.offsetWidth || window.innerWidth;
      canvas.height = containerRef.current?.offsetHeight || window.innerHeight;

      const sparks: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        const velocity = 2 + Math.random() * 3;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          size: sparkSize * (0.5 + Math.random() * 0.5),
        });
      }

      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks.forEach((spark) => {
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.vy += 0.1; // gravity
          spark.life = 1 - progress;

          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
          ctx.fillStyle = sparkColor;
          ctx.globalAlpha = spark.life;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    },
    [sparkColor, sparkCount, sparkSize, duration]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSparks(x, y);
    },
    [createSparks]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onClick={handleClick}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
