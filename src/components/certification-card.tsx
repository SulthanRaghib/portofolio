"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ExternalLink, Calendar } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import { CertificationPreviewModal } from "./certification-preview-modal";
import { PdfPageViewer } from "./pdf-page-viewer";
import type { Certification } from "@/types/certification";

interface CertificationCardProps {
  certification: Certification;
  animationDelay?: number;
}

export function CertificationCard({
  certification,
  animationDelay = 0,
}: CertificationCardProps) {
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "EN" ? "en-US" : "id-ID", {
      year: "numeric",
      month: "short",
    });
  };

  // Use the original raw PDF URL for pdf.js rendering
  const pdfUrl = certification.image;

  return (
    <>
      <Card
        className="group project-reveal relative overflow-hidden border border-border/70 bg-card/85 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col rounded-2xl backdrop-blur-sm cursor-pointer"
        style={{ animationDelay: `${animationDelay}ms` }}
        onClick={() => setModalOpen(true)}
      >
        {/* Certificate PDF Thumbnail (rendered via pdf.js) */}
        <div className="relative overflow-hidden w-full h-44 sm:h-48 md:h-52 bg-muted/10 flex-shrink-0 border-b border-border/40">
          <PdfPageViewer
            url={pdfUrl}
            showNavigation={false}
            initialPage={1}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-10">
            <Button
              size="sm"
              className="bg-primary/95 hover:bg-primary shadow-lg pointer-events-none"
            >
              <Eye className="h-4 w-4 mr-1.5" />
              {language === "EN" ? "Quick View" : "Lihat Detail"}
            </Button>
          </div>

          {/* Issuer Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-background/90 text-primary border border-primary/20 backdrop-blur-xs py-1 px-2.5 rounded-full shadow-sm">
              {certification.issuer}
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col p-5 md:p-6 justify-between">
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug text-base md:text-lg">
              {certification.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>
                {language === "EN" ? "Issued" : "Diterbitkan"}: {formatDate(certification.issuedAt)}
              </span>
            </div>

            {certification.skills && certification.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {certification.skills.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/20 text-[10px] transition-colors py-0.5 px-2.5 rounded-full font-semibold"
                  >
                    {skill}
                  </Badge>
                ))}
                {certification.skills.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-muted/60 text-muted-foreground text-[10px] py-0.5 px-2.5 rounded-full font-medium"
                  >
                    +{certification.skills.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-5 mt-auto w-full items-center" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              variant="default"
              className="flex-1 h-9 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <Eye className="h-4 w-4 mr-1.5" />
              {language === "EN" ? "Preview" : "Pratinjau"}
            </Button>
            {certification.credentialUrl ? (
              <Button
                size="sm"
                variant="outline"
                asChild
                className="flex-1 h-9 cursor-pointer bg-transparent hover:bg-muted/40 text-foreground"
              >
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1 text-foreground" />
                  {language === "EN" ? "Verify" : "Verifikasi"}
                </a>
              </Button>
            ) : (
              certification.credentialId && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-9 cursor-pointer bg-transparent hover:bg-muted/40 text-foreground text-[11px]"
                  onClick={() => setModalOpen(true)}
                >
                  ID: {certification.credentialId.slice(0, 8)}...
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>

      <CertificationPreviewModal
        certification={certification}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
