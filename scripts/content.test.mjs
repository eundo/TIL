import { test } from "node:test";
import assert from "node:assert/strict";
import { legacyMarkdown } from "../src/lib/legacy-markdown.mjs";

test("Docusaurus callouts and explicit fragment links survive the Markdown adapter", () => {
  const heading = {
    type: "heading",
    depth: 2,
    children: [{ type: "text", value: "프로젝트 기록 {#project-record}" }],
  };
  const callout = {
    type: "containerDirective",
    name: "info",
    children: [
      { type: "paragraph", children: [{ type: "text", value: "공개용 샘플" }] },
    ],
  };
  legacyMarkdown()({ type: "root", children: [heading, callout] });
  assert.equal(heading.data.hProperties.id, "project-record");
  assert.equal(heading.children[0].value, "프로젝트 기록");
  assert.equal(callout.data.hName, "aside");
  assert.equal(callout.children[0].children[0].value, "공개용 샘플");
});
test("code samples containing heading-like syntax are not rewritten", () => {
  const code = {
    type: "code",
    lang: "java",
    value: '// # Example {#not-a-heading}\nString text = ":::info";',
  };
  const snapshot = structuredClone(code);
  legacyMarkdown()({ type: "root", children: [code] });
  assert.deepEqual(code, snapshot);
});
