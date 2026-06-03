"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, ArrowDown } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import Particles from "@/components/ui/react-bits/particles";
import SplitText from "@/components/ui/react-bits/split-text";
import GradientText from "@/components/ui/react-bits/gradient-text";
import BlurText from "@/components/ui/react-bits/blur-text";

export default function HeroSection() {
  const { language } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [particlesVisible, setParticlesVisible] = React.useState(true);

  // Destroy Particles WebGL context when Hero scrolls out of view
  // to free GPU resources for the Lanyard 3D canvas in About section
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setParticlesVisible(entry.isIntersecting);
      },
      { threshold: 0.0, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Particle Background - only rendered when Hero is visible */}
      <div className="absolute inset-0 z-0 opacity-45 dark:opacity-65 pointer-events-none">
        {particlesVisible && (
          <Particles
            particleColors={["#6366f1", "#4f46e5", "#3b82f6", "#a78bfa"]}
            particleCount={150}
            particleSpread={10}
            speed={0.12}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        )}
      </div>

      {/* Bottom fade transition overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted to-transparent pointer-events-none z-[1]" />

      {/* Main content - centered layout */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <SplitText
          text="Sulthan Raghib Fillah"
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight justify-center"
          delay={30}
        />

        <div className="mb-4 text-center">
          <GradientText
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
            colors={[
              "#6366f1",
              "#4f46e5",
              "#3b82f6",
              "#a78bfa",
              "#6366f1",
            ]}
            animationSpeed={6}
          >
            Web Developer | Backend Engineer
          </GradientText>
        </div>

        <div className="max-w-2xl mx-auto mb-8 text-center">
          <BlurText
            text={
              language === "EN"
                ? "Passionate about building scalable applications and crafting modern, elegant solutions with PHP, Laravel, and JavaScript."
                : "Kecintaan dalam membangun aplikasi yang skalabel dan merancang solusi modern yang elegan dengan PHP, Laravel, dan JavaScript."
            }
            className="text-lg md:text-xl text-muted-foreground leading-relaxed justify-center"
            delay={30}
            animateBy="words"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            className="text-lg px-8 py-6 font-semibold group"
            asChild
          >
            <a href="#projects" className="inline-flex items-center">
              {language === "EN" ? "View My Work" : "Lihat Karyaku"}
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 font-semibold group"
            asChild
          >
            <a
              href="/assets/Resume_Sulthan-Raghib-Fillah.pdf"
              download
              className="inline-flex items-center bg-transparent"
            >
              {language === "EN" ? "Download Resume" : "Unduh Resume"}
              <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </Button>
        </div>

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
  );
}

