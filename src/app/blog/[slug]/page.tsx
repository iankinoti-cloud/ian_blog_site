import TagBadge from "@/components/shared/TagBadge";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { FadeUp, PageTransition } from "@/components/shared/Motion";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const GLASS = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 50%, rgba(201,168,124,0.08) 100%), rgba(237,227,211,0.52)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow:
    "0 4px 24px rgba(107,66,38,0.08), 0 1px 4px rgba(107,66,38,0.04), inset 0 1px 1px rgba(255,255,255,0.78)",
} as const;

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
      <ScrollProgress />
      <article className="max-w-2xl">
        <FadeUp>
          <Link
            href="/blog"
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "var(--brown-muted)",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "color 0.2s",
            }}
          >
            ← All Posts
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 7vw, 72px)",
              letterSpacing: "-0.01em",
              color: "var(--brown-dark)",
              lineHeight: 0.9,
              marginTop: 16,
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brown-muted)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {post.date}
          </p>
          <div className="mt-4 h-px w-12 bg-[var(--tan)]" />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className="rounded-2xl backdrop-blur-sm backdrop-saturate-150"
            style={{
              ...GLASS,
              marginTop: 36,
              padding: "clamp(24px, 4vw, 40px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: "8%",
                right: "8%",
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.88), transparent)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                whiteSpace: "pre-line",
                color: "var(--text-muted)",
                lineHeight: 1.85,
                fontSize: "clamp(15px, 1.7vw, 17px)",
              }}
            >
              {post.content}
            </div>
          </div>
        </FadeUp>
      </article>
    </PageTransition>
  );
}
