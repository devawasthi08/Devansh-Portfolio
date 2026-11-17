export interface ExperienceItem {
  number: string;
  category: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  bullets: string[];
  tags: string[];
}

export interface ProjectItem {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  liveUrl?: string;
  screenshots: { key: string; alt: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
}

export interface EducationItem {
  title: string;
  subtitle: string;
}

export const PORTFOLIO_DATA = {
  name: "Devansh Awasthi",
  role: "AI-native engineer building full-stack products.",
  headline: "I’m Devansh, an AI-native engineer in Noida with 2 years of full-stack experience: enterprise CRM modules, REST APIs and data-driven dashboards. I pair AI coding agents with scoped, analyse-first prompts to find root causes, ship minimal fixes and verify results.",
  email: "devanshawasthi0502314@gmail.com",
  phone: "+91 94500 01405",
  linkedin: "https://linkedin.com/in/devansh-a-94179022a",
  github: "https://github.com/devawasthi13",
  githubAlt: "https://github.com/devawasthi08",
  resumePath: "/assets/Devansh_Awasthi_Resume.pdf",
  stats: [
    { value: "2 yrs", label: "Full-stack at NovoStack" },
    { value: "3", label: "Products on this ride" },
    { value: "8.18", label: "MCA CGPA, PSIT College, 2025" }
  ],
  stops: [
    { x: 1100, name: "NovoStack" },
    { x: 2000, name: "Zyng Parks" },
    { x: 2900, name: "Direct Credit" },
    { x: 3800, name: "IIT Kanpur Drone" },
    { x: 4700, name: "Skills" },
    { x: 5600, name: "How I ship" },
    { x: 6500, name: "Education" }
  ]
};
