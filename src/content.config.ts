import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const screen = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});
const projects = defineCollection({
  loader: glob({ pattern: ["*.mdx", "!index.mdx"], base: "./docs/project" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    category: z.string(),
    visibility: z.enum(["Public", "Private"]),
    repository: z.string().regex(/^eundo\/[a-zA-Z0-9-]+$/),
    stage: z.string(),
    reviewed: z.coerce
      .date()
      .transform((date) => date.toISOString().slice(0, 10)),
    source: z.object({
      ref: z.string(),
      commit: z.string().regex(/^[a-f0-9]{40}$/),
    }),
    published: z.boolean().default(true),
    updated: z.coerce
      .date()
      .transform((date) => date.toISOString().slice(0, 10)),
    order: z.number(),
    featured: z.boolean().default(false),
    accent: z.string(),
    presentation: z.enum(["game", "pipeline", "mobile", "product", "journal"]),
    stack: z.array(z.string()),
    cover: screen.optional(),
    gallery: z
      .array(
        z.object({
          label: z.string(),
          caption: z.string(),
          mobile: screen.optional(),
          desktop: screen.optional(),
        }),
      )
      .default([]),
    demo: z.url().optional(),
  }),
});
const stories = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./blog/dev-story",
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.coerce
      .date()
      .transform((date) => date.toISOString().slice(0, 10))
      .optional(),
    tags: z.array(z.string()).default([]),
  }),
});
const notes = defineCollection({
  loader: glob({
    pattern: [
      "til/**/*.{md,mdx}",
      "book/**/*.{md,mdx}",
      "aboutMe/PARK EUNDO.mdx",
    ],
    base: "./docs",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});
export const collections = { projects, stories, notes };
