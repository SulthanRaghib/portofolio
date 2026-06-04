"use client";
import React from "react";
import Image from "next/image";
import {
  Code,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Layers,
  Server,
  Wrench,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/context/language-context";
import BlurText from "@/components/ui/react-bits/blur-text";
import CountUp from "@/components/ui/react-bits/count-up";
import SpotlightCard from "@/components/ui/react-bits/spotlight-card";
import GradientText from "@/components/ui/react-bits/gradient-text";

const experiences = [
  {
    role: "Pranata Komputer (Intern)",
    company: "Bapeten",
    period: "Nov 2025 – May 2026",
    type: "Internship",
  },
  {
    role: "Web Developer",
    company: "JasProLand",
    period: "Jun 2025 – Sep 2025",
    type: "Freelance",
  },
  {
    role: "Data Annotator",
    company: "Infidea",
    period: "May 2023 – Jan 2025",
    type: "Contract",
  },
  {
    role: "Backend Developer",
    company: "Edukidos",
    period: "Dec 2022 – Jan 2023",
    type: "Freelance",
  },
];

const techStack = {
  languages: [
    "PHP",
    "JavaScript",
    "TypeScript",
    "Python",
    "HTML",
    "CSS",
    "SQL",
  ],
  frameworks: [
    "Laravel",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Alpine.js",
    "Livewire",
    "Filament",
    "Bootstrap",
  ],
  databases: ["MySQL", "MariaDB", "MongoDB", "SQL Query"],
  tools: ["Git", "GitHub", "Postman", "REST API", "Figma", "Vercel"],
};

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 bg-muted relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <BlurText
            text={language === "EN" ? "About Me" : "Tentang Saya"}
            className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 justify-center"
            animateBy="words"
            delay={80}
          />
          <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto rounded-full" />
        </div>

        {/* ─── Profile Card + Bio ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <SpotlightCard className="p-0 overflow-hidden" spotlightColor="rgba(99, 102, 241, 0.15)">
              {/* Profile Photo */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src="/assets/my-self.jpg"
                  alt="Sulthan Raghib Fillah"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              {/* Profile info overlay */}
              <div className="relative -mt-24 px-6 pb-6 z-10">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-1">
                  Sulthan Raghib Fillah
                </h3>
                <GradientText
                  className="text-base font-semibold"
                  colors={["#6366f1", "#3b82f6", "#a78bfa", "#6366f1"]}
                  animationSpeed={6}
                >
                  Full Stack Web Developer
                </GradientText>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4 text-primary/70 shrink-0" />
                    <span>S.Kom — STT Terpadu Nurul Fikri</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-primary/70 shrink-0" />
                    <span>
                      {language === "EN"
                        ? "Open for opportunities"
                        : "Terbuka untuk peluang kerja"}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Bio + Experience */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bio */}
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {language === "EN" ? "Who I Am" : "Tentang Saya"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                {language === "EN"
                  ? "Computer Science graduate (GPA 3.83/4.00) with a strong foundation in Full Stack Web Development. I specialize in building enterprise-scale web applications using PHP (Laravel), JavaScript, and relational database ecosystems (MySQL/MariaDB). Experienced in designing MVC architectures, REST API integrations, dynamic frontends, and secure backend systems."
                  : "Lulusan Teknik Informatika (IPK 3,83/4,00) dengan fondasi kuat dalam Full Stack Web Development. Saya mengkhususkan diri dalam membangun aplikasi web skala enterprise menggunakan PHP (Laravel), JavaScript, dan ekosistem database relasional (MySQL/MariaDB). Berpengalaman merancang arsitektur MVC, integrasi REST API, antarmuka dinamis, dan sistem backend yang aman."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {language === "EN"
                  ? "Passionate about continuous learning, problem-solving, and cross-functional team collaboration. I've contributed to government digital systems, freelance web projects, and AI-related programs through MSIB (Kampus Merdeka)."
                  : "Antusias dalam pembelajaran berkelanjutan, pemecahan masalah, dan kolaborasi tim lintas fungsi. Saya berkontribusi pada sistem digital pemerintah, proyek web freelance, dan program AI melalui MSIB (Kampus Merdeka)."}
              </p>
            </div>

            {/* Experience Timeline */}
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {language === "EN" ? "Experience" : "Pengalaman"}
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h4 className="font-semibold text-foreground text-sm">
                          {exp.role}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="w-fit text-[11px] px-2 py-0.5"
                        >
                          {exp.type}
                        </Badge>
                      </div>
                      <p className="text-primary/80 text-sm font-medium">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          <SpotlightCard className="p-6 text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
            <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
              <CountUp from={0} to={3} suffix="+" duration={2.5} />
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {language === "EN" ? "Years Experience" : "Tahun Pengalaman"}
            </div>
          </SpotlightCard>
          <SpotlightCard className="p-6 text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
            <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
              <CountUp from={0} to={5} suffix="+" duration={2.5} />
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {language === "EN" ? "Projects Built" : "Proyek Dibangun"}
            </div>
          </SpotlightCard>
          <SpotlightCard className="p-6 text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
            <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
              <CountUp from={0} to={10} suffix="+" duration={2.5} />
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {language === "EN" ? "Technologies" : "Teknologi"}
            </div>
          </SpotlightCard>
          <SpotlightCard className="p-6 text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
            <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
              <CountUp from={0} to={3} suffix="+" duration={2.5} />
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {language === "EN" ? "Clients & Teams" : "Klien & Tim"}
            </div>
          </SpotlightCard>
        </div>

        {/* ─── Tech Stack ─── */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-4">
            {language === "EN" ? "Tech Stack" : "Teknologi"}
          </h3>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "EN"
              ? "Tools and technologies I use to bring ideas to life"
              : "Alat dan teknologi yang saya gunakan untuk mewujudkan ide"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard className="p-6" spotlightColor="rgba(99, 102, 241, 0.12)">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <h4 className="font-heading font-bold text-lg">
                    {language === "EN" ? "Languages" : "Bahasa"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.languages.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>

            <SpotlightCard className="p-6" spotlightColor="rgba(99, 102, 241, 0.12)">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-violet-500" />
                  </div>
                  <h4 className="font-heading font-bold text-lg">Frameworks</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.frameworks.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>

            <SpotlightCard className="p-6" spotlightColor="rgba(99, 102, 241, 0.12)">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Server className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h4 className="font-heading font-bold text-lg">
                    {language === "EN" ? "Databases" : "Database"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.databases.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>

            <SpotlightCard className="p-6" spotlightColor="rgba(99, 102, 241, 0.12)">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-amber-500" />
                  </div>
                  <h4 className="font-heading font-bold text-lg">
                    {language === "EN" ? "Tools" : "Alat"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
