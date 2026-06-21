export interface Project {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  secondaryRepoUrl?: string;
  secondaryRepoLabel?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "jua-kali-konnect",
    title: "Jua Kali Konnect",
    blurb:
      "A marketplace connecting clients with skilled Kenyan artisans (fundis), with a simulated M-Pesa escrow payment flow.",
    description:
      "Clients search for a trade — plumbing, welding, tailoring — and hire a vetted fundi directly from a profile with ratings, a portfolio, and WhatsApp/call contact links. The standout piece is the escrow demo: funds are held, work is marked complete, and payment only releases once the client confirms satisfaction, mirroring how a real M-Pesa-based marketplace would protect both sides of the transaction.",
    stack: ["HTML", "CSS", "Vanilla JS", "localStorage"],
    liveUrl: "https://iankinoti-cloud.github.io/jua.kali_connect/",
    repoUrl: "https://github.com/iankinoti-cloud/jua.kali_connect",
    featured: true,
  },
  {
    slug: "medrecord",
    title: "MedRecord",
    blurb:
      "A full-stack hospital records system — FastAPI backend with role-based auth, paired with a React admin/patient/lab dashboard.",
    description:
      "The backend is a Dockerized FastAPI + PostgreSQL service handling patient records, staff accounts, and JWT-secured role-based access (Admin, Staff, Doctor). The frontend is a React/Vite app with dedicated modules for the admin panel, authentication, patient dashboards, and lab results — the kind of multi-role surface area a real clinic system needs.",
    stack: ["FastAPI", "PostgreSQL", "Docker", "React", "Vite"],
    repoUrl: "https://github.com/iankinoti-cloud/medrecord-backend",
    secondaryRepoUrl: "https://github.com/iankinoti-cloud/medrecord-frontend",
    secondaryRepoLabel: "Frontend repo",
    featured: true,
  },
  {
    slug: "nidus",
    title: "Nidus",
    blurb:
      "A sprint-based Kanban project management tool — simple enough to pick up in minutes, solid enough to run a real project on.",
    description:
      "Work is organized into time-boxed sprints with a four-column Kanban board (Backlog, In Progress, In Review, Done). Tasks carry an assignee, priority, and due date, accounts can sign in with GitHub or Google, and changes sync live with no refresh needed — built to sit in the gap between an overcomplicated tracker and a glorified to-do list.",
    stack: ["React", "Vite", "Supabase", "TanStack Query"],
    liveUrl: "https://nidus-eta.vercel.app",
    repoUrl: "https://github.com/iankinoti-cloud/nidus-task-management-application",
    featured: true,
  },
  {
    slug: "votepoll",
    title: "VotePoll",
    blurb:
      "A live polling app with animated, percentage-accurate results and one vote per session.",
    description:
      "Anyone can spin up a poll, add custom options, and vote once per session. Results animate in as live progress bars, votes persist across refreshes via localStorage, and the whole thing is fully responsive — a small app, but a complete one, down to the details like disabling option removal once voting has started.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://iankinoti-cloud.github.io/voting_poll_app/",
    repoUrl: "https://github.com/iankinoti-cloud/voting_poll_app",
  },
  {
    slug: "shopease",
    title: "ShopEase",
    blurb:
      "A product catalog with instant, no-reload category filtering.",
    description:
      "A focused state-management exercise: product cards render from a single source of truth, and filtering by category (or resetting to all) re-renders only what changes, with no page reloads or external state library required.",
    stack: ["React", "Vite", "CSS"],
    repoUrl: "https://github.com/iankinoti-cloud/shop-ease-catalog",
  },
  {
    slug: "project-management-cli",
    title: "Project Management CLI",
    blurb:
      "A Python command-line tool for managing users, projects, and tasks with persistent JSON storage.",
    description:
      "Built around Click, with users, projects, and tasks as first-class entities — tasks can be assigned to contributors and marked complete, all data persists safely to a configurable JSON file, and the test suite runs on pytest. A clean example of CLI tool design without a database dependency.",
    stack: ["Python", "Click", "pytest"],
    repoUrl: "https://github.com/iankinoti-cloud/python-project-management-cli-tool",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
