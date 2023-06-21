function generateSiteMap(pages) {
  const baseURL = "https://www.wada-sanzo-colors.com";
  const pageURLs = pages.map((page) => `${baseURL}/colors${page}`);

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- home-page URL -->
     <url>
       <loc>${baseURL}</loc>
     </url>
     <!-- about-page URL -->
     <url>
       <loc>${baseURL}/about</loc>
     </url>
     <!-- color detail pages -->
     ${pageURLs
       .map((url) => {
         return `
       <url>
           <loc>${url}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  try {
    const request = await fetch("https://www.wada-sanzo-colors.com/api/colors");
    const data = await request.json();

    const pages = data?.map((color) => `/${color.slug}`);
    const sitemap = generateSiteMap(pages);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    return { notFound: true };
  }
}

export default SiteMap;
