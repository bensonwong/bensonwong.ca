import { resolve, sep } from "node:path";

const root = resolve(import.meta.dir, "..");
const publicFiles = new Set(["index.html", "404.html", "styles.css", "portfolio.js", "favicon.svg", "apple-touch-icon.png", "og-image.png", "robots.txt", "sitemap.xml"]);
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: Number(process.env.PORT || 4178),
  async fetch(request) {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url).pathname).replace(/^\/+/, "") || "index.html"; }
    catch { return new Response("Bad request", { status: 400 }); }
    const filePath = resolve(root, pathname);
    const isAsset = /^assets\/(work|fonts)\/[^/]+\.(mp4|webp|woff2)$/.test(pathname);
    if (!filePath.startsWith(root + sep) || (!publicFiles.has(pathname) && !isAsset)) {
      return new Response(Bun.file(resolve(root, "404.html")), { status: 404 });
    }
    const file = Bun.file(filePath);
    if (!(await file.exists())) return new Response("Not found", { status: 404 });
    return new Response(file, { headers: { "Cache-Control": "no-store" } });
  }
});
console.log(`Portfolio preview: ${server.url}`);
