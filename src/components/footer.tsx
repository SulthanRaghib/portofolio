"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
import { useLanguage } from "./context/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link
              href="#home"
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
                  href="#home"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Home" : "Beranda"}
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "About" : "Tentang"}
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {language === "EN" ? "Projects" : "Proyek"}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
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
              Services
            </h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Web Development</li>
              <li className="text-muted-foreground">Backend Engineering</li>
              <li className="text-muted-foreground">API Integration</li>
              <li className="text-muted-foreground">Database Design</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Sulthan Raghib Fillah. All rights reserved.
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
