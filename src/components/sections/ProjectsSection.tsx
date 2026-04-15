"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import useProjects from "@/hooks/use-projects";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const { projects, loading, error } = useProjects({
    limit: 4,
    featured: true,
  });

  return (
    <section
      id="projects"
      className="projects-section-bg relative overflow-hidden py-24 md:py-28 bg-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 tracking-tight">
            {language === "EN" ? "Featured Projects" : "Proyek Unggulan"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "EN"
              ? "A curated selection of featured work. Open the full projects page to explore the complete collection with filters and sorting."
              : "Pilihan proyek unggulan yang sudah dikurasi. Buka halaman proyek lengkap untuk melihat semua proyek dengan filter dan sorting."}
          </p>
        </div>

        <div className="project-showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 md:gap-8 mb-14">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton
                key={`skeleton-${i}`}
                prominent={i === 0}
                delay={i * 80}
                compact
              />
            ))}

          {error && (
            <div className="col-span-full text-center text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              No projects found.
            </div>
          )}

          {!loading &&
            projects.map((project, index) => (
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
                prominent={false}
                compact
                animationDelay={index * 80}
              />
            ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === "EN"
              ? "Want to explore all projects with filters and sorting? Open the full projects page."
              : "Ingin lihat semua proyek dengan filter dan sorting? Buka halaman proyek lengkap."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/projects">
                {language === "EN"
                  ? "Load More Projects"
                  : "Muat Lebih Banyak Proyek"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/SulthanRaghib"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "EN" ? "GitHub Profile" : "Profil GitHub"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
