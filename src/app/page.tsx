import PostCard from "@/components/shared/PostCard";
import Button from "@/components/shared/Button";
import { FadeUp, StaggerContainer, StaggerItem, PageTransition } from "@/components/shared/Motion";
import { getFeaturedPosts } from "@/lib/posts";
import IanCreativeBanner from "@/components/shared/IanCreativeBanner";
import ProjectMarquee from "@/components/shared/ProjectMarquee";

const featuredPosts = getFeaturedPosts();

export default function HomePage() {
  return (
    <PageTransition>
      {/* Hero — IAN Creative Banner */}
      <section className="mb-14 md:mb-24">
        <IanCreativeBanner />
        <FadeUp delay={0.2}>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button href="/projects">View Projects</Button>
            <Button href="/blog" variant="secondary">Read the Blog</Button>
            <Button href="/about" variant="secondary">About Me</Button>
          </div>
        </FadeUp>
      </section>

      {/* Projects marquee — full bleed, two rows */}
      <ProjectMarquee />

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
        <section
          className="rounded-2xl backdrop-blur-xl backdrop-saturate-150 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(201,168,124,0.12) 100%), rgba(237,227,211,0.72)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow:
              "0 8px 40px rgba(107,66,38,0.12), 0 2px 8px rgba(107,66,38,0.06), inset 0 1px 1px rgba(255,255,255,0.88)",
            padding: "clamp(36px, 6vw, 56px) clamp(20px, 4vw, 40px)",
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
                "linear-gradient(to right, transparent, rgba(255,255,255,0.92), transparent)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brown-muted)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            My Mission
          </p>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 6vw, 62px)",
              letterSpacing: "-0.01em",
              color: "var(--brown-dark)",
              lineHeight: 0.92,
              marginTop: 12,
            }}
          >
            Code is my medium.<br />Impact is my output.
          </h2>

          <p
            style={{
              margin: "20px auto 0",
              maxWidth: 480,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              fontSize: "clamp(14px, 1.5vw, 16px)",
            }}
          >
            I want to channel my skills and creativity into software that solves
            real problems and inspires others. It&rsquo;s not just about writing code;
            it&rsquo;s about building systems that are deliberately crafted. Every project
            is an opportunity to turn technical precision into something that
            genuinely moves people forward.
          </p>

          <div style={{ marginTop: 28 }}>
            <Button href="/blog">Start Reading</Button>
          </div>
        </section>
      </FadeUp>
    </PageTransition>
  );
}
