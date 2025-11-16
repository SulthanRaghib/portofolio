"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Code,
  Database,
  Globe,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/context/language-context";
import { getProjects } from "@/lib/api";
import type { Project } from "@/types/project";


export default function Home() {
  const { language } = useLanguage();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProjects({ limit: 9 })
      .then((res) => {
        if (!mounted) return;
        const list = res.data ?? [];
        // Sort: featured first, then by `order` (ascending), then newest `createdAt` first
        const sorted = list.sort((a, b) => {
          const byFeatured = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          if (byFeatured !== 0) return byFeatured;
          const byOrder = (a.order ?? 0) - (b.order ?? 0);
          if (byOrder !== 0) return byOrder;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setProjects(sorted);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load projects");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section
        id="home"
        className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading */}
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            Sulthan Raghib Fillah
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-heading font-bold mb-4">
            Web Developer | Backend Engineer
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {language === "EN"
              ? "Passionate about building scalable applications and crafting modern, elegant solutions with PHP, Laravel, and JavaScript."
              : "Kecintaan dalam membangun aplikasi yang skalabel dan merancang solusi modern yang elegan dengan PHP, Laravel, dan JavaScript."}
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 font-semibold group">
              {language === "EN" ? "View My Work" : "Lihat Karyaku"}
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 font-semibold group bg-transparent"
            >
              {language === "EN" ? "Download Resume" : "Unduh Resume"}
              <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2">
              {language === "EN"
                ? "Scroll to explore"
                : "Gulir untuk menjelajahi"}
            </p>
            <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              {language === "EN" ? "About Me" : "Tentang Saya"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {language === "EN"
                ? "I'm Sulthan Raghib Fillah, a web developer passionate about crafting scalable applications with Laravel, PHP, JavaScript, and modern frameworks. I love transforming complex problems into clean, user-friendly solutions."
                : "Saya Sulthan Raghib Fillah, seorang pengembang web yang memiliki hasrat untuk merancang aplikasi yang skalabel dengan Laravel, PHP, JavaScript, dan kerangka kerja modern. Saya suka mengubah masalah kompleks menjadi solusi yang bersih dan ramah pengguna."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Profile Image and Bio */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 flex items-center justify-center border-4 border-primary/10">
                <Image
                  src="/assets/my-self.jpg"
                  alt="Sulthan Raghib Fillah - Web Developer"
                  className="w-56 h-56 rounded-full object-cover"
                  width={224}
                  height={224}
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Sulthan Raghib Fillah
                </h3>
                <p className="text-primary font-semibold mb-4">
                  Web Developer | Backend Engineer
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "EN"
                    ? "Based in Indonesia. Open for freelance projects and full-time opportunities."
                    : "Berdomisili di Indonesia. Terbuka untuk proyek freelance dan peluang kerja penuh waktu."}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  {language === "EN" ? "My Story" : "Cerita Saya"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "EN"
                    ? "My journey started from curiosity in technology and evolved into a career in software development. I've built web apps, backends, and data systems using PHP, Laravel, JavaScript, and MySQL. Along the way, I also gained experience with Python and MongoDB while contributing to AI-related projects."
                    : "Perjalanan saya dimulai dari rasa ingin tahu dalam teknologi dan berkembang menjadi karir di pengembangan perangkat lunak. Saya telah membangun aplikasi web, backend, dan sistem data menggunakan PHP, Laravel, JavaScript, dan MySQL. Sepanjang jalan, saya juga mendapatkan pengalaman dengan Python dan MongoDB saat berkontribusi pada proyek terkait AI."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "EN"
                    ? "I enjoy learning new technologies, collaborating with teams, and ensuring every project meets both technical and business needs."
                    : "Saya menikmati belajar teknologi baru, berkolaborasi dengan tim, dan memastikan setiap proyek memenuhi kebutuhan teknis dan bisnis."}
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  {language === "EN" ? "What I Do" : "Apa yang Saya Lakukan"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Frontend Development
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Backend Development
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Web Applications
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      API Integration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                5+
              </div>
              <div className="text-muted-foreground">
                {language === "EN" ? "Projects Completed" : "Proyek Selesai"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                {language === "EN" ? "Fresh Graduate" : "Lulusan Baru"}
              </div>
              <div className="text-muted-foreground">
                {language === "EN" ? "Years Experience" : "Tahun Pengalaman"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                1+
              </div>
              <div className="text-muted-foreground">
                {language === "EN" ? "Clients & Teams" : "Klien & Tim"}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="max-w-6xl mx-auto">
            <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-12">
              {language === "EN"
                ? "Skills & Technologies"
                : "Keahlian & Teknologi"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Frontend */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Frontend</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>React / Next.js</div>
                    <div>JavaScript (ES6+)</div>
                    <div>HTML, CSS, Bootstrap, Tailwind</div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Backend</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>PHP (Laravel, CodeIgniter)</div>
                    <div>MySQL, MongoDB</div>
                    <div>REST API</div>
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Git & GitHub</Badge>
                    <Badge variant="secondary">Vercel</Badge>
                    <Badge variant="secondary">SEO Basics</Badge>
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">Postman</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Soft Skills */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">
                      Soft Skills
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Problem Solving</div>
                    <div>• Team Collaboration</div>
                    <div>• Communication</div>
                    <div>• Fast Learner</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
            {loading && (
              <div className="col-span-full text-center text-muted-foreground">
                Loading projects...
              </div>
            )}

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
                    language === "EN" ? project.descriptionEn : project.descriptionId
                  }
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
              <a
                href="https://github.com/SulthanRaghib"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "EN"
                  ? "View All Projects on GitHub"
                  : "Lihat Semua Proyek di GitHub"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              {language === "EN" ? "Let's Work Together" : "Mari Bekerja Sama"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {language === "EN"
                ? "Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life."
                : "Memiliki proyek dalam pikiran? Saya ingin mendengarnya. Mari kita diskusikan bagaimana kita dapat mewujudkan ide-ide Anda."}
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
