"use client";
import React from "react";
import dynamic from "next/dynamic";
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

const LanyardComponent = dynamic(
  () => import("@/components/ui/react-bits/lanyard"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-card/30 rounded-2xl border border-border/20 min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground">Loading 3D...</span>
        </div>
      </div>
    ),
  }
);

const experiences = [
  {
    role: "Pranata Komputer",
    company: "Bapeten",
    period: "Nov 2025 – May 2026",
    type: "Internship",
  },
  {
    role: "Web Developer",
    company: "JasProLand",
    period: "Jun – Sep 2025",
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
  languages: ["PHP", "JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
  frameworks: ["Laravel", "React", "Next.js", "Tailwind CSS", "Alpine.js", "Livewire", "Filament"],
  databases: ["MySQL", "MariaDB", "MongoDB"],
  tools: ["Git", "GitHub", "Postman", "REST API", "Figma", "Vercel"],
};

export default function AboutSection() {
  const { language } = useLanguage();
  const [lanyardVisible, setLanyardVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLanyardVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-muted relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <BlurText
            text={language === "EN" ? "About Me" : "Tentang Saya"}
            className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 justify-center"
            animateBy="words"
            delay={80}
          />
          <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto rounded-full" />
        </div>

        {/* ─── Lanyard + Profile Info ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-start">
          {/* Lanyard 3D Card */}
          <div className="lg:col-span-5">
            <div
              ref={containerRef}
              className="w-full h-[500px] sm:h-[560px] lg:h-[600px] relative rounded-2xl overflow-hidden"
            >
              {lanyardVisible && (
                <LanyardComponent
                  position={[0, 0, 20]}
                  gravity={[0, -40, 0]}
                  fov={26}
                  cardTextureSrc="/assets/my-self.jpg"
                />
              )}
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-2">
              {language === "EN" ? "✦ Drag the card to interact" : "✦ Tarik kartu untuk interaksi"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Name + Title */}
            <div>
              <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
                Sulthan Raghib Fillah
              </h3>
              <GradientText
                className="text-lg md:text-xl font-semibold"
                colors={["#6366f1", "#3b82f6", "#a78bfa", "#6366f1"]}
                animationSpeed={6}
              >
                Full Stack Web Developer
              </GradientText>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-primary/70" />
                  S.Kom — STT Terpadu Nurul Fikri
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  Jakarta, Indonesia
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {language === "EN"
                  ? "Computer Science graduate (GPA 3.83/4.00) with a strong foundation in Full Stack Web Development. I specialize in building enterprise-scale web applications using PHP (Laravel), JavaScript, and relational database ecosystems (MySQL/MariaDB). Experienced in designing MVC architectures, REST API integrations, and secure backend systems."
                  : "Lulusan Teknik Informatika (IPK 3,83/4,00) dengan fondasi kuat dalam Full Stack Web Development. Saya mengkhususkan diri dalam membangun aplikasi web skala enterprise menggunakan PHP (Laravel), JavaScript, dan ekosistem database relasional (MySQL/MariaDB). Berpengalaman merancang arsitektur MVC, integrasi REST API, dan sistem backend yang aman."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {language === "EN"
                  ? "Passionate about continuous learning and cross-functional team collaboration. I've contributed to government digital systems, freelance web projects, and AI-related programs through MSIB (Kampus Merdeka)."
                  : "Antusias dalam pembelajaran berkelanjutan dan kolaborasi tim lintas fungsi. Saya berkontribusi pada sistem digital pemerintah, proyek web freelance, dan program AI melalui MSIB (Kampus Merdeka)."}
              </p>
            </div>

            {/* Experience Timeline */}
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary rounded-full" />
                {language === "EN" ? "Experience" : "Pengalaman"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-3 rounded-xl border border-border/30 bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-semibold text-foreground text-sm leading-tight">
                          {exp.role}
                        </h5>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {exp.type}
                        </Badge>
                      </div>
                      <p className="text-primary/80 text-xs font-medium mt-0.5">{exp.company}</p>
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground/70">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-20">
          {[
            { value: 3, suffix: "+", label: language === "EN" ? "Years Experience" : "Tahun Pengalaman" },
            { value: 5, suffix: "+", label: language === "EN" ? "Projects Built" : "Proyek Dibangun" },
            { value: 10, suffix: "+", label: language === "EN" ? "Technologies" : "Teknologi" },
            { value: 3, suffix: "+", label: language === "EN" ? "Clients & Teams" : "Klien & Tim" },
          ].map((stat, idx) => (
            <SpotlightCard key={idx} className="p-5 text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
              <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
                <CountUp from={0} to={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
            </SpotlightCard>
          ))}
        </div>

        {/* ─── Tech Stack ─── */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-3">
            {language === "EN" ? "Tech Stack" : "Teknologi"}
          </h3>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm">
            {language === "EN"
              ? "Tools and technologies I use to bring ideas to life"
              : "Alat dan teknologi yang saya gunakan untuk mewujudkan ide"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Code, color: "blue", title: language === "EN" ? "Languages" : "Bahasa", items: techStack.languages },
              { icon: Layers, color: "violet", title: "Frameworks", items: techStack.frameworks },
              { icon: Server, color: "emerald", title: language === "EN" ? "Databases" : "Database", items: techStack.databases },
              { icon: Wrench, color: "amber", title: language === "EN" ? "Tools" : "Alat", items: techStack.tools },
            ].map(({ icon: Icon, color, title, items }, idx) => (
              <SpotlightCard key={idx} className="p-5" spotlightColor="rgba(99, 102, 241, 0.12)">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg bg-${color}-500/10 flex items-center justify-center`}>
                      <Icon className={`h-4.5 w-4.5 text-${color}-500`} />
                    </div>
                    <h4 className="font-heading font-bold text-base">{title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[11px] font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
