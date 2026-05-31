"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpDown, Search, SlidersHorizontal, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/context/language-context";
import useCertifications from "@/hooks/use-certifications";
import { CertificationCard } from "@/components/certification-card";

type SortValue = "latest" | "oldest" | "name" | "issuer";

export default function AllCertificationsPage() {
  const { language } = useLanguage();
  const { certifications, loading, error } = useCertifications();
  const [search, setSearch] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [sort, setSort] = useState<SortValue>("latest");
  const [showFilters, setShowFilters] = useState(false);

  // Dynamically extract unique Issuers and Skills from data for filtering
  const { issuers, skills } = useMemo(() => {
    const uniqueIssuers = new Set<string>();
    const uniqueSkills = new Set<string>();

    certifications.forEach((cert) => {
      if (cert.issuer) uniqueIssuers.add(cert.issuer);
      if (cert.skills) {
        cert.skills.forEach((skill) => uniqueSkills.add(skill));
      }
    });

    return {
      issuers: ["all", ...Array.from(uniqueIssuers)],
      skills: ["all", ...Array.from(uniqueSkills).sort()],
    };
  }, [certifications]);

  // Filter and Sort Data
  const filteredAndSorted = useMemo(() => {
    let items = [...certifications];

    // Search filter
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      items = items.filter(
        (cert) =>
          cert.title.toLowerCase().includes(query) ||
          cert.issuer.toLowerCase().includes(query) ||
          cert.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          (cert.credentialId && cert.credentialId.toLowerCase().includes(query))
      );
    }

    // Issuer filter
    if (selectedIssuer !== "all") {
      items = items.filter((cert) => cert.issuer === selectedIssuer);
    }

    // Skill filter
    if (selectedSkill !== "all") {
      items = items.filter(
        (cert) => cert.skills && cert.skills.includes(selectedSkill)
      );
    }

    // Sort operations
    items.sort((a, b) => {
      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "issuer") {
        return a.issuer.localeCompare(b.issuer);
      }
      
      const timeA = new Date(a.issuedAt).getTime();
      const timeB = new Date(b.issuedAt).getTime();
      
      if (sort === "oldest") {
        return timeA - timeB;
      }
      // default: latest
      return timeB - timeA;
    });

    return items;
  }, [certifications, search, selectedIssuer, selectedSkill, sort]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-background relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-120 h-120 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-120 h-120 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 md:py-20 relative z-10">
          
          {/* Header Block */}
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Button variant="ghost" asChild className="mb-3 -ml-3 cursor-pointer">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === "EN" ? "Back to Home" : "Kembali ke Beranda"}
                </Link>
              </Button>
              <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground tracking-tight flex items-center gap-3">
                <Award className="h-10 w-10 text-primary" />
                {language === "EN" ? "All Certifications" : "Semua Sertifikasi"}
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                {language === "EN"
                  ? "Browse the list of verified credentials and skills earned from training, academic courses, and tech challenges."
                  : "Telusuri daftar kredensial dan keahlian terverifikasi yang didapatkan dari pelatihan, kursus akademik, dan tantangan teknologi."}
              </p>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground self-start md:self-end">
              <ArrowUpDown className="h-4 w-4 shrink-0" />
              <label htmlFor="cert-sort" className="sr-only">
                {language === "EN" ? "Sort certifications" : "Urutkan sertifikasi"}
              </label>
              <select
                id="cert-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="h-10 rounded-lg border border-border bg-card px-3 text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary/40 cursor-pointer"
              >
                <option value="latest">
                  {language === "EN" ? "Latest First" : "Terbaru"}
                </option>
                <option value="oldest">
                  {language === "EN" ? "Oldest First" : "Terlama"}
                </option>
                <option value="name">
                  {language === "EN" ? "Title (A-Z)" : "Judul (A-Z)"}
                </option>
                <option value="issuer">
                  {language === "EN" ? "Issuer Name" : "Nama Penerbit"}
                </option>
              </select>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-card/75 border border-border/80 rounded-2xl p-4 md:p-5 mb-8 shadow-xs backdrop-blur-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={
                    language === "EN"
                      ? "Search by title, issuer, skill..."
                      : "Cari berdasarkan judul, penerbit, keahlian..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Toggle Filters Button */}
              <Button
                variant="outline"
                className="h-11 px-4 cursor-pointer gap-2 shrink-0 border-border bg-background"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {language === "EN" ? "Filters" : "Filter"}
                {(selectedIssuer !== "all" || selectedSkill !== "all") && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </Button>
            </div>

            {/* Expandable filters panel */}
            {(showFilters || selectedIssuer !== "all" || selectedSkill !== "all") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/40 animate-in slide-in-from-top-3 duration-250">
                {/* Issuer select */}
                <div className="space-y-1.5">
                  <label htmlFor="issuer-filter" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === "EN" ? "Filter by Issuer" : "Filter Penerbit"}
                  </label>
                  <select
                    id="issuer-filter"
                    value={selectedIssuer}
                    onChange={(e) => setSelectedIssuer(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-foreground text-sm cursor-pointer"
                  >
                    {issuers.map((issuer) => (
                      <option key={issuer} value={issuer}>
                        {issuer === "all"
                          ? (language === "EN" ? "All Issuers" : "Semua Penerbit")
                          : issuer}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill select */}
                <div className="space-y-1.5">
                  <label htmlFor="skill-filter" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {language === "EN" ? "Filter by Skill" : "Filter Keahlian"}
                  </label>
                  <select
                    id="skill-filter"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-foreground text-sm cursor-pointer"
                  >
                    {skills.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill === "all"
                          ? (language === "EN" ? "All Skills" : "Semua Keahlian")
                          : skill}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Load Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`all-cert-skeleton-${i}`}
                  className="bg-card/40 border border-border/60 rounded-2xl p-5 h-72 flex flex-col justify-between animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-32 bg-muted/65 rounded-lg w-full" />
                    <div className="h-4 bg-muted/65 rounded w-3/4" />
                    <div className="h-3 bg-muted/65 rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 bg-muted/65 rounded flex-1" />
                    <div className="h-9 bg-muted/65 rounded flex-1" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load Error */}
          {error && <div className="text-center text-destructive py-10 font-medium">{error}</div>}

          {/* Empty Results View */}
          {!loading && !error && filteredAndSorted.length === 0 && (
            <div className="text-center text-muted-foreground py-16 bg-card/40 border border-border/65 border-dashed rounded-2xl">
              <Award className="h-12 w-12 text-muted-foreground/45 mx-auto mb-3" />
              <p className="text-base font-semibold">
                {language === "EN"
                  ? "No certifications found matching your filters."
                  : "Tidak ditemukan sertifikasi yang sesuai dengan filter Anda."}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedIssuer("all");
                  setSelectedSkill("all");
                }}
                className="mt-3 text-sm text-primary font-medium hover:underline focus:underline cursor-pointer"
              >
                {language === "EN" ? "Clear all filters" : "Reset semua filter"}
              </button>
            </div>
          )}

          {/* Certifications Grid */}
          {!loading && !error && filteredAndSorted.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {filteredAndSorted.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  animationDelay={index * 50}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
