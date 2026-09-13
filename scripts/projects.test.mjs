import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { parse } from "yaml";

const directory = new URL("../docs/project/", import.meta.url);
const projects = [];
for (const file of await fs.readdir(directory)) {
  if (!file.endsWith(".mdx") || file === "index.mdx") continue;
  const text = await fs.readFile(new URL(file, directory), "utf8");
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  assert.ok(frontmatter, `${file}: missing frontmatter`);
  projects.push({ id: file.replace(/\.mdx$/, ""), ...parse(frontmatter[1]) });
}

test("the September repository review includes all eleven requested repositories once", () => {
  const expected = [
    "TIL",
    "anjeuljido",
    "discoverme",
    "eundo-content-studio",
    "lunch-networking-in-toss",
    "point-switch",
    "prompt-coach",
    "reread-bookshelf",
    "road-test-100",
    "shorts-pipeline",
    "shorts-source-radar",
  ]
    .map((name) => `eundo/${name}`)
    .sort();
  assert.deepEqual(
    projects.map((project) => project.repository).sort(),
    expected,
  );
  assert.equal(
    projects.find((project) => project.repository === "eundo/TIL").id,
    "portfolio-site",
  );
  assert.ok(projects.every((project) => project.published));
});

test("review date and implemented source date are separate and traceable", () => {
  for (const project of projects) {
    assert.match(project.source.commit, /^[a-f0-9]{40}$/);
    assert.ok(project.source.ref && project.stage, project.id);
    assert.match(project.updated, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(project.reviewed, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(project.updated <= project.reviewed, project.id);
  }
  assert.equal(
    projects.find((p) => p.id === "point-switch").updated,
    "2026-08-22",
  );
  assert.equal(
    projects.find((p) => p.id === "lunch-networking").source.ref,
    "agent/apps-in-toss-foundation",
  );
});

test("project priority is unique and featured work has actual screens", () => {
  assert.deepEqual(
    projects.map((p) => p.order).sort((a, b) => a - b),
    Array.from({ length: projects.length }, (_, i) => i + 1),
  );
  assert.deepEqual(
    projects
      .filter((p) => p.featured)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.id),
    [
      "reread-bookshelf",
      "shorts-pipeline",
      "eundo-content-studio",
      "road-test-100",
    ],
  );
  for (const project of projects) {
    assert.ok(project.cover?.src && project.gallery.length > 0, project.id);
    assert.equal(
      new Set(project.gallery.map((step) => step.label)).size,
      project.gallery.length,
    );
    assert.ok(
      project.gallery.every((step) => step.mobile),
      `${project.id}: mobile screen missing`,
    );
    if (project.id !== "shorts-pipeline") {
      assert.ok(
        project.gallery.every((step) => !step.desktop),
        `${project.id}: mobile-only policy`,
      );
    }
  }
  assert.equal(
    projects
      .find((p) => p.id === "shorts-pipeline")
      .gallery.filter((step) => step.desktop).length,
    7,
  );
});

test("screens exist and their declared dimensions match PNG metadata", async () => {
  for (const project of projects) {
    const screens = [
      project.cover,
      ...project.gallery.flatMap((step) => [step.mobile, step.desktop]),
    ].filter(Boolean);
    for (const screen of screens) {
      assert.ok(screen.src.startsWith("/img/projects/"));
      assert.ok(screen.alt.trim());
      const png = await fs.readFile(
        new URL(`../static${screen.src}`, import.meta.url),
      );
      assert.equal(png.subarray(1, 4).toString(), "PNG", screen.src);
      assert.equal(screen.width, png.readUInt32BE(16), `${screen.src}: width`);
      assert.equal(
        screen.height,
        png.readUInt32BE(20),
        `${screen.src}: height`,
      );
    }
  }
});
