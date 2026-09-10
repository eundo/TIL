import rss from "@astrojs/rss";
import { getStories } from "../../lib/content";
export async function GET() {
  return rss({
    title: "eundo.today Stories",
    description: "박은도의 개발 기록",
    site: "https://eundo.today",
    items: (await getStories()).map((story) => ({
      title: story.data.title,
      description: story.data.description,
      link: story.href,
      ...(story.data.date ? { pubDate: new Date(story.data.date) } : {}),
    })),
    customData: "<language>ko-kr</language>",
  });
}
