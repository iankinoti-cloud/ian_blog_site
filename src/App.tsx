import Header from "@/components/Header";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import { posts } from "@/lib/posts";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const TECH_STACK = [
  { category: "Frontend", items: "React.js · Three.js · Tailwind CSS" },
  { category: "Backend", items: "Robust APIs · Scalable Database Management" },
  { category: "Environment", items: "Command-line first development" },
];

export default function App() {
  return (
    <div>
      <Header name="Ian Kinoti" navLinks={NAV_LINKS} />
      <About
        name="Ian Kinoti"
        image="/profile.jpg"
        about="My journey started with the fundamentals, but it quickly evolved into a fascination with how pieces fit together. Whether it's the clean structure of a backend API or the precision of Tailwind CSS, I've spent my time mastering the tools that allow for total control over the user experience."
        techStack={TECH_STACK}
      />
      <ArticleList posts={posts} />
    </div>
  );
}
