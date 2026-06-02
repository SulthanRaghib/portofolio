"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view" | "always";
  revealDirection?: "start" | "end" | "center";
  onAnimationComplete?: () => void;
}

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = defaultChars,
  className = "",
  parentClassName = "",
  encryptedClassName = "text-muted-foreground",
  animateOn = "hover",
  revealDirection = "start",
  onAnimationComplete,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const iterationRef = useRef(0);

  const getRandomChar = useCallback(
    () => characters[Math.floor(Math.random() * characters.length)],
    [characters]
  );

  const getNextIndex = useCallback(
    (revealed: Set<number>) => {
      const total = text.length;
      const unrevealed = Array.from({ length: total }, (_, i) => i).filter(
        (i) => !revealed.has(i)
      );
      if (unrevealed.length === 0) return -1;
      if (revealDirection === "start") return unrevealed[0];
      if (revealDirection === "end") return unrevealed[unrevealed.length - 1];
      return unrevealed[Math.floor(unrevealed.length / 2)];
    },
    [text.length, revealDirection]
  );

  const animate = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    iterationRef.current = 0;
    const revealed = new Set<number>();
    setRevealedIndices(new Set());

    const interval = setInterval(() => {
      iterationRef.current++;

      if (iterationRef.current % maxIterations === 0) {
        const nextIdx = getNextIndex(revealed);
        if (nextIdx !== -1) {
          revealed.add(nextIdx);
          setRevealedIndices(new Set(revealed));
        }
      }

      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (revealed.has(i)) return text[i];
            return getRandomChar();
          })
          .join("")
      );

      if (revealed.size === text.replace(/ /g, "").length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        setHasAnimated(true);
        onAnimationComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, getRandomChar, getNextIndex, onAnimationComplete]);

  useEffect(() => {
    if (animateOn === "view" && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated, animate]);

  const handleHover = () => {
    if (animateOn === "hover") animate();
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-pointer ${parentClassName}`}
      onMouseEnter={handleHover}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={revealedIndices.has(i) || hasAnimated ? className : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
