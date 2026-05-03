import TagBadge from "@/components/shared/TagBadge";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { FadeUp, PageTransition } from "@/components/shared/Motion";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <PageTransition>
      <article className="max-w-2xl">
        <FadeUp>
          <Link
            href="/blog"
            className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)] hover:text-[var(--brown)] transition-colors"
          >
            ← All Posts
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold text-[var(--brown-dark)]">{post.title}</h1>
          <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">{post.date}</p>
          <div className="mt-4 h-px w-12 bg-[var(--tan)]" />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 whitespace-pre-line text-[var(--text-muted)] leading-relaxed">
            {post.content}
          </div>
        </FadeUp>
      </article>
    </PageTransition>
  );
}
