import PostCard from "@/components/shared/PostCard";
import { FadeUp, StaggerContainer, StaggerItem, PageTransition } from "@/components/shared/Motion";
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
      <StaggerContainer className="flex flex-col gap-6">
        {allPosts.map((post) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageTransition>
  );
}
