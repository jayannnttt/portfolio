export type ProjectStatus = 'completed' | 'in-progress' | 'upcoming';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  tagline: string;
  description: string[];
  technologies: string[];
  github?: string;
  live?: string;
  /** Promotional / hero banner — displayed on the project preview card */
  banner?: string;
  /** Real interface screenshots — displayed in the interface/screenshots section */
  screenshots?: string[];
}

import { fitflowScreenshots } from './fitflowScreenshots';

export const projects: Project[] = [
  {
    id: 'fitflow',
    name: 'FitFlow',
    status: 'completed',
    tagline: 'A fitness tracking application',
    description: [
      'FitFlow is a fitness tracking application designed to help users monitor and manage their workout routines.',
      'Focuses on session progression, set tracking, and intuitive routine logging for consistent training.',
    ],
    technologies: ['Python', 'HTML', 'CSS'],
    banner: '/projects/fitflow-banner.png',
    screenshots: fitflowScreenshots,
  },
  {
    id: 'ghosttraffic',
    name: 'GhostTraffic',
    status: 'in-progress',
    tagline: 'Traffic analysis tool',
    description: [
      'GhostTraffic is a traffic analysis tool currently in active development.',
      'Engineered for network flow inspection, packet telemetry examination, and anomaly identification.',
    ],
    technologies: ['Python', 'C'],
    banner: '/projects/ghosttraffic-banner.png',
    // screenshots: ['/screenshots/ghosttraffic-telemetry.png'],
  },
  {
    id: 'campus-query',
    name: 'Campus Query',
    status: 'upcoming',
    tagline: 'RAG-based campus chatbot',
    description: [
      'Campus Query will be a RAG-based chatbot designed to handle campus-related queries, providing students with quick and accurate answers.',
      'Exploratory retrieval-augmented architecture referencing academic schedules, institutional regulations, and student guidance.',
    ],
    technologies: ['Python'],
    // screenshots: ['/screenshots/campus-query-concept.png'],
  },
];

export const skills = ['HTML', 'CSS', 'Python', 'C', 'C++'] as const;

export interface Experience {
  id: string;
  organization: string;
  domain: string;
  period: string;
  duration: string;
  status: 'past';
}

export const experiences: Experience[] = [
  {
    id: 'synergy-club',
    organization: 'Synergy Club',
    domain: 'Developing Domain',
    period: 'September 2025 — May 2026',
    duration: '9 months',
    status: 'past',
  },
];

export const personalInfo = {
  name: 'S JAYANT',
  education: {
    institution: 'SRM Institute of Technology, Ramapuram, Chennai',
    degree: 'B.Tech CSE (AI/ML)',
    description: 'Currently pursuing B.Tech in Computer Science and Engineering with AI/ML.',
  },
};

export interface ProfessionalLinks {
  github: string;
  linkedin: string;
  email: string;
  emailPlaceholder: string; // for backward compatibility
  resume?: string;
}

export const professionalLinks: ProfessionalLinks = {
  github: 'https://github.com/jayannnttt',
  linkedin: 'https://www.linkedin.com/in/s-jayant-54a002380/',
  email: 'jayannnttt.s@gmail.com',
  emailPlaceholder: 'jayannnttt.s@gmail.com',
  resume: '/resume.html',
};
