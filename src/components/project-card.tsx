"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  prominent?: boolean;
  compact?: boolean;
  animationDelay?: number;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  demoUrl,
  githubUrl,
  featured = false,
  prominent = false,
  compact = false,
  animationDelay = 0,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [needsTruncate, setNeedsTruncate] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string | number>("none");

  const LINES = compact ? (prominent ? 3 : 2) : prominent ? 4 : 3;

  // Measure content height and determine whether to show "Read more".
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const paragraph = el.querySelector("p");
    if (!paragraph) return;

    const cs = window.getComputedStyle(paragraph);
    // compute line-height in px; fallback to 18px if cannot parse
    let lineHeight = parseFloat(cs.lineHeight || "0");
    if (isNaN(lineHeight) || lineHeight === 0) {
      // attempt from font-size * 1.4 as fallback
      const fontSize = parseFloat(cs.fontSize || "16");
      lineHeight = fontSize ? fontSize * 1.4 : 18;
    }

    const clampedH = Math.round(lineHeight * LINES);
    const fullH = paragraph.scrollHeight;

    const needs = fullH > clampedH + 1; // small epsilon
    setNeedsTruncate(needs);

    // set initial maxHeight according to expanded state
    setMaxHeight(expanded ? fullH : clampedH);

    // recompute on window resize
    const handler = () => {
      const newFull = paragraph.scrollHeight;
      const newClamped = Math.round(lineHeight * LINES);
      setNeedsTruncate(newFull > newClamped + 1);
      setMaxHeight((prev) => (expanded ? newFull : newClamped));
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [description, LINES, expanded]);
  // root card: full height so grid rows align; featured gets larger column span
  return (
    <Card
      className={`group project-reveal overflow-hidden border border-border/70 bg-card/90 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col rounded-2xl backdrop-blur-sm ${
        prominent ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden w-full flex-shrink-0 ${
          compact
            ? prominent
              ? "h-64 md:h-72 lg:h-80"
              : "h-44 md:h-48 lg:h-56"
            : prominent
              ? "h-72 md:h-80 lg:h-96"
              : "h-52 md:h-56 lg:h-64"
        }`}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} project screenshot`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={1200}
          height={800}
          priority={prominent}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {demoUrl && (
              <Button
                size="sm"
                asChild
                className="bg-primary/90 hover:bg-primary"
              >
                <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button
                size="sm"
                variant="secondary"
                asChild
                className="bg-background/90 hover:bg-background text-foreground"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-4 w-4 mr-1 text-foreground" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content: make it fill remaining space to keep cards same height */}
      <CardContent
        className={`flex-1 flex flex-col ${compact ? "p-5 md:p-6" : "p-6 md:p-7"}`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className={`font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug ${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}
          >
            {title}
          </h3>
          {featured && (
            <Badge
              variant="default"
              className="bg-primary text-primary-foreground shrink-0"
            >
              Featured
            </Badge>
          )}
        </div>

        <div
          className={`text-muted-foreground leading-relaxed ${compact ? "mb-4 text-xs md:text-sm" : "mb-5 text-sm md:text-base"}`}
        >
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{
              maxHeight:
                typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
              transition: "max-height 300ms ease",
            }}
          >
            <p className="m-0">{description}</p>
          </div>

          {needsTruncate && (
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              className={`text-primary mt-2 hover:underline focus:underline ${compact ? "text-xs" : "text-sm"}`}
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className={`flex flex-wrap gap-2 ${compact ? "mb-4" : "mb-5"}`}>
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className={`bg-muted/70 text-muted-foreground hover:bg-muted transition-colors ${compact ? "text-[11px]" : "text-xs"}`}
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2 mt-auto w-full items-center">
          {demoUrl && (
            <Button
              size="sm"
              asChild
              className={`flex-1 min-w-0 ${compact ? "h-9" : "h-10"}`}
            >
              <Link
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center truncate"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="truncate">Live Demo</span>
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className={`flex-1 min-w-0 bg-transparent ${compact ? "h-9" : "h-10"}`}
            >
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center truncate"
              >
                <Github className="h-4 w-4 mr-1" />
                <span className="truncate">Source Code</span>
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
