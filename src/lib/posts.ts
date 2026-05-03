export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  preview: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hey Everyone!",
    date: "May 3, 2026",
    excerpt:
      "Welcome to my blog! This is my first post, this is  where I'll break down complex builds, share thoughts on digital power dynamics, and showcase projects that move the needle.",
    preview:
      "Welcome to my blog! This is my first post, this is  where I'll break down complex builds, share thoughts on digital power dynamics, and showcase projects that move the needle.",
    tags: ["intro", "personal"],
    featured: true,
    content: `Most people see a website as a collection of divs and scripts. I see a digital ecosystem — a space where logic dictates the flow, but creativity dictates the impact. As a developer, I'm not just interested in making things work; I'm interested in how code can be used to command attention and create authority.

My journey started with the fundamentals, but it quickly evolved into a fascination with how pieces fit together. Whether it's the clean structure of a backend API or the razor-sharp precision of Tailwind CSS, I've spent my time mastering the tools that allow for total control over the user experience.

This blog is a log of that evolution. If you're here for standard "Hello World" content, you're in the wrong place. We're here to build something more.`,
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
