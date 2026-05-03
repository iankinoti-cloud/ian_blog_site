import { PageTransition } from "@/components/shared/Motion";
import About from "@/components/About";

const techStack = [
  { category: "Frontend", items: "React.js · Three.js · Tailwind CSS" },
  { category: "Backend", items: "Robust APIs · Scalable Database Management" },
  { category: "Environment", items: "Command-line first development" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <About
        name="Ian Kinoti"
        image="/profile.jpg"
        about="My journey started with the fundamentals, but it quickly evolved into a fascination with how pieces fit together. Whether it's the clean structure of a backend API or the precision of Tailwind CSS, I've spent my time mastering the tools that allow for total control over the user experience. I believe great development is 50% architecture and 50% psychology — to build something elegant, you have to understand user behavior and how to guide a user's eye."
        techStack={techStack}
      />
    </PageTransition>
  );
}
