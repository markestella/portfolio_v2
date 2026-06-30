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
  category: string;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio (HTML, CSS, JavaScript)',
    date: 'July 2025',
    image: '/project_images/Portfolio_Frontend.png',
    video: 'RqHt5NTBnbk?si=c0JNRKC1F9G-ZB4q',
    description: 'An interactive and responsive personal portfolio built with HTML, CSS, and JavaScript, hosted on GitHub Pages. It showcases my technical skills, projects, and professional experience in software engineering, AI chatbot development, backend automation, and modern UI design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    codeLink: 'https://github.com/markestella/portfolio',
    demoLink: 'https://markestella.github.io/portfolio',
    category: 'Frontend'
  },
  {
    id: 'contact-api',
    title: 'Portfolio Contact API',
    date: 'July 2025',
    image: '/project_images/Portfolio_Contact_API.png',
    video: '',
    description: 'A lightweight .NET 9 API that powers the contact form on my portfolio, sending messages via SendGrid for real-time email notifications.',
    tech: ['C#', '.Net', 'SendGrid', 'Github Actions', 'Render'],
    codeLink: 'https://github.com/markestella/portfolio-contact-api',
    demoLink: 'https://markestella.github.io/portfolio/#contact',
    category: 'Backend'
  },
  {
    id: 'ai-chatbot',
    title: 'Full-Stack AI Chatbot',
    date: 'Aug 2025',
    image: '/project_images/AI_Chatbot_Image.png',
    video: 'lxtQqa40R0g?si=lL-jD7YWaONBbKrd',
    description: 'An AI-powered Slack chatbot built with Retrieval Augmented Generation, Microsoft Semantic Kernel, and PostgreSQL vector storage. The project automates Slack app provisioning and installation through an onboarding link, then answers team questions using only relevant uploaded documents.',
    tech: ['React', 'TypeScript', 'C# .NET', 'Docker', 'PostgreSQL', 'Vector DB', 'Microsoft Semantic Kernel', 'RAG', 'Tailwind CSS', 'ShadCN UI', 'Entity Framework Core', 'GitHub Actions', 'Azure'],
    codeLink: 'https://github.com/markestella/ai-chat-full-stack',
    demoLink: 'https://full-stack-ai-demo.vercel.app/',
    category: 'Full Stack & AI'
  },
  {
    id: 'recipe-finder',
    title: 'Recipe Finder App',
    date: 'Aug 2025',
    image: '/project_images/Recipe_Finder.png',
    video: 'O_D65GGTZVg?si=hgYgPDM4wjEBiZBV',
    description: 'A modern recipe discovery app built with Next.js and Tailwind CSS. Search, view, and save your favorite recipes using TheMealDB API.',
    tech: ['Next.js', 'Tailwind CSS', 'TheMealDBApi', 'Vercel'],
    codeLink: 'https://github.com/markestella/recipe-finder',
    demoLink: 'https://recipe-finder-demo-chi.vercel.app/',
    category: 'Next.js'
  },
];
