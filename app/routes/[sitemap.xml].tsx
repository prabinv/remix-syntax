import type { Episode } from "./syntax/$episode";

const siteUrl = 'http://192.168.86.42:3000';

export async function loader() {
  const response = await fetch('https://syntax.fm/api/shows');
  const episodes: Episode[] = await response.json();
  const episodeUrls = episodes.map((episode: Episode) => (`
  <url>
    <loc>${siteUrl}/syntax/${episode.displayNumber}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
`)).join('\n');
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url>
        <loc>${siteUrl}/</loc>
        <priority>1.0</priority>
        <changefreq>daily</changefreq>
      </url>
      <url>
        <loc>${siteUrl}/syntax/</loc>
        <priority>1.0</priority>
        <changefreq>daily</changefreq>
      </url>
      <url>
        <loc>${siteUrl}/contact/</loc>
        <priority>1.0</priority>
        <changefreq>daily</changefreq>
      </url>
      ${episodeUrls}
    </urlset>
    `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    }
  });
}
