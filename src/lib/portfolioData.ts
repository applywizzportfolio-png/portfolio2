import data from '../../data.json';

// Mapping new JSON structure to existing code expectations
interface ExtraSection {
  section_title: string;
  items: Array<{
    label: string;
    description: string;
    url: string;
    date: string;
  }>;
}

const findExtra = (title: string) => (data as any).extras?.find((e: ExtraSection) => e.section_title === title);

// Profile mapping
export const profile = {
  ...(data as any).personal,
  src: (data as any).personal?.avatar,
  internshipAvatar: (data as any).personal?.avatar, // Compatibility with InternshipCard.tsx
  description: (data as any).personal?.bio,
  fallbackSrc: (data as any).personal?.avatar,
  tags: (data as any).personal?.tags || ["AI", "Developer", "42 Paris", "Sport", "SaaS Builder"]
};

// Socials mapping
const socialsSection = findExtra("Socials");
export const socials = socialsSection ? socialsSection.items.map((i: any) => ({ name: i.label, url: i.url })) : [];

// Questions mapping
const questionsSection = findExtra("Interests & Questions");
export const questions = questionsSection ? Object.fromEntries(questionsSection.items.map((i: any) => [i.label, i.description])) : {};

// Resume mapping
const resumeSection = findExtra("Resume Info");
export const resume = {
  title: resumeSection?.items[0]?.label || "Resume",
  description: resumeSection?.items[0]?.description || "Full Stack Developer • AI Specialist",
  downloadUrl: resumeSection?.items[0]?.url || "/resume_giraud.pdf",
  fileType: "PDF",
  lastUpdated: resumeSection?.items[0]?.date || "Mar 2025",
  fileSize: "Unknown",
  previewImage: (data as any).personal?.avatar
};

// Skills mapping
export const skills = data.skills.map((s: any) => ({
  ...s,
  skills: s.items || [] // Compatibility with skills.tsx
}));

// Internship mapping
export const internship = (data as any).experience?.[0] || {
  title: (data as any).personal?.title || "AI Engineer",
  duration: "2024 - Present",
  location: (data as any).personal?.location || "Paris, France",
  techStack: ["Python", "Next.js", "LLMs", "AI Agents"],
  experience: (data as any).personal?.bio || "Working on LLMs and AI Agents.",
  goal: "Build innovative AI solutions.",
  logo: (data as any).personal?.avatar,
  images: []
};

// Sports mapping
const sportsSection = findExtra("Sports Highlights");
export const sports = sportsSection ? sportsSection.items.map((i: any) => ({
  title: i.label,
  description: i.description,
  image: i.url,
  date: i.date
})) : [];

// Projects mapping
export const projects = data.projects.map((p: any) => ({
  title: p.name,
  description: p.description,
  techStack: p.tech_stack,
  category: "Project",
  src: (data as any).personal?.avatar,
  image: (data as any).personal?.avatar,
  images: [{ src: (data as any).personal?.avatar, alt: p.name }],
  links: [
    { name: "Website", url: p.url },
    { name: "GitHub", url: p.github_url }
  ].filter((l: any) => l.url),
  date: p.date
}));



// Branding mapping
export const branding = {
  welcomeTitle: "Welcome to AI Portfolio",
  welcomeSectionWhat: "What's this?",
  welcomeSectionWhy: "Why AI?",
  welcomeTextWhat: "I'm excited to present my brand new AI Portfolio.",
  welcomeTextWhy: "Traditional portfolios can be limiting. My portfolio becomes exactly what you're interested in!"
};

