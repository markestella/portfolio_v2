export interface Experience {
  title: string;
  date: string;
  company: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Intermediate Software Engineer',
    date: '2024–Present',
    company: 'Netzon Global Technology Inc.',
    highlights: [
      'Built AI chatbot using Semantic Kernel + PostgreSQL vector DB',
      'Developed full-stack solutions with React, TypeScript, FastAPI, and Docker',
      'Trained in Amazon Connect & cloud contact center design',
    ],
  },
  {
    title: 'Junior Software Engineer',
    date: '2021–2024',
    company: 'Netzon Global Technology Inc.',
    highlights: [
      'Built Excel automation via VBA, backend with FastAPI',
      'Managed PostgreSQL and Alembic, deployed via Docker',
    ],
  },
  {
    title: 'Project Worker',
    date: '2021',
    company: 'Netzon Global Technology Inc.',
    highlights: [
      'Validated product URLs, QA coordination',
      'Trained in backend/VBA foundations',
    ],
  },
  {
    title: 'Virtual Assistant',
    date: '2020–2021',
    company: 'Outsourced Doers',
    highlights: [
      'Managed social media using Canva, CRM, and email communications',
    ],
  },
];
