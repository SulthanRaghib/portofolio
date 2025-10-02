import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/context/language-context";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sulthan Raghib Fillah - Web Developer",
  description:
    "Personal portfolio showcasing my projects and skills as a web developer & backend engineer",
  generator: "Next.js",
  verification: {
    google: "ZF6_KqDelVfAZgmp52UnLopGxJnq8oagSXUFB3uHeNE", // Google Search Console
  },
  keywords: [
    "Web Developer",
    "Backend Engineer",
    "Portfolio",
    "Sulthan Raghib",
  ],
  authors: [
    {
      name: "Sulthan Raghib Fillah",
      url: "https://portofolio-raghib.netlify.app",
    },
  ],
  alternates: {
    canonical: "https://portofolio-raghib.netlify.app",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sulthan Raghib Fillah - Web Developer",
    description:
      "Personal portfolio showcasing my projects and skills as a web developer & backend engineer",
    url: "https://portofolio-raghib.netlify.app",
    siteName: "Sulthan Raghib Portfolio",
    images: [
      {
        url: "https://portofolio-raghib.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sulthan Raghib Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sulthan Raghib Fillah - Web Developer",
    description:
      "Personal portfolio showcasing my projects and skills as a web developer & backend engineer",
    images: ["https://portofolio-raghib.netlify.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sulthan Raghib Fillah",
              url: "https://portofolio-raghib.netlify.app",
              jobTitle: "Web Developer & Backend Engineer",
              sameAs: [
                "https://github.com/SulthanRaghib",
                "https://www.linkedin.com/in/sulthan-raghib-fillah/",
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
