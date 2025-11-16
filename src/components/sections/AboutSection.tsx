"use client";
import React from "react";
import Image from "next/image";
import { Code, Database, Globe, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/context/language-context";

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
            {language === "EN" ? "About Me" : "Tentang Saya"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "EN"
              ? "I'm Sulthan Raghib Fillah, a web developer passionate about crafting scalable applications with Laravel, PHP, JavaScript, and modern frameworks. I love transforming complex problems into clean, user-friendly solutions."
              : "Saya Sulthan Raghib Fillah, seorang pengembang web yang memiliki hasrat untuk merancang aplikasi yang skalabel dengan Laravel, PHP, JavaScript, dan kerangka kerja modern. Saya suka mengubah masalah kompleks menjadi solusi yang bersih dan ramah pengguna."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 flex items-center justify-center border-4 border-primary/10">
              <Image
                src="/assets/my-self.jpg"
                alt="Sulthan Raghib Fillah - Web Developer"
                className="w-56 h-56 rounded-full object-cover"
                width={224}
                height={224}
              />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                Sulthan Raghib Fillah
              </h3>
              <p className="text-primary font-semibold mb-4">Web Developer | Backend Engineer</p>
              <p className="text-muted-foreground leading-relaxed">
                {language === "EN"
                  ? "Based in Indonesia. Open for freelance projects and full-time opportunities."
                  : "Berdomisili di Indonesia. Terbuka untuk proyek freelance dan peluang kerja penuh waktu."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                {language === "EN" ? "My Story" : "Cerita Saya"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {language === "EN"
                  ? "My journey started from curiosity in technology and evolved into a career in software development. I've built web apps, backends, and data systems using PHP, Laravel, JavaScript, and MySQL. Along the way, I also gained experience with Python and MongoDB while contributing to AI-related projects."
                  : "Perjalanan saya dimulai dari rasa ingin tahu dalam teknologi dan berkembang menjadi karir di pengembangan perangkat lunak. Saya telah membangun aplikasi web, backend, dan sistem data menggunakan PHP, Laravel, JavaScript, dan MySQL. Sepanjang jalan, saya juga mendapatkan pengalaman dengan Python dan MongoDB saat berkontribusi pada proyek terkait AI."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === "EN"
                  ? "I enjoy learning new technologies, collaborating with teams, and ensuring every project meets both technical and business needs."
                  : "Saya menikmati belajar teknologi baru, berkolaborasi dengan tim, dan memastikan setiap proyek memenuhi kebutuhan teknis dan bisnis."}
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                {language === "EN" ? "What I Do" : "Apa yang Saya Lakukan"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Frontend Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Backend Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Web Applications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">API Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-4xl font-heading font-black text-primary mb-2">5+</div>
            <div className="text-muted-foreground">{language === "EN" ? "Projects Completed" : "Proyek Selesai"}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-black text-primary mb-2">{language === "EN" ? "Fresh Graduate" : "Lulusan Baru"}</div>
            <div className="text-muted-foreground">{language === "EN" ? "Years Experience" : "Tahun Pengalaman"}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-black text-primary mb-2">1+</div>
            <div className="text-muted-foreground">{language === "EN" ? "Clients & Teams" : "Klien & Tim"}</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-12">
            {language === "EN" ? "Skills & Technologies" : "Keahlian & Teknologi"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Code className="h-6 w-6 text-primary mr-2" />
                  <h4 className="font-heading font-bold text-lg">Frontend</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>React / Next.js</div>
                  <div>JavaScript (ES6+)</div>
                  <div>HTML, CSS, Bootstrap, Tailwind</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-primary mr-2" />
                  <h4 className="font-heading font-bold text-lg">Backend</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>PHP (Laravel, CodeIgniter)</div>
                  <div>MySQL, MongoDB</div>
                  <div>REST API</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-primary mr-2" />
                  <h4 className="font-heading font-bold text-lg">Tools</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Git & GitHub</Badge>
                  <Badge variant="secondary">Vercel</Badge>
                  <Badge variant="secondary">SEO Basics</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Postman</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary mr-2" />
                  <h4 className="font-heading font-bold text-lg">Soft Skills</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Problem Solving</div>
                  <div>• Team Collaboration</div>
                  <div>• Communication</div>
                  <div>• Fast Learner</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
