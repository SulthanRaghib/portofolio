"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLanguage } from "./context/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="bg-background relative pt-20">
      {/* Smooth curve transition from Contact (bg-muted) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[60px] fill-muted"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13,86.19-14.39,170.28-68.67,258-74.85a387.09,387.09,0,0,1,149.6,18.84V0Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link
              href="/#home"
              className="font-heading font-black text-2xl text-primary mb-4 block"
            >
              Sulthan Raghib Fillah
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {language === "EN"
                ? "Web Developer & Backend Engineer passionate about building scalable applications with Laravel, JavaScript, and modern frameworks. Let's create something impactful together."
                : "Web Developer & Backend Engineer yang memiliki passion dalam membangun aplikasi yang scalable dengan Laravel, JavaScript, dan framework modern. Mari kita ciptakan sesuatu yang berdampak bersama."}
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/SulthanRaghib"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 hover:bg-primary/10 rounded-lg"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/sulthan-raghib-fillah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 hover:bg-primary/10 rounded-lg"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sulthan.raghib09@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 hover:bg-primary/10 rounded-lg"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">
              {language === "EN" ? "Quick Links" : "Tautan Cepat"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#home"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Home" : "Beranda"}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "About" : "Tentang"}
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Projects" : "Proyek"}
                </Link>
              </li>
              <li>
                <Link
                  href="/#certifications"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Certifications" : "Sertifikasi"}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Contact" : "Kontak"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">
              {language === "EN" ? "Services" : "Layanan"}
            </h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">{language === "EN" ? "Web Development" : "Pengembangan Web"}</li>
              <li className="text-muted-foreground">{language === "EN" ? "Backend Engineering" : "Rekayasa Backend"}</li>
              <li className="text-muted-foreground">{language === "EN" ? "API Integration" : "Integrasi API"}</li>
              <li className="text-muted-foreground">{language === "EN" ? "Database Design" : "Desain Database"}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Sulthan Raghib Fillah. All rights reserved.
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <span>{language === "EN" ? "Made with" : "Dibuat dengan"}</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            <span>{language === "EN" ? "using Next.js & Tailwind CSS" : "menggunakan Next.js & Tailwind CSS"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
