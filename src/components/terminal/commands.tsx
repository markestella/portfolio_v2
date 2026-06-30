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
  role: "Software Engineer",
  
  skills: {
    frontend: ["React", "Next.js", "Ionic React", "Tailwind CSS", "ShadCN UI", "HTML", "CSS"],
    backend: ["FastAPI", ".NET Core", "ExpressJS", "VBA", "Google Apps Script"],
    database: ["PostgreSQL", "PgAdmin 4", "Vector DB", "Entity Framework Core", "Alembic Migrations"],
    ai: ["Microsoft Semantic Kernel", "RAG", "OpenAI", "Mistral", "Assembly AI"],
    devops: ["Docker", "Git", "GitHub Actions", "Terraform", "Azure", "AWS"],
    tools: ["Canva", "CapCut", "Filmora", "Adobe Photoshop", "NEMO Drive Test", "Arduino"],
  },

  projects: [
    {
      id: "ai-chatbot",
      title: "AI-Powered Slack Chatbot",
      description: "RAG chatbot with automated Slack app provisioning and document-grounded answers",
      tech: ["Microsoft Semantic Kernel", "PostgreSQL Vector DB", "Slack", "RAG"],
      status: "completed",
      link: "#",
    },
    {
      id: "portfolio-api",
      title: "Portfolio API",
      description: "RESTful backend service for portfolio management and contact handling",
      tech: [".NET", "SendGrid", "GitHub Actions", "Render"],
      status: "completed",
      link: "#",
    },
    {
      id: "recipe-finder",
      title: "Recipe Finder",
      description: "Smart recipe discovery application with dietary filters and meal planning",
      tech: ["Next.js", "Tailwind CSS", "TheMealDB API", "Vercel"],
      status: "completed",
      link: "#",
    },
  ],

  experience: [
    {
      role: "Intermediate Software Engineer",
      company: "Netzon Global Technology Inc.",
      period: "Apr 2024 - Present",
      highlights: [
        "Developed full-stack web and mobile applications with React, Next.js, TypeScript, Ionic, FastAPI, and .NET",
        "Built RAG chatbot solutions using Microsoft Semantic Kernel and PostgreSQL vector databases",
        "Provisioned cloud infrastructure using Terraform, Azure, and AWS services",
      ],
    },
    {
      role: "Junior Software Engineer",
      company: "Netzon Global Technology Inc.",
      period: "Oct 2021 - Apr 2024",
      highlights: [
        "Created VBA automation tools for Excel-based data workflows",
        "Developed Python APIs with FastAPI and PostgreSQL",
        "Managed Dockerized services and Alembic migrations",
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
