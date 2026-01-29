'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Certificate } from '@/data/certificates';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Terminal header */}
      <div className="bg-[var(--bg-tertiary)] px-4 py-2 border-b border-[var(--border-primary)] flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green)]"></span>
        </div>
        <span className="text-[var(--text-muted)] text-xs font-mono ml-2">
          cert_{String(index + 1).padStart(2, '0')}.png
        </span>
      </div>

      {/* Certificate Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay with details */}
        <div 
          className={`absolute inset-0 bg-[var(--bg-primary)]/90 flex flex-col justify-center p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="font-mono text-sm space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-[var(--terminal-magenta)]">$</span>
              <span className="text-[var(--text-secondary)]">cat certificate.json</span>
            </div>
            
            <div className="pl-4 space-y-1 text-xs">
              <div>
                <span className="text-[var(--terminal-cyan)]">&quot;title&quot;</span>
                <span className="text-[var(--text-secondary)]">: </span>
                <span className="text-[var(--terminal-green)]">&quot;{certificate.title}&quot;</span>
              </div>
              <div>
                <span className="text-[var(--terminal-cyan)]">&quot;issuer&quot;</span>
                <span className="text-[var(--text-secondary)]">: </span>
                <span className="text-[var(--terminal-green)]">&quot;{certificate.issuer}&quot;</span>
              </div>
              <div>
                <span className="text-[var(--terminal-cyan)]">&quot;year&quot;</span>
                <span className="text-[var(--text-secondary)]">: </span>
                <span className="text-[var(--terminal-yellow)]">{certificate.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4 border-t border-[var(--border-primary)]">
        <h3 className="font-mono text-sm text-[var(--text-primary)] line-clamp-1 mb-1">
          {certificate.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted)] text-xs">{certificate.issuer}</span>
          <span className="text-[var(--terminal-yellow)] text-xs font-mono">{certificate.date}</span>
        </div>
      </div>
    </div>
  );
}
