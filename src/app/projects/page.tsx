"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/context/language-context";
import useProjects from "@/hooks/use-projects";
import { ProjectCard } from "@/components/project-card";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import type { Project } from "@/types/project";

type FilterValue = "all" | "featured" | "web" | "ai";
type SortValue = "latest" | "oldest" | "name";

function inferCategory(project: Project): "web" | "ai" {
  const text = [project.title, ...project.technologies].join(" ").toLowerCase();
  const aiKeywords = ["ai", "ml", "llm", "chatbot", "nlp", "machine learning"];
  const isAi = aiKeywords.some((keyword) => text.includes(keyword));
  return isAi ? "ai" : "web";
}

export default function AllProjectsPage() {
  const { language } = useLanguage();
  const { projects, loading, error } = useProjects({ limit: 100 });
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("latest");

  const filteredAndSorted = useMemo(() => {
    let items = [...projects];

    if (filter === "featured") {
      items = items.filter((project) => project.featured);
    } else if (filter === "web" || filter === "ai") {
      items = items.filter((project) => inferCategory(project) === filter);
    }

    items.sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      const timeA = new Date(a.createdAt ?? 0).getTime();
      const timeB = new Date(b.createdAt ?? 0).getTime();
      return sort === "oldest" ? timeA - timeB : timeB - timeA;
    });

    return items;
  }, [projects, filter, sort]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 projects-section-bg bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-20">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Button variant="ghost" asChild className="mb-3 -ml-3">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === "EN" ? "Back to Home" : "Kembali ke Beranda"}
                </Link>
              </Button>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground tracking-tight">
                {language === "EN" ? "All Projects" : "Semua Proyek"}
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                {language === "EN"
                  ? "Explore complete project list with quick filters and lightweight sorting."
                  : "Jelajahi semua proyek dengan filter cepat dan sorting ringan."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpDown className="h-4 w-4" />
              <label htmlFor="project-sort" className="sr-only">
                {language === "EN" ? "Sort projects" : "Urutkan proyek"}
              </label>
              <select
                id="project-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="h-10 rounded-md border border-border bg-background px-3 text-foreground"
              >
                <option value="latest">
                  {language === "EN" ? "Latest" : "Terbaru"}
                </option>
                <option value="oldest">
                  {language === "EN" ? "Oldest" : "Terlama"}
                </option>
                <option value="name">
                  {language === "EN" ? "Name (A-Z)" : "Nama (A-Z)"}
                </option>
              </select>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              {language === "EN" ? "All" : "Semua"}
            </Button>
            <Button
              size="sm"
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
            >
              {language === "EN" ? "Featured" : "Unggulan"}
            </Button>
            <Button
              size="sm"
              variant={filter === "web" ? "default" : "outline"}
              onClick={() => setFilter("web")}
            >
              Web
            </Button>
            <Button
              size="sm"
              variant={filter === "ai" ? "default" : "outline"}
              onClick={() => setFilter("ai")}
            >
              AI
            </Button>
          </div>

          <div className="project-showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton
                  key={`all-skeleton-${i}`}
                  prominent={i === 0}
                  delay={i * 80}
                  compact={false}
                />
              ))}

            {error && (
              <div className="col-span-full text-center text-destructive">
                {error}
              </div>
            )}

            {!loading && !error && filteredAndSorted.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                {language === "EN"
                  ? "No projects match this filter yet."
                  : "Belum ada proyek yang cocok dengan filter ini."}
              </div>
            )}

            {!loading &&
              filteredAndSorted.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={
                    language === "EN"
                      ? project.descriptionEn
                      : project.descriptionId
                  }
                  image={project.image}
                  technologies={project.technologies}
                  demoUrl={project.demoUrl ?? ""}
                  githubUrl={project.githubUrl ?? ""}
                  featured={project.featured}
                  prominent={index === 0 && filter === "all"}
                  animationDelay={index * 60}
                  compact={false}
                />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
