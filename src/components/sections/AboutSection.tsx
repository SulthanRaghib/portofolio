"use client";

import Image from "next/image";
import {
  ArrowRight,
  Code,
  Layers,
  Server,
  Wrench,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/context/language-context";
import BlurText from "@/components/ui/react-bits/blur-text";
import CountUp from "@/components/ui/react-bits/count-up";
import SpotlightCard from "@/components/ui/react-bits/spotlight-card";
import TiltedCard from "@/components/ui/react-bits/tilted-card";
import AnimatedContent from "@/components/ui/react-bits/animated-content";
import Magnet from "@/components/ui/react-bits/magnet";

const techStack = {
  languages: ["PHP", "JavaScript", "TypeScript", "Python", "SQL"],
  frameworks: ["Laravel", "React", "Next.js", "Tailwind CSS", "Livewire", "Filament"],
  databases: ["MySQL", "MariaDB", "MongoDB"],
  tools: ["Git", "GitHub", "Postman", "REST API", "Figma", "Vercel"],
};

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 bg-muted relative overflow-hidden">
      {/* Background decoration */}
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

        {/* ─── Profile + Bio ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20 items-center">
          {/* LEFT: Profile Photo */}
          <AnimatedContent direction="left" delay={100}>
            <TiltedCard className="relative overflow-hidden rounded-2xl" rotateAmplitude={10}>
              <Image
                src="/assets/my-self.jpg"
                alt="Sulthan Raghib Fillah"
                width={500}
                height={600}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </TiltedCard>
          </AnimatedContent>

          {/* RIGHT: Bio */}
          <AnimatedContent direction="right" delay={200}>
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-primary font-medium text-sm mb-2 tracking-wider uppercase">
                  {language === "EN" ? "Nice to meet you" : "Salam kenal"}
                </p>
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
                  {language === "EN"
                    ? "I'm Sulthan Raghib Fillah"
                    : "Saya Sulthan Raghib Fillah"}
                </h3>
                <p className="text-primary font-semibold text-lg">
                  Full Stack Web Developer
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {language === "EN"
                  ? "A passionate developer based in Jakarta, Indonesia. I build scalable web applications with clean code and modern design — from backend APIs to polished user interfaces."
                  : "Pengembang antusias yang berbasis di Jakarta, Indonesia. Saya membangun aplikasi web yang skalabel dengan kode bersih dan desain modern — dari backend API hingga antarmuka pengguna yang rapi."}
              </p>

              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {language === "EN"
                  ? "I love turning complex problems into simple, elegant solutions. Whether it's crafting a Laravel backend, building a React frontend, or designing database architectures — I enjoy every part of the process."
                  : "Saya gemar mengubah masalah kompleks menjadi solusi yang simpel dan elegan. Baik itu merancang backend Laravel, membangun frontend React, atau mendesain arsitektur database — saya menikmati setiap bagian dari prosesnya."}
              </p>

              <div className="pt-2">
                <Magnet>
                  <Button size="lg" className="group font-semibold" asChild>
                    <a href="#contact" className="inline-flex items-center">
                      {language === "EN" ? "Let's Work Together" : "Mari Berkolaborasi"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </Magnet>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* ─── Stats ─── */}
        <AnimatedContent direction="up" delay={400}>
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
        </AnimatedContent>

        {/* ─── Tech Stack ─── */}
        <AnimatedContent direction="up" delay={600}>
          <div className="max-w-6xl mx-auto">
            <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-3">
              {language === "EN" ? "Tech Stack" : "Teknologi"}
            </h3>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm">
              {language === "EN"
                ? "The tools I use daily to craft digital experiences"
                : "Alat yang saya gunakan sehari-hari untuk membuat pengalaman digital"}
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
        </AnimatedContent>
      </div>
    </section>
  );
}
