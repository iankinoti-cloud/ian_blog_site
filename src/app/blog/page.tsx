import { FadeUp, PageTransition } from "@/components/shared/Motion";
import BlogParallaxHero from "@/components/shared/BlogParallaxHero";
import { getAllPosts } from "@/lib/posts";

const allPosts = getAllPosts();

export default function BlogPage() {
  return (
    <PageTransition>
      <BlogParallaxHero posts={allPosts} />
    </PageTransition>
  );
}
