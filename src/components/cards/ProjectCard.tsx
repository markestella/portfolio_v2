'use client';

import { useState } from 'react';
import Image from 'next/image';
import TerminalWindow from '../ui/TerminalWindow';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <TerminalWindow 
        title={`projects/${project.id}/README.md`}
        className="card-hover h-full"
      >
        {/* Project Image */}
        <div className="relative h-48 -mx-5 -mt-5 mb-4 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent"></div>
          
          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-[var(--bg-secondary)]/90 text-[var(--terminal-cyan)] text-xs font-mono rounded border border-[var(--border-primary)]">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info as Code */}
        <div className="font-mono text-sm space-y-2">
          {/* Line numbers and code */}
          <div className="flex gap-4">
            <span className="text-[var(--text-muted)] select-none w-4">{index * 5 + 1}</span>
            <div>
              <span className="text-[var(--terminal-magenta)]">## </span>
              <span className="text-[var(--text-primary)] font-semibold">{project.title}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-[var(--text-muted)] select-none w-4">{index * 5 + 2}</span>
            <div>
              <span className="text-[var(--text-muted)]">📅 </span>
              <span className="text-[var(--terminal-yellow)]">{project.date}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-[var(--text-muted)] select-none w-4">{index * 5 + 3}</span>
            <p className="text-[var(--text-secondary)] text-xs line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex gap-4 pt-2">
            <span className="text-[var(--text-muted)] select-none w-4">{index * 5 + 4}</span>
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--terminal-green)] text-xs rounded border border-[var(--border-primary)]"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-0.5 text-[var(--text-muted)] text-xs">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-3 border-t border-[var(--border-primary)]">
            <span className="text-[var(--text-muted)] select-none w-4">{index * 5 + 5}</span>
            <div className="flex gap-4">
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[var(--terminal-blue)] hover:text-[var(--terminal-bright-blue)] transition-colors"
              >
                <span>💻</span>
                <span className="text-xs">source</span>
              </a>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[var(--terminal-cyan)] hover:text-[var(--terminal-bright-cyan)] transition-colors"
              >
                <span>🚀</span>
                <span className="text-xs">demo</span>
              </a>
              {project.video && (
                <a
                  href={`https://www.youtube.com/watch?v=${project.video}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[var(--terminal-red)] hover:text-[var(--terminal-bright-red)] transition-colors"
                >
                  <span>▶️</span>
                  <span className="text-xs">video</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
