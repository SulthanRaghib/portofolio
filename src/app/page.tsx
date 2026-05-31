"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

