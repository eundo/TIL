import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">["data"] & {
  id: string;
  href: string;
};
export type Screen = NonNullable<Project["cover"]>;
export type GalleryStep = Project["gallery"][number];

export async function getProjects(): Promise<Project[]> {
  return (await getCollection("projects", ({ data }) => data.published))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({ ...data, id, href: `/docs/project/${id}/` }));
}
export async function getStories() {
  return (await getCollection("stories", ({ data }) => data.published))
    .sort((a, b) => (b.data.date ?? "").localeCompare(a.data.date ?? ""))
    .map((entry) => ({
      ...entry,
      href: `/blog/dev-story/${encodeURIComponent(entry.id)}/`,
    }));
}
export const aboutHref = "/docs/aboutMe/PARK%20EUNDO/";
export const noteHref = (id: string) =>
  `/docs/${id === "book/index" ? "book" : id.split("/").map(encodeURIComponent).join("/")}/`;
