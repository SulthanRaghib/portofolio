"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, ArrowDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/context/language-context";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section
      id="home"
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
          Sulthan Raghib Fillah
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-heading font-bold mb-4">
          Web Developer | Backend Engineer
        </p>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {language === "EN"
            ? "Passionate about building scalable applications and crafting modern, elegant solutions with PHP, Laravel, and JavaScript."
            : "Kecintaan dalam membangun aplikasi yang skalabel dan merancang solusi modern yang elegan dengan PHP, Laravel, dan JavaScript."}
        </p>

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

        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">
            {language === "EN" ? "Scroll to explore" : "Gulir untuk menjelajahi"}
          </p>
          <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
