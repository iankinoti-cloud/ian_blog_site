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
        bio="My journey started with the fundamentals, but it quickly evolved into a fascination with how pieces fit together. Whether it's the clean structure of a Ruby on Rails backend or the precision of Tailwind CSS, I've spent my time mastering the tools that allow for total control over the user experience."
        philosophy="I believe great development is 50% architecture and 50% psychology. To build a platform like a professional marketplace or an elegant educational interface, you have to understand user behavior and how to guide a user's eye, how to ensure security, and how to make a digital interaction feel as solid as a physical one."
        techStack={techStack}
      />
    </PageTransition>
  );
}
