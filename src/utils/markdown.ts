import matter from "gray-matter";

// Load all MDX files (Vite)
const posts = import.meta.glob("../markdown/Blog/*.mdx", {
  eager: true,
  as: "raw",
});

type PostItem = {
  slug?: string;
  content?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

export function getPostSlugs(): string[] {
  return Object.keys(posts).map((path) =>
    path.split("/").pop()?.replace(".mdx", "") ?? ""
  );
}

export function getPostBySlug(
  slug: string,
  fields: string[] = []
): PostItem | null {
  const filePath = `../markdown/Blog/${slug}.mdx`;
  const fileContent = posts[filePath];

  if (!fileContent) return null;

  const { data, content } = matter(fileContent);

  const items: PostItem = {};

  const processImages = (text: string): string =>
    text.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');

  fields.forEach((field) => {
    if (field === "slug") items.slug = slug;
    if (field === "content") items.content = processImages(content);
    if (field === "metadata") items.metadata = data as Record<string, unknown>;
    if (data[field] !== undefined) items[field] = data[field];
  });

  return items;
}

export function getAllPosts(fields: string[] = []): PostItem[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post): post is PostItem => post !== null)
    .sort(
      (a, b) =>
        new Date(String(b.date)).getTime() -
        new Date(String(a.date)).getTime()
    );
}
