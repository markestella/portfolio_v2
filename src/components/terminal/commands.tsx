import { ReactNode } from "react";

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  handler: (args?: string[]) => string | ReactNode;
}

export interface CommandRegistry {
  [key: string]: CommandDefinition;
}

// Color utilities for consistent styling
export const colors = {
  amber: "#d4a847",
  golden: "#e6b84d",
  honey: "#c9952c",
  cream: "#f5f0e6",
  parchment: "#e8dfc9",
  antique: "#d4c8b0",
  sepia: "#c4b79a",
  faded: "#a89880",
  success: "#7daf5f",
  error: "#c45a5a",
  info: "#7da4c7",
};

// CSS class utilities
export const styles = {
  jsonOutput: "json-output",
  jsonKey: "json-key", 
  jsonString: "json-string",
  jsonNumber: "json-number",
  asciiArt: "ascii-art",
  commandChip: "command-chip",
};

// Helper to create styled JSON key-value pairs
export function jsonPair(key: string, value: string, isString = true): ReactNode {
  return (
    <div>
      <span style={{ color: colors.amber }}>&quot;{key}&quot;</span>
      <span style={{ color: colors.cream }}>: </span>
      {isString ? (
        <span style={{ color: colors.success }}>&quot;{value}&quot;</span>
      ) : (
        <span style={{ color: colors.info }}>{value}</span>
      )}
    </div>
  );
}

// Helper to create section dividers
export function sectionDivider(char = "═", length = 60): string {
  return char.repeat(length);
}

// ASCII box drawing helpers
export const box = {
  topLeft: "╔",
  topRight: "╗",
  bottomLeft: "╚",
  bottomRight: "╝",
  horizontal: "═",
  vertical: "║",
  tLeft: "╠",
  tRight: "╣",
  tTop: "╦",
  tBottom: "╩",
  cross: "╬",
};

// Create a simple ASCII table
export function createAsciiTable(
  headers: string[],
  rows: string[][],
  colWidths: number[]
): string {
  const topBorder = box.topLeft + 
    colWidths.map(w => box.horizontal.repeat(w + 2)).join(box.tTop) + 
    box.topRight;
  
  const headerSeparator = box.tLeft + 
    colWidths.map(w => box.horizontal.repeat(w + 2)).join(box.cross) + 
    box.tRight;
  
  const bottomBorder = box.bottomLeft + 
    colWidths.map(w => box.horizontal.repeat(w + 2)).join(box.tBottom) + 
    box.bottomRight;

  const formatRow = (cells: string[]) => 
    box.vertical + 
    cells.map((cell, i) => ` ${cell.padEnd(colWidths[i])} `).join(box.vertical) + 
    box.vertical;

  return [
    topBorder,
    formatRow(headers),
    headerSeparator,
    ...rows.map(formatRow),
    bottomBorder,
  ].join("\n");
}

// Sample data that can be customized
export const portfolioData = {
  name: "mckbyte",
  role: "Full-Stack Developer & Digital Craftsman",
  
  skills: {
    frontend: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
    backend: ["Node.js", "Python", ".NET/C#", "FastAPI", "Express"],
    database: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "SQLite"],
    devops: ["AWS", "Docker", "CI/CD", "Vercel", "GitHub Actions"],
    tools: ["Git", "VS Code", "Figma", "Postman", "Linux"],
  },

  projects: [
    {
      id: "ai-chatbot",
      title: "AI-Powered Chatbot",
      description: "Intelligent conversational interface with natural language processing capabilities",
      tech: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
      status: "completed",
      link: "#",
    },
    {
      id: "portfolio-api",
      title: "Portfolio API",
      description: "RESTful backend service for portfolio management and contact handling",
      tech: ["FastAPI", "PostgreSQL", "Docker", "AWS"],
      status: "completed",
      link: "#",
    },
    {
      id: "recipe-finder",
      title: "Recipe Finder",
      description: "Smart recipe discovery application with dietary filters and meal planning",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      status: "completed",
      link: "#",
    },
  ],

  experience: [
    {
      role: "Senior Software Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      highlights: [
        "Led development of microservices architecture",
        "Mentored junior developers and conducted code reviews",
        "Reduced API response time by 40% through optimization",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Startup Inc.",
      period: "2020 - 2022",
      highlights: [
        "Built customer-facing web applications from scratch",
        "Implemented CI/CD pipelines using GitHub Actions",
        "Integrated third-party APIs for payment and analytics",
      ],
    },
  ],

  contact: {
    email: "hello@mckbyte.com",
    github: "github.com/mckbyte",
    linkedin: "linkedin.com/in/mckbyte",
    website: "mckbyte.com",
  },

  certifications: [
    "AWS Solutions Architect",
    "Microsoft Azure Fundamentals",
    "Google Cloud Professional",
  ],
};

// Fun easter egg commands
export const easterEggs: Record<string, string | ReactNode> = {
  "sudo": "Nice try, but you don't have admin access here. 😉",
  "vim": "You're already in a better interface. No :q needed here!",
  "exit": "There is no escape... but you can close the browser tab.",
  "rm -rf": "Whoa there! Let's not get destructive.",
  "hello": "Hello, friend! Welcome to mckbyte.com 👋",
  "matrix": "Unfortunately, I can only show you the leather-bound reality.",
  "coffee": "☕ Brewing... Here's your virtual espresso!",
  "42": "You've found the answer to life, the universe, and everything!",
};
