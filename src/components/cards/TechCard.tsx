'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TechItem } from '@/data/techStack';

interface TechCardProps {
  tech: TechItem;
  index: number;
}

export default function TechCard({ tech, index }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        bg-[var(--bg-secondary)] border rounded-lg p-4
        flex flex-col items-center gap-3
        transition-all duration-300
        ${isHovered 
          ? 'border-[var(--terminal-green)] shadow-[0_0_20px_rgba(63,185,80,0.2)]' 
          : 'border-[var(--border-primary)]'
        }
      `}>
        {/* Tech Icon */}
        <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={tech.icon}
            alt={tech.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Tech Name */}
        <span className={`
          font-mono text-xs text-center transition-colors duration-300
          ${isHovered ? 'text-[var(--terminal-green)]' : 'text-[var(--text-secondary)]'}
        `}>
          {tech.name}
        </span>

        {/* Index badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-full flex items-center justify-center">
          <span className="text-[var(--text-muted)] text-[10px] font-mono">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded text-xs font-mono text-[var(--terminal-cyan)] whitespace-nowrap z-10">
          import {`{ ${tech.name.replace(/\s/g, '')} }`}
        </div>
      )}
    </div>
  );
}
