export const loader = () => {return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
<url>
  <loc>/</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>/cars</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>/dashboard</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.1</priority>
</url>
<url>
  <loc>/impressum_datenschutz</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>/fleets</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>/contact</loc>
  <lastmod>2023-02-07T15:08:51.737Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>
</urlset>  
`, { status: 200, headers: {
  "Content-Type": "application/xml",
  "xml-version": "1.0",
  "encoding": "UTF-8"
} })
};