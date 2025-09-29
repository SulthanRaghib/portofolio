import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://portofolio-raghib.netlify.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/404", "/500"], // jangan index halaman error
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
