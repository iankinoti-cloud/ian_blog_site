import Header from "@/components/Header";
import Footer from "./Footer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--cream)]">
      <Header name="Ian Kinoti" navLinks={NAV_LINKS} />
      <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}
