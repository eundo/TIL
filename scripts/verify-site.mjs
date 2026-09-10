import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
const root = path.resolve("dist");
const failures = [];
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : [path.join(dir, entry.name)],
      ),
    )
  ).flat();
}
const normalize = (url) =>
  decodeURIComponent(url)
    .replace(/\/index\.html$/, "")
    .replace(/\/$/, "") || "/";
const files = await walk(root);
const assets = new Set(
  files.map((file) =>
    normalize("/" + path.relative(root, file).split(path.sep).join("/")),
  ),
);
const pages = new Map();
for (const file of files.filter(
  (file) =>
    file.endsWith(".html") && !file.includes(`${path.sep}admin${path.sep}`),
)) {
  const route = normalize(
    "/" + path.relative(root, file).split(path.sep).join("/"),
  );
  const $ = load(await fs.readFile(file, "utf8"));
  pages.set(route, {
    $,
    file,
    ids: new Set(
      $("[id]")
        .map((_, el) => $(el).attr("id"))
        .get(),
    ),
  });
  if ($("main").length !== 1 || $("main h1").length !== 1)
    failures.push(`${route}: expected one main and one h1`);
  if (!$("title").text() || !$('meta[name="description"]').attr("content"))
    failures.push(`${route}: missing page metadata`);
}
const redirects = new Map(
  (await fs.readFile("static/_redirects", "utf8"))
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => {
      const [from, to] = line.trim().split(/\s+/);
      return [normalize(from), to];
    }),
);
function resolve(route) {
  let result = route;
  const visited = new Set();
  while (redirects.has(result)) {
    if (visited.has(result)) {
      failures.push(`Redirect cycle: ${route}`);
      break;
    }
    visited.add(result);
    result = normalize(redirects.get(result));
  }
  return result;
}
for (const [route, { $ }] of pages) {
  $('a[href],img[src],link[rel="icon"],meta[property="og:image"]').each(
    (_, el) => {
      const element = $(el);
      const href =
        element.attr("href") ?? element.attr("src") ?? element.attr("content");
      if (!href || /^(mailto:|tel:|data:|javascript:)/.test(href)) return;
      const url = new URL(
        href,
        `https://eundo.today${route.endsWith(".html") ? route : route + "/"}`,
      );
      if (url.origin !== "https://eundo.today") return;
      const target = resolve(normalize(url.pathname));
      if (target.startsWith("/api/")) return;
      if (!pages.has(target) && !assets.has(target)) {
        failures.push(`${route}: missing ${href}`);
        return;
      }
      if (
        url.hash &&
        pages.has(target) &&
        !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))
      )
        failures.push(`${route}: missing anchor ${href}`);
    },
  );
}
for (const route of JSON.parse(
  await fs.readFile("scripts/legacy-routes.json", "utf8"),
)) {
  const target = resolve(normalize(route));
  if (!pages.has(target) && !assets.has(target))
    failures.push(`Legacy URL lost: ${route}`);
}
for (const [route, ids] of Object.entries(
  JSON.parse(await fs.readFile("scripts/legacy-anchors.json", "utf8")),
)) {
  const page = pages.get(resolve(normalize(route)));
  for (const id of ids) {
    if (!page?.ids.has(id))
      failures.push(`Legacy heading link lost: ${route}#${id}`);
  }
}
const projectRoutes = [...pages.keys()].filter((route) =>
  route.startsWith("/docs/project/"),
);
for (const listing of ["/", "/docs/project"]) {
  const $ = pages.get(listing)?.$;
  for (const route of projectRoutes) {
    if (!$ || !$(`a[href="${route}"]`).length)
      failures.push(`${listing}: project missing from navigation: ${route}`);
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${pages.size} pages, ${projectRoutes.length} projects, all internal links/assets/anchors and ${JSON.parse(await fs.readFile("scripts/legacy-routes.json", "utf8")).length} legacy routes.`,
  );
