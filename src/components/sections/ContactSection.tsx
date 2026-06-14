"use client";
import React from "react";
import { ContactForm } from "@/components/contact-form";
import BlurText from "@/components/ui/react-bits/blur-text";
import AnimatedContent from "@/components/ui/react-bits/animated-content";
import { useLanguage } from "@/components/context/language-context";

export default function ContactSection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="pt-28 pb-20 bg-muted relative overflow-hidden">
      {/* Smooth curve transition from Certifications (bg-background) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[60px] fill-background"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13,86.19-14.39,170.28-68.67,258-74.85a387.09,387.09,0,0,1,149.6,18.84V0Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <BlurText
            text={language === "EN" ? "Let's Work Together" : "Mari Berkolaborasi"}
            className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 justify-center"
            delay={80}
            animateBy="words"
            direction="bottom"
          />
          <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto rounded-full mt-2 mb-6" />
          <AnimatedContent direction="up" delay={200} distance={20}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {language === "EN"
                ? "Have a project in mind or want to collaborate? I'd love to hear from you."
                : "Punya ide proyek atau ingin berkolaborasi? Saya senang mendengar dari Anda."}
            </p>
          </AnimatedContent>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
