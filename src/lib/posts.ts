export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  preview: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hey Everyone!",
    date: "May 3, 2026",
    excerpt:
      "Welcome to my blog! This is my first post, this is  where I'll break down complex builds, share thoughts on digital power dynamics, and showcase projects that move the needle.",
    preview:
      "Welcome to my blog! This is my first post, this is  where I'll break down complex builds, share thoughts on digital power dynamics, and showcase projects that move the needle.",
    tags: ["intro", "personal"],
    featured: true,
    content: `Most people see a website as a collection of divs and scripts. I see a digital ecosystem — a space where logic dictates the flow, but creativity dictates the impact. As a developer, I'm not just interested in making things work; I'm interested in how code can be used to command attention and create authority.

My journey started with the fundamentals, but it quickly evolved into a fascination with how pieces fit together. Whether it's the clean structure of a backend API or the razor-sharp precision of Tailwind CSS, I've spent my time mastering the tools that allow for total control over the user experience.

This blog is a log of that evolution. If you're here for standard "Hello World" content, you're in the wrong place. We're here to build something more.`,
  },
  {
    slug: "designing-trust-jua-kali-konnect",
    title: "Designing Trust Into a Marketplace",
    date: "June 21, 2026",
    excerpt:
      "Jua Kali Konnect connects clients with skilled Kenyan artisans. The hard part wasn't the listings — it was making strangers trust each other with money.",
    preview:
      "Jua Kali Konnect connects clients with skilled Kenyan artisans. The hard part wasn't the listings — it was making strangers trust each other with money.",
    tags: ["case-study", "product"],
    featured: true,
    content: `Any marketplace can list a profile, a price, and a rating. That part is easy — it's a database table with a search bar in front of it. The part that actually decides whether two strangers do business is the part nobody puts on the homepage: what happens to the money in the gap between "I agree to hire you" and "I'm satisfied with the work."

That gap is where Jua Kali Konnect's escrow flow lives. A client hires a fundi, the payment is held rather than released, the fundi marks the job complete, and only the client's confirmation moves the money. Three states, three buttons, and one principle behind all of it: neither side should have to be the one who blinks first. The fundi isn't working on a promise, and the client isn't paying on one either.

I built it as a simulation rather than a real M-Pesa integration on purpose — the goal wasn't to stand up a payments processor, it was to prove the interaction model before anyone has to trust it with real shillings. Get the state machine right first. The integration is the easy part once the trust model is already correct.`,
  },
  {
    slug: "why-another-pm-tool-nidus",
    title: "Why I Built Another Project Management Tool",
    date: "May 19, 2026",
    excerpt:
      "The world doesn't need another Jira. Nidus exists because most teams I've seen don't need Jira's power — they need a board that gets out of the way.",
    preview:
      "The world doesn't need another Jira. Nidus exists because most teams I've seen don't need Jira's power — they need a board that gets out of the way.",
    tags: ["case-study", "product"],
    content: `Every team I've worked with that adopted a "serious" project management tool eventually started managing the tool instead of the project. Custom fields nobody fills in, workflows nobody follows, a board that needs onboarding before anyone can use it. So Nidus starts from a narrower question: what's the smallest tool that can still run a real sprint?

The answer turned out to be four things — a sprint with a goal and a date range, a Kanban board with exactly four columns, a task with an owner and a priority, and an account you can get into in one click via GitHub or Google instead of a signup form. Nothing configurable, because configurability is just complexity wearing a settings icon.

The name is Latin for "nest." That's deliberate — the bet behind Nidus is that a project doesn't need more structure than a nest needs branches. Just enough to hold the work together, simple enough that you stop noticing the tool and start noticing the work.`,
  },
  {
    slug: "role-based-access-medrecord",
    title: "The Boring Part That Breaks Everything",
    date: "June 19, 2026",
    excerpt:
      "MedRecord is a hospital records system. Patient data and dashboards are the visible work — role-based access control is the part that actually has to be correct.",
    preview:
      "MedRecord is a hospital records system. Patient data and dashboards are the visible work — role-based access control is the part that actually has to be correct.",
    tags: ["case-study", "engineering"],
    content: `Nobody asks to see your auth layer in a demo. They want to see the patient dashboard, the lab results view, the admin panel — the parts with visible UI. But in a hospital records system, the part doing the actual work is the part you can't see: the JWT middleware deciding, on every single request, whether this exact user is allowed to touch this exact record.

MedRecord splits access three ways — Admin, Staff, and Doctor — and the backend, not the frontend, is the source of truth for what each role can do. That sounds obvious until you've seen a system that hides a button in the UI and calls that "security," while the API behind it will happily serve the same data to anyone who knows the endpoint. FastAPI's dependency injection made it straightforward to enforce role checks at the route level instead, so the frontend's job is just to present the right surface, not to police it.

It's the least glamorous code in the whole project, and it's also the only code where a bug doesn't mean a broken button — it means the wrong person reading a patient's chart. That asymmetry is why it got written first, tested hardest, and touched least often after that.`,
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
