"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import useProjects from "@/hooks/use-projects";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import { ProjectCard } from "@/components/project-card";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const { projects, loading, error } = useProjects({ limit: 9 });

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
            {language === "EN" ? "Featured Projects" : "Proyek Unggulan"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "EN"
              ? "Here are some of my recent projects that showcase my skills and passion for development. Each project demonstrates different aspects of modern web development."
              : "Berikut adalah beberapa proyek terbaru saya yang menunjukkan keterampilan dan hasrat saya untuk pengembangan. Setiap proyek menunjukkan berbagai aspek pengembangan web modern."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={`skeleton-${i}`} featured={i === 0} delay={i * 80} />
          ))}

          {error && (
            <div className="col-span-full text-center text-destructive">{error}</div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">No projects found.</div>
          )}

          {!loading && projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={language === "EN" ? project.descriptionEn : project.descriptionId}
              image={project.image}
              technologies={project.technologies}
              demoUrl={project.demoUrl ?? ""}
              githubUrl={project.githubUrl ?? ""}
              featured={project.featured}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            {language === "EN"
              ? "Want to see more of my work? Check out my GitHub profile for additional projects and contributions."
              : "Ingin melihat lebih banyak karya saya? Kunjungi profil GitHub saya untuk proyek dan kontribusi tambahan."}
          </p>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/SulthanRaghib" target="_blank" rel="noopener noreferrer">
              {language === "EN" ? "View All Projects on GitHub" : "Lihat Semua Proyek di GitHub"}
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
