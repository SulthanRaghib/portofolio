import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  prominent?: boolean;
  compact?: boolean;
  /** stagger delay in milliseconds */
  delay?: number;
}

export function ProjectCardSkeleton({
  prominent = false,
  compact = false,
  delay = 0,
}: Props) {
  const imgClass = compact
    ? prominent
      ? "h-64 md:h-72 lg:h-80"
      : "h-44 md:h-48 lg:h-56"
    : prominent
      ? "h-72 md:h-80 lg:h-96"
      : "h-52 md:h-56 lg:h-64";

  return (
    <Card
      className={`h-full flex flex-col relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 ${prominent ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div
        className={`${imgClass} bg-slate-700/30 dark:bg-slate-600/30 relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 shimmer"
          style={{ animationDelay: `${delay}ms` }}
        />
      </div>

      <CardContent
        className={`flex-1 flex flex-col relative ${compact ? "p-5 md:p-6" : "p-6 md:p-7"}`}
      >
        <div
          className={`bg-slate-700/30 dark:bg-slate-600/30 rounded w-3/4 relative overflow-hidden ${compact ? "h-5 mb-3" : "h-6 mb-4"}`}
        >
          <div
            className="absolute inset-0 shimmer"
            style={{ animationDelay: `${delay + 40}ms` }}
          />
        </div>

        <div
          className={`flex-1 relative overflow-hidden ${compact ? "space-y-2.5" : "space-y-3"}`}
        >
          <div
            className={`bg-slate-700/30 dark:bg-slate-600/30 rounded w-full relative ${compact ? "h-2.5" : "h-3"}`}
          >
            <div
              className="absolute inset-0 shimmer"
              style={{ animationDelay: `${delay + 80}ms` }}
            />
          </div>
          <div
            className={`bg-slate-700/30 dark:bg-slate-600/30 rounded w-full relative ${compact ? "h-2.5" : "h-3"}`}
          >
            <div
              className="absolute inset-0 shimmer"
              style={{ animationDelay: `${delay + 120}ms` }}
            />
          </div>
          <div
            className={`bg-slate-700/30 dark:bg-slate-600/30 rounded w-5/6 relative ${compact ? "h-2.5" : "h-3"}`}
          >
            <div
              className="absolute inset-0 shimmer"
              style={{ animationDelay: `${delay + 160}ms` }}
            />
          </div>
        </div>

        <div className={`mt-4 flex gap-2 relative ${compact ? "" : ""}`}>
          <div
            className={`bg-slate-700/30 dark:bg-slate-600/30 rounded flex-1 relative ${compact ? "h-7" : "h-8"}`}
          >
            <div
              className="absolute inset-0 shimmer"
              style={{ animationDelay: `${delay + 200}ms` }}
            />
          </div>
          <div
            className={`bg-slate-700/30 dark:bg-slate-600/30 rounded w-20 relative ${compact ? "h-7" : "h-8"}`}
          >
            <div
              className="absolute inset-0 shimmer"
              style={{ animationDelay: `${delay + 240}ms` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCardSkeleton;
