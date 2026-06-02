/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useRef, useCallback } from "react";
import { motion, useInView, type Variant } from "framer-motion";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: Variant;
  animationTo?: Variant;
  easing?: string | number[];
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify";
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = [0.25, 0.4, 0.25, 1],
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin as any,
    amount: threshold,
  });
  const completedCount = useRef(0);

  const letters = useMemo(() => {
    const result: { char: string; key: string }[] = [];
    text.split("").forEach((char, i) => {
      result.push({ char, key: `${char}-${i}` });
    });
    return result;
  }, [text]);

  const handleComplete = useCallback(() => {
    completedCount.current += 1;
    if (completedCount.current === letters.length) {
      onLetterAnimationComplete?.();
    }
  }, [letters.length, onLetterAnimationComplete]);

  return (
    <p
      ref={ref}
      className={`split-text-wrapper overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: "pre-wrap", wordWrap: "break-word" }}
    >
      {letters.map(({ char, key }, i) => (
        <motion.span
          key={key}
          initial={animationFrom as any}
          animate={isInView ? animationTo as any : animationFrom as any}
          transition={{
            delay: i * (delay / 1000),
            ease: easing as any,
            duration: 0.5,
          }}
          onAnimationComplete={handleComplete}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  );
}
