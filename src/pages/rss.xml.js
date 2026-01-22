import rss from "@astrojs/rss";

export async function GET(context) {
  const posts = import.meta.glob("./*.md", { eager: true });

  const items = Object.entries(posts)
    .map(([path, post]) => {
      const slug = path.split("/").pop().replace(".md", "");
      return {
        title: post.frontmatter.title,
        pubDate: post.frontmatter.date,
        description: post.frontmatter.description,
        link: `/${slug}`,
      };
    })
    .filter((item) => item.link !== "/index");

  // Sort by date, newest first
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return rss({
    title: "Tide Field By Vinh",
    description:
      "A space to share my continuous journey of learning about fundamentals and software craft",
    site: context.site,
    items,
  });
}
