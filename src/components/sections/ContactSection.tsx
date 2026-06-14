"use client";
import React from "react";
import { ContactForm } from "@/components/contact-form";
import BlurText from "@/components/ui/react-bits/blur-text";
import AnimatedContent from "@/components/ui/react-bits/animated-content";
import { useLanguage } from "@/components/context/language-context";

export default function ContactSection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurText
            text={language === "EN" ? "Let's Work Together" : "Mari Berkolaborasi"}
            className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 justify-center"
            delay={80}
            animateBy="words"
            direction="bottom"
          />
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
