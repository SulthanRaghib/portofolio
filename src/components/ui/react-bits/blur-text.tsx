/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom" | "left" | "right" | "none";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: string | number[];
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text = "",
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "-50px",
  animationFrom,
  animationTo,
  easing = [0.25, 0.4, 0.25, 1],
  onAnimationComplete,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin as any, amount: threshold });

  const defaultFrom: Record<string, any> = {
    filter: "blur(10px)",
    opacity: 0,
    y: direction === "bottom" ? 20 : direction === "top" ? -20 : 0,
    x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
  };

  const defaultTo: Record<string, any> = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    x: 0,
  };

  const fromAnim = animationFrom || defaultFrom;
  const toAnim = animationTo || defaultTo;

  const elements =
    animateBy === "words"
      ? text.split(" ").map((word, i) => ({ text: word, key: `w-${i}` }))
      : text.split("").map((char, i) => ({ text: char, key: `c-${i}` }));

  let completedCount = 0;

  return (
    <p ref={ref} className={`blur-text-wrapper flex flex-wrap ${className}`}>
      {elements.map(({ text: t, key }, i) => (
        <motion.span
          key={key}
          initial={fromAnim}
          animate={isInView ? toAnim : fromAnim}
          transition={{
            delay: i * (delay / 1000),
            duration: 0.5,
            ease: easing as any,
          }}
          onAnimationComplete={() => {
            completedCount++;
            if (completedCount === elements.length) {
              onAnimationComplete?.();
            }
          }}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {t === " " ? "\u00A0" : t}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}
