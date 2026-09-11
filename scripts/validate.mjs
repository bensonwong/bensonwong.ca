import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dir, "..");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

for (const name of ["index.html", "404.html"]) {
  const html = await Bun.file(resolve(root, name)).text();
  check((html.match(/<h1\b/g) || []).length === 1, `${name}: expected one h1`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  check(new Set(ids).size === ids.length, `${name}: duplicate element IDs`);
  for (const [, link] of html.matchAll(/\b(?:href|src|poster|data-src)="([^"]+)"/g)) {
    if (link.startsWith("#")) check(ids.includes(link.slice(1)), `${name}: missing anchor ${link}`);
    if (link.startsWith("/") && !link.startsWith("//")) {
      const pathname = link.split(/[?#]/)[0];
      const file = pathname === "/" ? "index.html" : pathname.slice(1);
      check(await Bun.file(resolve(root, file)).exists(), `${name}: missing local file ${link}`);
    }
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { failures.push(`${name}: invalid structured data`); }
  }
}

const syntax = spawnSync(process.execPath, ["build", "portfolio.js", "--target=browser", "--outdir=scratch/validation"], { cwd: root, encoding: "utf8" });
check(syntax.status === 0, `JavaScript check failed: ${syntax.stderr}`);
const privacy = spawnSync("git", ["check-ignore", "scratch/resume.pdf", "screenshots/check.png"], { cwd: root, encoding: "utf8" });
check(privacy.status === 0 && privacy.stdout.split("\n").filter(Boolean).length === 2, "Private working artifacts must be ignored");
const whitespace = spawnSync("git", ["diff", "--check"], { cwd: root, encoding: "utf8" });
check(whitespace.status === 0, whitespace.stdout || whitespace.stderr);
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("Passed: local files and links, headings and IDs, structured data, browser JavaScript, ignored private artifacts, and diff whitespace.");
