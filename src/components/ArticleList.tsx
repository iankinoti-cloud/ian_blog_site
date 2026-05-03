import type { Post } from "@/lib/posts";
import Article from "@/components/Article";

export interface ArticleListProps {
  posts: Post[];
}

export default function ArticleList({ posts }: ArticleListProps) {
  return (
    <main className="flex flex-col gap-6">
      {posts.map((post) => (
        <Article
          key={post.slug}
          title={post.title}
          date={post.date}
          preview={post.preview}
          slug={post.slug}
          tags={post.tags}
        />
      ))}
    </main>
  );
}
