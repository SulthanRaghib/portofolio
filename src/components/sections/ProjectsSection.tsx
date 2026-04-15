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
  const { projects, loading, error } = useProjects({ limit: 6 });

  return (
    <section
      id="projects"
      className="projects-section-bg relative overflow-hidden py-24 md:py-28 bg-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14 md:mb-18">
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 tracking-tight">
            {language === "EN" ? "Featured Projects" : "Proyek Unggulan"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "EN"
              ? "Here are some of my recent projects that showcase my skills and passion for development. Each project demonstrates different aspects of modern web development."
              : "Berikut adalah beberapa proyek terbaru saya yang menunjukkan keterampilan dan hasrat saya untuk pengembangan. Setiap proyek menunjukkan berbagai aspek pengembangan web modern."}
          </p>
        </div>

        <div className="project-showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 mb-14">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton
                key={`skeleton-${i}`}
                prominent={i === 0}
                delay={i * 80}
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
                prominent={index === 0}
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
