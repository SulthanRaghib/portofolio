/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://portofolio-raghib.netlify.app",
  sitemapSize: 5000,
  generateRobotsTxt: true,
  generateIndexSitemap: false, // ⬅️ ini bikin hanya sitemap.xml tanpa index
  exclude: ["/sitemap.xml", "/robots.txt"], // ⬅️ jangan masuk ke sitemap
};
