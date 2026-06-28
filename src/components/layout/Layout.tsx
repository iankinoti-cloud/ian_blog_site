import Header from "@/components/Header";
import Footer from "./Footer";
import FooterParallaxStrip from "@/components/shared/FooterParallaxStrip";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--cream)]">
      <Header name="Ian Kinoti" navLinks={NAV_LINKS} />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 py-10 pt-24 sm:py-16 sm:pt-28">
        {children}
      </div>
      <FooterParallaxStrip />
      <Footer />
    </div>
  );
}
