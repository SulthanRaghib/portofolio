"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import useCertifications from "@/hooks/use-certifications";
import { CertificationCard } from "@/components/certification-card";
import Link from "next/link";
import BlurText from "@/components/ui/react-bits/blur-text";
import ShinyText from "@/components/ui/react-bits/shiny-text";
import AnimatedContent from "@/components/ui/react-bits/animated-content";

export default function CertificationsSection() {
  const { language } = useLanguage();
  const { certifications, loading, error } = useCertifications({
    limit: 3,
  });

  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-24 md:py-28 bg-background border-t border-border/30"
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/10 to-background pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <AnimatedContent direction="up">
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center justify-center gap-2 p-2 px-4 bg-primary/10 rounded-xl mb-4 border border-primary/20">
              <Award className="h-5 w-5 text-primary" />
              <ShinyText
                text={language === "EN" ? "Latest Certifications" : "Sertifikasi Terbaru"}
                speed={4}
                className="text-sm font-medium text-primary"
              />
            </div>
            <BlurText
              text={language === "EN" ? "Certifications" : "Sertifikasi"}
              className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 justify-center"
              animateBy="words"
              delay={80}
            />
            <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto rounded-full mt-2 mb-6" />
            <BlurText
              text={
                language === "EN"
                  ? "Professional certifications and completed training programs"
                  : "Sertifikasi profesional dan program pelatihan yang telah diselesaikan"
              }
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed justify-center"
              animateBy="words"
              delay={40}
            />
          </div>
        </AnimatedContent>

        {/* Certifications Grid */}
        <AnimatedContent direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 mb-14">
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`cert-skeleton-${i}`}
                  className="bg-card/40 border border-border/60 rounded-2xl p-5 h-72 flex flex-col justify-between animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-32 bg-muted/65 rounded-lg w-full" />
                    <div className="h-4 bg-muted/65 rounded w-3/4" />
                    <div className="h-3 bg-muted/65 rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 bg-muted/65 rounded flex-1" />
                    <div className="h-9 bg-muted/65 rounded flex-1" />
                  </div>
                </div>
              ))}

            {error && (
              <div className="col-span-full text-center text-destructive">
                {error}
              </div>
            )}

            {!loading && !error && certifications.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-10">
                {language === "EN"
                  ? "No certifications found."
                  : "Sertifikasi tidak ditemukan."}
              </div>
            )}

            {!loading &&
              certifications.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  animationDelay={index * 80}
                />
              ))}
          </div>
        </AnimatedContent>

        {/* Load More Button */}
        <AnimatedContent direction="up" delay={400}>
          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === "EN"
                ? "Want to see the full list of certifications with details and verification credentials?"
                : "Ingin melihat daftar lengkap sertifikasi dengan detail dan tautan verifikasi kredensial?"}
            </p>
            <Button size="lg" asChild className="cursor-pointer">
              <Link href="/certifications">
                {language === "EN"
                  ? "View All Certifications"
                  : "Lihat Semua Sertifikasi"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
