"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, ExternalLink, Copy, Check, Award, Calendar, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/context/language-context";
import { PdfPageViewer } from "./pdf-page-viewer";
import type { Certification } from "@/types/certification";

interface CertificationPreviewModalProps {
  certification: Certification;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificationPreviewModal({
  certification,
  isOpen,
  onClose,
}: CertificationPreviewModalProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setPdfError(false);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleCopyCredential = async () => {
    if (!certification.credentialId) return;
    try {
      await navigator.clipboard.writeText(certification.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy credential ID:", err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "EN" ? "en-US" : "id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pdfUrl = certification.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] z-10 animate-in zoom-in-95 duration-200">

        {/* Left: PDF Preview with page-by-page navigation */}
        <div className="relative flex-1 bg-black/30 border-b md:border-b-0 md:border-r border-border/60 min-h-[40vh] md:min-h-0">
          {pdfError ? (
            /* Digital Certificate Mockup (offline fallback) */
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="w-full max-w-lg aspect-[1.414/1] bg-linear-to-br from-card to-muted p-8 rounded-xl border-2 border-primary/30 relative overflow-hidden flex flex-col justify-between shadow-lg text-foreground">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-4 border border-primary/20 pointer-events-none rounded-lg" />

                <div className="text-center mt-2">
                  <div className="flex justify-center mb-2">
                    <Award className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <h4 className="font-heading font-black text-lg tracking-widest text-primary uppercase">
                    {language === "EN" ? "Certificate of Achievement" : "Sertifikat Pencapaian"}
                  </h4>
                  <div className="h-[2px] w-24 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
                </div>

                <div className="text-center my-4 px-2">
                  <p className="text-xs text-muted-foreground italic mb-1">
                    {language === "EN" ? "This is to certify that" : "Dengan ini menyatakan bahwa"}
                  </p>
                  <h5 className="font-heading font-bold text-xl text-foreground mb-3">
                    Sulthan Raghib Fillah
                  </h5>
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === "EN" ? "has successfully completed" : "telah berhasil menyelesaikan kelas"}
                  </p>
                  <h6 className="font-heading font-extrabold text-base text-foreground max-w-sm mx-auto leading-snug">
                    {certification.title}
                  </h6>
                </div>

                <div className="flex justify-between items-end border-t border-border/40 pt-3 text-[10px]">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-semibold">
                      {language === "EN" ? "ISSUED BY" : "PENERBIT"}
                    </span>
                    <span className="font-bold text-foreground">{certification.issuer}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-muted-foreground font-semibold">
                      {language === "EN" ? "DATE OF ISSUE" : "TANGGAL TERBIT"}
                    </span>
                    <span className="font-bold text-foreground">{formatDate(certification.issuedAt)}</span>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 opacity-5 pointer-events-none select-none">
                  <Award className="h-28 w-28" />
                </div>
              </div>
            </div>
          ) : (
            /* PDF Page Viewer — full page view with prev/next arrows */
            <PdfPageViewer
              url={pdfUrl}
              showNavigation={true}
              initialPage={1}
              onError={() => setPdfError(true)}
            />
          )}
        </div>

        {/* Right: Details & Actions */}
        <div className="w-full md:w-80 flex flex-col justify-between p-6 bg-card">
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {certification.issuer}
                </span>
                <h3 className="font-heading font-black text-xl text-foreground mt-1 leading-tight">
                  {certification.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 -mt-1 -mr-2 cursor-pointer hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Details */}
            <div className="space-y-5 text-sm">
              <div className="flex gap-3 items-start">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {language === "EN" ? "Issued Date" : "Tanggal Terbit"}
                  </h4>
                  <p className="text-muted-foreground text-xs">{formatDate(certification.issuedAt)}</p>
                </div>
              </div>

              {certification.expirationAt && (
                <div className="flex gap-3 items-start">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {language === "EN" ? "Expiration Date" : "Tanggal Kedaluwarsa"}
                    </h4>
                    <p className="text-muted-foreground text-xs">{formatDate(certification.expirationAt)}</p>
                  </div>
                </div>
              )}

              {certification.credentialId && (
                <div className="flex gap-3 items-start">
                  <Bookmark className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">Credential ID</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-muted-foreground text-xs font-mono truncate select-all block bg-muted/60 py-0.5 px-1.5 rounded border border-border/40">
                        {certification.credentialId}
                      </span>
                      <button
                        onClick={handleCopyCredential}
                        className="text-primary hover:text-primary/80 transition-colors p-1 rounded hover:bg-muted/80 cursor-pointer"
                        title={language === "EN" ? "Copy ID" : "Salin ID"}
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {certification.skills && certification.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    {language === "EN" ? "Skills Earned" : "Keahlian"}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {certification.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] bg-primary/15 text-primary border border-primary/30 py-1 px-2.5 rounded-full font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-border/80 space-y-2.5">
            {certification.credentialUrl && (
              <Button className="w-full h-10 font-medium cursor-pointer" asChild>
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  {language === "EN" ? "Verify Credential" : "Verifikasi Kredensial"}
                </a>
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full h-10 font-medium cursor-pointer bg-transparent"
              asChild
            >
              <a
                href={certification.image}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center justify-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                {language === "EN" ? "Download Original (PDF)" : "Unduh Dokumen (PDF)"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
