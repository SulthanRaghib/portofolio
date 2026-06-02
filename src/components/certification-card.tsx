"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ExternalLink, Calendar, Award } from "lucide-react";
import { useLanguage } from "@/components/context/language-context";
import { CertificationPreviewModal } from "./certification-preview-modal";
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

  return (
    <>
      <Card
        className="group project-reveal relative overflow-hidden border border-border/70 bg-card/85 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col rounded-2xl backdrop-blur-sm cursor-pointer"
        style={{ animationDelay: `${animationDelay}ms` }}
        onClick={() => setModalOpen(true)}
      >
        {/* Certificate Template Preview */}
        <div className="relative overflow-hidden w-full h-44 sm:h-48 md:h-52 bg-linear-to-br from-card to-muted/80 flex-shrink-0 border-b border-border/40 p-4 flex flex-col justify-between text-foreground">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-2 border border-primary/20 pointer-events-none rounded-lg" />

          {/* Certificate Header */}
          <div className="text-center mt-1 z-10">
            <div className="flex justify-center mb-0.5">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-heading font-black text-[9px] sm:text-[10px] tracking-widest text-primary uppercase">
              {language === "EN" ? "Certificate of Achievement" : "Sertifikat Pencapaian"}
            </h4>
            <div className="h-[1px] w-12 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mt-0.5" />
          </div>

          {/* Recipient and Class */}
          <div className="text-center my-1 px-1 z-10">
            <p className="text-[7px] sm:text-[8px] text-muted-foreground italic mb-0.5">
              {language === "EN" ? "This is to certify that" : "Dengan ini menyatakan bahwa"}
            </p>
            <h5 className="font-heading font-bold text-xs sm:text-sm text-foreground mb-1 leading-tight">
              Sulthan Raghib Fillah
            </h5>
            <p className="text-[7px] sm:text-[8px] text-muted-foreground mb-0.5">
              {language === "EN" ? "has successfully completed" : "telah berhasil menyelesaikan kelas"}
            </p>
            <h6 className="font-heading font-extrabold text-[9px] sm:text-[10px] text-foreground max-w-[90%] mx-auto leading-snug line-clamp-1">
              {certification.title}
            </h6>
          </div>

          {/* Footer Metadata */}
          <div className="flex justify-between items-end border-t border-border/40 pt-1.5 text-[7px] sm:text-[8px] z-10">
            <div className="flex flex-col">
              <span className="text-muted-foreground font-semibold uppercase">
                {language === "EN" ? "ISSUED BY" : "PENERBIT"}
              </span>
              <span className="font-bold text-foreground truncate max-w-[80px]">{certification.issuer}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-muted-foreground font-semibold uppercase">
                {language === "EN" ? "DATE OF ISSUE" : "TANGGAL TERBIT"}
              </span>
              <span className="font-bold text-foreground">{formatDate(certification.issuedAt)}</span>
            </div>
          </div>

          {/* Watermark badge icon in background */}
          <div className="absolute bottom-6 right-6 opacity-[0.03] pointer-events-none select-none">
            <Award className="h-16 w-16" />
          </div>

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
