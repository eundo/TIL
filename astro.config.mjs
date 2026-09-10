import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";
import { unified } from "@astrojs/markdown-remark";
import { legacyMarkdown } from "./src/lib/legacy-markdown.mjs";

export default defineConfig({
  site: "https://eundo.today",
  publicDir: "./static",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [
    react(),
    mdx(),
    sitemap({ filter: (url) => !url.includes("/404") }),
  ],
  markdown: {
    processor: unified({ remarkPlugins: [remarkDirective, legacyMarkdown] }),
    shikiConfig: { theme: "github-light" },
  },
  vite: { build: { assetsInlineLimit: 0 } },
});
