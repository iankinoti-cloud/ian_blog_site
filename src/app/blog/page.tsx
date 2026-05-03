import ArticleList from "@/components/ArticleList";
import { FadeUp, PageTransition } from "@/components/shared/Motion";
import { getAllPosts } from "@/lib/posts";

const allPosts = getAllPosts();

export default function BlogPage() {
  return (
    <PageTransition>
      <FadeUp>
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">Writing</p>
          <h1 className="mt-2 text-4xl font-bold text-[var(--brown-dark)]">Blog</h1>
          <div className="mt-4 h-px w-12 bg-[var(--tan)]" />
        </div>
      </FadeUp>
      <ArticleList posts={allPosts} />
    </PageTransition>
  );
}
