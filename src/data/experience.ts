export interface Experience {
  title: string;
  date: string;
  company: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Intermediate Software Engineer',
    date: 'Apr 2024 - Present',
    company: 'Netzon Global Technology Inc.',
    highlights: [
      'Developed full-stack web and mobile applications using React, Next.js, TypeScript, Ionic, FastAPI, and .NET technologies.',
      'Built AI-powered chatbot solutions using RAG, Microsoft Semantic Kernel, and PostgreSQL vector databases, including Slack integration and automated provisioning.',
      'Designed responsive user interfaces using Tailwind CSS and ShadCN UI.',
      'Provisioned and managed cloud infrastructure using Terraform, Microsoft Azure, and AWS services.',
      'Implemented CI/CD pipelines and cloud deployment workflows to support scalable and reliable application delivery.',
    ],
  },
  {
    title: 'Junior Software Engineer',
    date: 'Oct 2021 - Apr 2024',
    company: 'Netzon Global Technology Inc.',
    highlights: [
      'Created automation tools with VBA for Excel-based data workflows.',
      'Developed Python APIs with FastAPI and PostgreSQL.',
      'Managed Dockerized services and schema migration using Alembic.',
      'Collaborated with frontend and QA teams for integration and support.',
    ],
  },
  {
    title: 'General Virtual Assistant',
    date: 'Nov 2020 - Jan 2021',
    company: 'Outsourced Doers',
    highlights: [
      'Created branded content using Canva for social media.',
      'Managed content calendars and email appointment scheduling.',
      'Maintained CRM records and client communications.',
    ],
  },
  {
    title: 'Drive Test Engineer/Analyst',
    date: 'May 2020 - Aug 2020',
    company: 'Comit Telecom PH',
    highlights: [
      'Evaluated tower performance and reported coverage gaps as a Drive Test Analyst.',
      'Documented signal strength reports for network analysts as a Drive Test Engineer.',
    ],
  },
];
