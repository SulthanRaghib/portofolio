"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import useProjects from "@/hooks/use-projects";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import BlurText from "@/components/ui/react-bits/blur-text";
import AnimatedContent from "@/components/ui/react-bits/animated-content";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const { projects, loading, error } = useProjects({
    limit: 4,
    featured: true,
  });

  return (
    <section
      id="projects"
      className="projects-section-bg relative overflow-hidden pt-32 pb-24 md:pt-36 md:pb-28 bg-background"
    >
      {/* Smooth curve transition from About (bg-muted) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[60px] fill-muted"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13,86.19-14.39,170.28-68.67,258-74.85a387.09,387.09,0,0,1,149.6,18.84V0Z" />
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <AnimatedContent direction="up">
          <div className="text-center mb-12 md:mb-14">
            <BlurText
              text={language === "EN" ? "Featured Projects" : "Proyek Unggulan"}
              className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 justify-center"
              animateBy="words"
              delay={80}
            />
            <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto rounded-full mt-2 mb-6" />
            <BlurText
              text={
                language === "EN"
                  ? "A selection of projects that showcase my expertise and passion"
                  : "Pilihan proyek yang menunjukkan keahlian dan dedikasi saya"
              }
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed justify-center"
              animateBy="words"
              delay={40}
            />
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={200}>
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
        </AnimatedContent>

        <AnimatedContent direction="up" delay={400}>
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
                    ? "View All Projects"
                    : "Lihat Semua Proyek"}
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
        </AnimatedContent>
      </div>
    </section>
  );
}
