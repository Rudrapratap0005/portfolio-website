export type ProjectCategory = 'all' | 'fullstack-mern' | 'systems-c' | 'ai-ml' | 'frontend-web';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectArchitecture {
  problem: string;
  solution: string;
  architectureDetails: string[];
  keyOutcomes: string[];
  systemDiagram?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'fullstack-mern' | 'systems-c' | 'ai-ml' | 'frontend-web';
  featured: boolean;
  year: string;
  summary: string;
  metrics: ProjectMetric[];
  technologies: string[];
  architecture: ProjectArchitecture;
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  images?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1 - 100
  yearsOfExp: string;
  highlight?: boolean;
}

export interface SkillGroup {
  id: string;
  category: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
  images?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeColor: string;
  credentialUrl?: string;
  image?: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  text: string;
  avatarText: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface CommandItem {
  id: string;
  title: string;
  category: 'navigation' | 'projects' | 'actions' | 'social';
  icon: string;
  action: () => void;
  shortcut?: string;
}
