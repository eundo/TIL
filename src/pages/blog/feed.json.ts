import { getStories } from "../../lib/content";
export async function GET() {
  return Response.json({
    version: "https://jsonfeed.org/version/1.1",
    title: "eundo.today Stories",
    home_page_url: "https://eundo.today/blog/dev-story",
    feed_url: "https://eundo.today/blog/feed.json",
    language: "ko",
    items: (await getStories()).map((story) => ({
      id: `https://eundo.today${story.href}`,
      url: `https://eundo.today${story.href}`,
      title: story.data.title,
      content_text: story.data.description,
      tags: story.data.tags,
    })),
  });
}
