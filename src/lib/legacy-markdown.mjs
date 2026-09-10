import { visit } from "unist-util-visit";
import { slug } from "github-slugger";

// Preserve existing callouts and explicit links in the migrated Markdown.
export function legacyMarkdown() {
  return (tree) => {
    const headingIndex = tree.children.findIndex(
      (node) => node.type === "heading" && node.depth === 1,
    );
    if (headingIndex !== -1) {
      const heading = tree.children[headingIndex];
      const title = heading.children.map((node) => node.value ?? "").join("");
      tree.children[headingIndex] = {
        type: "mdxJsxFlowElement",
        name: "span",
        attributes: [
          { type: "mdxJsxAttribute", name: "id", value: slug(title) },
        ],
        children: [],
      };
    }
    visit(tree, (node) => {
      if (node.type === "containerDirective") {
        node.data ??= {};
        node.data.hName = "aside";
        node.data.hProperties = {
          className: ["callout", `callout-${node.name}`],
        };
      }
      if (node.type === "heading") {
        const last = node.children.at(-1);
        const match =
          last?.type === "text" && last.value.match(/\s*\{#([^}]+)\}$/);
        if (match) {
          last.value = last.value.slice(0, match.index);
          node.data ??= {};
          node.data.hProperties = { id: match[1] };
        }
      }
      if (node.type === "image") {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          loading: "lazy",
          decoding: "async",
        };
      }
      if (
        (node.type === "mdxJsxFlowElement" ||
          node.type === "mdxJsxTextElement") &&
        node.name === "img"
      ) {
        for (const [name, value] of [
          ["loading", "lazy"],
          ["decoding", "async"],
        ]) {
          if (!node.attributes.some((attribute) => attribute.name === name)) {
            node.attributes.push({ type: "mdxJsxAttribute", name, value });
          }
        }
      }
    });
  };
}
