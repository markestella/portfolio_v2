export interface Project {
  id: string;
  title: string;
  date: string;
  image: string;
  video: string;
  description: string;
  tech: string[];
  codeLink: string;
  demoLink: string;
  interactiveDemoLink?: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 'portfolio-v2',
    title: 'MckByte Portfolio',
    date: 'Jan 2026',
    image: '/project_images/portfolio.png',
    video: 'hrI_ernvKQk?si=izedhKHYtjqpCKo1',
    description: 'A modern terminal-themed portfolio built with Next.js, TypeScript, and Tailwind CSS. It showcases my projects, experience, certificates, tech stack, and contact workflow through a responsive developer-centric interface.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Nodemailer', 'HostHatch', 'linuxserver'],
    codeLink: 'https://github.com/markestella/portfolio_v2',
    demoLink: 'https://mckbyte.com/',
    interactiveDemoLink: 'https://mckbyte.com/terminal',
    category: 'Next.js'
  },
  {
    id: 'ai-chatbot',
    title: 'Full-Stack AI Chatbot',
    date: 'Aug 2025',
    image: '/project_images/ai_chat.png',
    video: 'lxtQqa40R0g?si=lL-jD7YWaONBbKrd',
    description: 'An AI-powered Slack chatbot built with Retrieval Augmented Generation, Microsoft Semantic Kernel, and PostgreSQL vector storage. The project automates Slack app provisioning and installation through an onboarding link, then answers team questions using only relevant uploaded documents.',
    tech: ['React', 'TypeScript', 'C# .NET', 'Docker', 'PostgreSQL', 'Vector DB', 'Microsoft Semantic Kernel', 'RAG', 'Tailwind CSS', 'ShadCN UI', 'Entity Framework Core', 'GitHub Actions', 'Azure', 'HostHatch', 'linuxserver'],
    codeLink: 'https://github.com/markestella/ai-chat-full-stack',
    demoLink: 'https://ai-chat.mckbyte.com/',
    category: 'Full Stack & AI'
  },
  {
    id: 'recipe-finder',
    title: 'Recipe Finder App',
    date: 'Aug 2025',
    image: '/project_images/recipe_finder.png',
    video: 'O_D65GGTZVg?si=hgYgPDM4wjEBiZBV',
    description: 'A modern recipe discovery app built with Next.js and Tailwind CSS. Search, view, and save your favorite recipes using TheMealDB API.',
    tech: ['Next.js', 'Tailwind CSS', 'TheMealDBApi', 'HostHatch', 'linuxserver'],
    codeLink: 'https://github.com/markestella/recipe-finder',
    demoLink: 'https://recipe-finder.mckbyte.com/',
    category: 'Next.js'
  },
  {
    id: 'moneyquest',
    title: 'MoneyQuest Budget Tracker',
    date: 'Oct 2025',
    image: '/project_images/moneyquest.png',
    video: '5n8ICwqwvaI?si=Sj3z0jGJD6w4CAqa',
    description: 'A gamified personal finance PWA built with Next.js for tracking income, expenses, accounts, savings goals, and budget progress through an interactive dashboard experience.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth', 'PostgreSQL', 'React Query', 'HostHatch', 'linuxserver'],
    codeLink: 'https://github.com/markestella/budget-tracker',
    demoLink: 'https://moneyquest.mckbyte.com/',
    category: 'Next.js'
  },
  {
    id: 'time-tracker',
    title: 'Mckbyte TimeTracker',
    date: 'Sep 2025',
    image: '/project_images/timetracker.png',
    video: 'rxLtBQ9k0ww?si=nXY93IyF2gMnWKSA',
    description: 'An employee time-tracking application built with Next.js, Prisma, NextAuth, and PostgreSQL for clocking work sessions, managing authenticated access, and maintaining persistent timesheet data.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth', 'PostgreSQL', 'Docker', 'HostHatch', 'linuxserver'],
    codeLink: 'https://github.com/markestella/time-tracker',
    demoLink: 'https://timetracker.mckbyte.com/',
    category: 'Next.js'
  },
];
