"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";

// Types
interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "ascii" | "json" | "system";
  content: string | React.ReactNode;
  timestamp: Date;
}

interface Command {
  name: string;
  description: string;
  handler: () => string | React.ReactNode;
}

// Terminal Context for state management
interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
}

// ASCII Art Logo
const ASCII_LOGO = `
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║   ███╗   ███╗ ██████╗██╗  ██╗██████╗ ██╗   ██╗████████╗███████╗   ║
    ║   ████╗ ████║██╔════╝██║ ██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝   ║
    ║   ██╔████╔██║██║     █████╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗     ║
    ║   ██║╚██╔╝██║██║     ██╔═██╗ ██╔══██╗  ╚██╔╝     ██║   ██╔══╝     ║
    ║   ██║ ╚═╝ ██║╚██████╗██║  ██╗██████╔╝   ██║      ██║   ███████╗   ║
    ║   ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝   ║
    ║                                                       ║
    ║              Developer · Craftsman · Problem Solver               ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
`;

const WELCOME_MESSAGE = `
Welcome to mckbyte.com — A terminal-style developer portfolio.
Type 'help' to see available commands, or click the chips below.
`;

// Command handlers
const createCommands = (): Record<string, Command> => ({
  help: {
    name: "help",
    description: "Display available commands",
    handler: () => (
      <div className="json-output">
        <div className="mb-3" style={{ color: "#d4a847" }}>
          {"{"} <span style={{ color: "#f5f0e6" }}>&quot;available_commands&quot;</span>: {"{"}
        </div>
        {[
          { cmd: "about", desc: "Learn about me and my journey" },
          { cmd: "skills", desc: "View my technical skillset" },
          { cmd: "projects", desc: "Browse my portfolio projects" },
          { cmd: "experience", desc: "View work experience" },
          { cmd: "contact", desc: "Get in touch" },
          { cmd: "resume", desc: "Download my resume" },
          { cmd: "clear", desc: "Clear the terminal" },
          { cmd: "theme", desc: "Toggle terminal aesthetics" },
        ].map((item, i) => (
          <div key={i} className="ml-6 mb-1">
            <span className="json-key">&quot;{item.cmd}&quot;</span>
            <span style={{ color: "#f5f0e6" }}>: </span>
            <span className="json-string">&quot;{item.desc}&quot;</span>
            {i < 7 && <span style={{ color: "#f5f0e6" }}>,</span>}
          </div>
        ))}
        <div style={{ color: "#d4a847" }}>
          {"  }"} {"}"}
        </div>
      </div>
    ),
  },

  about: {
    name: "about",
    description: "Learn about me",
    handler: () => (
      <div className="json-output space-y-4">
        <div>
          <span className="json-key">&quot;name&quot;</span>: <span className="json-string">&quot;mckbyte&quot;</span>,
        </div>
        <div>
          <span className="json-key">&quot;role&quot;</span>: <span className="json-string">&quot;Full-Stack Developer & Digital Craftsman&quot;</span>,
        </div>
        <div>
          <span className="json-key">&quot;philosophy&quot;</span>: <span className="json-string">&quot;Building elegant solutions to complex problems&quot;</span>,
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--bg-saddle)]">
          <p style={{ color: "#e8dfc9", lineHeight: "1.8" }}>
            I&apos;m a passionate developer who believes in the power of clean code and 
            thoughtful design. With years of experience across the full stack, I 
            specialize in creating performant web applications that don&apos;t just work—
            they delight.
          </p>
        </div>
        <div className="mt-4">
          <span className="json-key">&quot;interests&quot;</span>: [
          <span className="json-string">&quot;AI/ML Integration&quot;</span>, 
          <span className="json-string">&quot;System Design&quot;</span>, 
          <span className="json-string">&quot;Developer Experience&quot;</span>]
        </div>
      </div>
    ),
  },

  skills: {
    name: "skills",
    description: "View technical skills",
    handler: () => (
      <div className="space-y-4">
        <pre className="ascii-art" style={{ color: "#d4a847", fontSize: "0.65rem" }}>
{`╔════════════════════════════════════════════════════════════════╗
║                      TECHNICAL PROFICIENCIES                   ║
╠════════════════════════════════════════════════════════════════╣`}
        </pre>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          <SkillCategory 
            title="Frontend" 
            skills={["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]} 
          />
          <SkillCategory 
            title="Backend" 
            skills={["Node.js", "Python", ".NET/C#", "FastAPI"]} 
          />
          <SkillCategory 
            title="Database" 
            skills={["PostgreSQL", "MongoDB", "Redis", "Firebase"]} 
          />
          <SkillCategory 
            title="DevOps & Cloud" 
            skills={["AWS", "Docker", "CI/CD", "Vercel"]} 
          />
        </div>

        <pre className="ascii-art" style={{ color: "#d4a847", fontSize: "0.65rem" }}>
{`╚════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>
    ),
  },

  projects: {
    name: "projects",
    description: "Browse portfolio projects",
    handler: () => (
      <div className="space-y-6">
        <ProjectCard 
          title="AI-Powered Chatbot"
          description="Intelligent conversational interface with natural language processing"
          tech={["Next.js", "OpenAI", "TypeScript"]}
          link="#"
        />
        <ProjectCard 
          title="Portfolio API"
          description="RESTful backend service for portfolio management"
          tech={["FastAPI", "PostgreSQL", "Docker"]}
          link="#"
        />
        <ProjectCard 
          title="Recipe Finder"
          description="Smart recipe discovery with dietary filters"
          tech={["React", "Node.js", "MongoDB"]}
          link="#"
        />
        <div className="mt-4 pt-4 border-t border-[var(--bg-saddle)]">
          <span style={{ color: "#a89880" }}>
            Type <span style={{ color: "#d4a847" }}>&apos;project [name]&apos;</span> for detailed information
          </span>
        </div>
      </div>
    ),
  },

  experience: {
    name: "experience",
    description: "View work experience",
    handler: () => (
      <div className="space-y-6">
        <ExperienceCard 
          role="Senior Software Engineer"
          company="Tech Company"
          period="2022 - Present"
          highlights={[
            "Led development of microservices architecture",
            "Mentored junior developers",
            "Reduced API response time by 40%"
          ]}
        />
        <ExperienceCard 
          role="Full-Stack Developer"
          company="Startup Inc."
          period="2020 - 2022"
          highlights={[
            "Built customer-facing web applications",
            "Implemented CI/CD pipelines",
            "Integrated third-party APIs"
          ]}
        />
      </div>
    ),
  },

  contact: {
    name: "contact",
    description: "Get in touch",
    handler: () => (
      <div className="json-output">
        <div className="mb-3" style={{ color: "#d4a847" }}>
          {"{"} <span style={{ color: "#f5f0e6" }}>&quot;contact_methods&quot;</span>: {"{"}
        </div>
        <div className="ml-6 space-y-2">
          <div>
            <span className="json-key">&quot;email&quot;</span>: 
            <a href="mailto:hello@mckbyte.com" className="json-string ml-2 hover:underline">
              &quot;hello@mckbyte.com&quot;
            </a>
          </div>
          <div>
            <span className="json-key">&quot;github&quot;</span>: 
            <a href="https://github.com/mckbyte" target="_blank" rel="noopener noreferrer" className="json-string ml-2 hover:underline">
              &quot;github.com/mckbyte&quot;
            </a>
          </div>
          <div>
            <span className="json-key">&quot;linkedin&quot;</span>: 
            <a href="https://linkedin.com/in/mckbyte" target="_blank" rel="noopener noreferrer" className="json-string ml-2 hover:underline">
              &quot;linkedin.com/in/mckbyte&quot;
            </a>
          </div>
        </div>
        <div className="mt-3" style={{ color: "#d4a847" }}>
          {"  }"} {"}"}
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--bg-saddle)]">
          <p style={{ color: "#e8dfc9" }}>
            Always open to interesting projects and collaborations.
            Feel free to reach out!
          </p>
        </div>
      </div>
    ),
  },

  resume: {
    name: "resume",
    description: "Download resume",
    handler: () => (
      <div className="space-y-4">
        <p style={{ color: "#e8dfc9" }}>
          Preparing resume for download...
        </p>
        <a 
          href="/cv.pdf" 
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-leather)] border border-[var(--accent-amber)] rounded hover:bg-[var(--bg-walnut)] transition-colors"
          style={{ color: "#d4a847" }}
        >
          <DownloadIcon />
          Download Resume (PDF)
        </a>
      </div>
    ),
  },

  clear: {
    name: "clear",
    description: "Clear terminal",
    handler: () => "__CLEAR__",
  },

  theme: {
    name: "theme",
    description: "Toggle theme",
    handler: () => (
      <div style={{ color: "#7daf5f" }}>
        ✓ Theme preferences saved. The leather & earth aesthetic remains eternal.
      </div>
    ),
  },
});

// Helper Components
function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="p-3 bg-[rgba(45,33,23,0.5)] border-l-2 border-[var(--accent-amber)]">
      <h4 className="text-[var(--accent-amber)] mb-2 font-semibold">{title}</h4>
      <ul className="space-y-1">
        {skills.map((skill, i) => (
          <li key={i} style={{ color: "#e8dfc9" }}>
            <span style={{ color: "#7daf5f" }}>◦</span> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ 
  title, 
  description, 
  tech, 
  link 
}: { 
  title: string; 
  description: string; 
  tech: string[]; 
  link: string;
}) {
  return (
    <div className="p-4 bg-[rgba(45,33,23,0.5)] border border-[var(--bg-saddle)] rounded">
      <h4 className="text-[var(--accent-amber)] text-lg font-semibold">{title}</h4>
      <p className="text-[var(--text-parchment)] mt-2">{description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {tech.map((t, i) => (
          <span 
            key={i} 
            className="px-2 py-1 text-xs bg-[var(--bg-leather)] border border-[var(--bg-cognac)] rounded"
            style={{ color: "#d4c8b0" }}
          >
            {t}
          </span>
        ))}
      </div>
      <a 
        href={link} 
        className="inline-block mt-3 text-sm hover:underline"
        style={{ color: "#d4a847" }}
      >
        View Project →
      </a>
    </div>
  );
}

function ExperienceCard({ 
  role, 
  company, 
  period, 
  highlights 
}: { 
  role: string; 
  company: string; 
  period: string; 
  highlights: string[];
}) {
  return (
    <div className="p-4 bg-[rgba(45,33,23,0.5)] border-l-3 border-[var(--accent-amber)]">
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <h4 className="text-[var(--accent-amber)] text-lg font-semibold">{role}</h4>
          <p className="text-[var(--text-parchment)]">{company}</p>
        </div>
        <span className="text-[var(--text-faded)] text-sm">{period}</span>
      </div>
      <ul className="mt-3 space-y-1">
        {highlights.map((h, i) => (
          <li key={i} style={{ color: "#e8dfc9" }}>
            <span style={{ color: "#7daf5f" }}>•</span> {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// Main Terminal Component
export default function Terminal() {
  const commands = createCommands();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<TerminalState>({
    history: [
      {
        id: "welcome-ascii",
        type: "ascii",
        content: ASCII_LOGO,
        timestamp: new Date(),
      },
      {
        id: "welcome-msg",
        type: "system",
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ],
    currentInput: "",
    commandHistory: [],
    historyIndex: -1,
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.history]);

  // Focus input on click
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Process command
  const processCommand = useCallback((input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const command = commands[trimmedInput];

    // Add input to history
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: "input",
      content: input,
      timestamp: new Date(),
    };

    if (trimmedInput === "clear") {
      setState(prev => ({
        ...prev,
        history: [],
        currentInput: "",
        commandHistory: [...prev.commandHistory, trimmedInput],
        historyIndex: -1,
      }));
      return;
    }

    let outputLine: TerminalLine;

    if (command) {
      const result = command.handler();
      outputLine = {
        id: `output-${Date.now()}`,
        type: "output",
        content: result,
        timestamp: new Date(),
      };
    } else if (trimmedInput === "") {
      outputLine = {
        id: `empty-${Date.now()}`,
        type: "output",
        content: "",
        timestamp: new Date(),
      };
    } else {
      outputLine = {
        id: `error-${Date.now()}`,
        type: "error",
        content: `Command not found: "${input}". Type 'help' for available commands.`,
        timestamp: new Date(),
      };
    }

    setState(prev => ({
      ...prev,
      history: [...prev.history, inputLine, outputLine],
      currentInput: "",
      commandHistory: trimmedInput ? [...prev.commandHistory, trimmedInput] : prev.commandHistory,
      historyIndex: -1,
    }));
  }, [commands]);

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(state.currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setState(prev => {
        const newIndex = Math.min(prev.historyIndex + 1, prev.commandHistory.length - 1);
        const command = prev.commandHistory[prev.commandHistory.length - 1 - newIndex] || "";
        return { ...prev, historyIndex: newIndex, currentInput: command };
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setState(prev => {
        const newIndex = Math.max(prev.historyIndex - 1, -1);
        const command = newIndex >= 0 
          ? prev.commandHistory[prev.commandHistory.length - 1 - newIndex] 
          : "";
        return { ...prev, historyIndex: newIndex, currentInput: command };
      });
    }
  }, [state.currentInput, processCommand]);

  // Command chips
  const commandChips = ["about", "skills", "projects", "experience", "contact"];

  const easeOut: Easing = "easeOut";

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center leather-texture">
      <div className="w-full max-w-4xl">
        {/* Wooden Frame Wrapper */}
        <div className="wooden-frame">
          {/* Terminal Window */}
          <div className="terminal-window">
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
              </div>
              <div className="terminal-title">mckbyte.com — zsh</div>
              <div className="w-14" /> {/* Spacer for symmetry */}
            </div>

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="terminal-content overflow-y-auto max-h-[70vh] cursor-text"
              onClick={focusInput}
            >
              <AnimatePresence>
                {state.history.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="mb-2"
                  >
                    {line.type === "ascii" && (
                      <pre className="ascii-art overflow-x-auto">
                        {line.content as string}
                      </pre>
                    )}
                    
                    {line.type === "system" && (
                      <div style={{ color: "#d4c8b0", whiteSpace: "pre-line" }}>
                        {line.content as string}
                      </div>
                    )}

                    {line.type === "input" && (
                      <div className="flex items-center gap-2">
                        <span className="prompt">guest@mckbyte</span>
                        <span style={{ color: "#f5f0e6" }}>{line.content as string}</span>
                      </div>
                    )}

                    {line.type === "output" && (
                      <div className="ml-0 mt-2 mb-4">
                        {line.content}
                      </div>
                    )}

                    {line.type === "error" && (
                      <div style={{ color: "#c45a5a" }} className="ml-0">
                        {line.content as string}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Current Input Line */}
              <div className="flex items-center gap-2 mt-4">
                <span className="prompt">guest@mckbyte</span>
                <div className="flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={state.currentInput}
                    onChange={(e) => setState(prev => ({ ...prev, currentInput: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{ 
                      color: "#f5f0e6",
                      fontFamily: "'Merriweather', Georgia, serif",
                      fontSize: "1rem",
                      caretColor: "#d4a847",
                    }}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="cursor" />
                </div>
              </div>
            </div>

            {/* Command Chips */}
            <div className="p-4 border-t border-[var(--bg-saddle)] bg-[rgba(26,19,17,0.5)]">
              <div className="flex flex-wrap gap-2 justify-center">
                {commandChips.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => processCommand(cmd)}
                    className="command-chip"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p style={{ color: "#a89880", fontSize: "0.875rem" }}>
            © 2024 mckbyte. Crafted with care.
          </p>
        </div>
      </div>
    </div>
  );
}
