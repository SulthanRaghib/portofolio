import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  featured?: boolean;
  /** stagger delay in milliseconds */
  delay?: number;
}

export function ProjectCardSkeleton({ featured = false, delay = 0 }: Props) {
  const imgClass = featured ? "h-64 md:h-80 lg:h-96" : "h-44 md:h-56 lg:h-64";

  return (
    <Card className={`h-full flex flex-col relative overflow-hidden ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}>
      <div className={`${imgClass} bg-slate-700/30 dark:bg-slate-600/30 relative overflow-hidden`}>
        <div
          className="absolute inset-0 shimmer"
          style={{ animationDelay: `${delay}ms` }}
        />
      </div>

      <CardContent className="p-6 flex-1 flex flex-col relative">
        <div className="h-6 bg-slate-700/30 dark:bg-slate-600/30 rounded w-3/4 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 40}ms` }} />
        </div>

        <div className="flex-1 space-y-3 relative overflow-hidden">
          <div className="h-3 bg-slate-700/30 dark:bg-slate-600/30 rounded w-full relative">
            <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 80}ms` }} />
          </div>
          <div className="h-3 bg-slate-700/30 dark:bg-slate-600/30 rounded w-full relative">
            <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 120}ms` }} />
          </div>
          <div className="h-3 bg-slate-700/30 dark:bg-slate-600/30 rounded w-5/6 relative">
            <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 160}ms` }} />
          </div>
        </div>

        <div className="mt-4 flex gap-2 relative">
          <div className="h-8 bg-slate-700/30 dark:bg-slate-600/30 rounded flex-1 relative">
            <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 200}ms` }} />
          </div>
          <div className="h-8 bg-slate-700/30 dark:bg-slate-600/30 rounded w-20 relative">
            <div className="absolute inset-0 shimmer" style={{ animationDelay: `${delay + 240}ms` }} />
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default ProjectCardSkeleton;
