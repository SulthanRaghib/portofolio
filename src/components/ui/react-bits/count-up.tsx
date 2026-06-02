"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onEnd?: () => void;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({
  from = 0,
  to,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onEnd,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !startWhen || hasStarted) return;

    setHasStarted(true);
    const el = ref.current;
    if (!el) return;

    const startVal = direction === "up" ? from : to;
    const endVal = direction === "up" ? to : from;

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const durationMs = duration * 1000;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Ease out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(
          startVal + (endVal - startVal) * easedProgress
        );

        let displayValue = currentValue.toString();
        if (separator) {
          displayValue = currentValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }

        el.textContent = `${prefix}${displayValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${prefix}${endVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}${suffix}`;
          onEnd?.();
        }
      };

      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, startWhen, hasStarted, from, to, direction, delay, duration, separator, prefix, suffix, onEnd]);

  const initialDisplay = direction === "up" ? from : to;
  return (
    <span ref={ref} className={className}>
      {prefix}{initialDisplay}{suffix}
    </span>
  );
}
