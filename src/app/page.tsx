import PostCard from "@/components/shared/PostCard";
import Button from "@/components/shared/Button";
import { FadeUp, StaggerContainer, StaggerItem, PageTransition } from "@/components/shared/Motion";
import { getFeaturedPosts } from "@/lib/posts";
import AnimatedName from "@/components/shared/AnimatedName";

const featuredPosts = getFeaturedPosts();

export default function HomePage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="mb-14 md:mb-24 text-center">
        <FadeUp delay={0}>
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">
            Developer · Writer · Builder
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="flex justify-center" style={{ lineHeight: 1.1 }}>
            <AnimatedName size="hero" />
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--tan)]" />
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-[var(--text-muted)] leading-relaxed">
            &ldquo;Most people see a website as a collection of divs and scripts.
            I see a digital ecosystem, a space where logic dictates the flow,
            but creativity dictates the impact.&rdquo;
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button href="/projects">View Projects</Button>
            <Button href="/blog" variant="secondary">Read the Blog</Button>
            <Button href="/about" variant="secondary">About Me</Button>
          </div>
        </FadeUp>
      </section>

      {/* Featured Posts */}
      <section className="mb-14 md:mb-24">
        <FadeUp>
          <h2 className="mb-8 text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">
            Featured Posts
          </h2>
        </FadeUp>
        <StaggerContainer className="flex flex-col gap-6">
          {featuredPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <FadeUp>
        <section className="rounded-2xl border border-[var(--tan-light)] bg-[var(--parchment)] px-5 py-10 sm:px-10 sm:py-14 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">My Mission</p>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[var(--brown-dark)] leading-snug">
            Code is my medium. Impact is my output.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[var(--text-muted)] leading-relaxed">
            I want to channel my skills and creativity into software that solves real problems and inspires others. It&rsquo;s not just about writing code; it&rsquo;s about
            building systems that are not just functional, but deliberately crafted.
            Every project is an opportunity to turn technical precision into something
            that genuinely moves people forward.
          </p>
          <div className="mt-8">
            <Button href="/blog">Start Reading</Button>
          </div>
        </section>
      </FadeUp>
    </PageTransition>
  );
}
