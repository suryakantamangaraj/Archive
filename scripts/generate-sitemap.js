const fs = require('fs');
const path = require('path');

// Read projects.js as a string to extract paths cleanly
const content = fs.readFileSync(path.join(process.cwd(), 'projects.js'), 'utf-8');

// Match all links dynamically from the projects database
const linksMatcher = /link:\s*"(https:\/\/archive\.suryaraj\.com\/[^"]+)"/g;

// Start with the root domain
const links = new Set(['https://archive.suryaraj.com/']);

let match;
while ((match = linksMatcher.exec(content)) !== null) {
    links.add(match[1]); // using Set.add instead of Array.push
}

const currentDate = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(links).map((link) => `  <url>
    <loc>${link}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${link === 'https://archive.suryaraj.com/' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${link === 'https://archive.suryaraj.com/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml successfully generated!');
