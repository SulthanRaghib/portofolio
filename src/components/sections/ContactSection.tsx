"use client";
import React from "react";
import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/components/context/language-context";

export default function ContactSection() {
  const { language } = useLanguage();

  return (
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
  );
}
