'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { techStack } from '@/data/techStack';

// Highlighted tech to show with icons
const highlightedTech = [
  'React', 'TypeScript', 'Next.js', 'Nodejs', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker'
];

// Other tech to show as text-only arrays
const secondaryStack = {
  'languages': ['Javascript', 'C#', 'C++', 'Java', 'PHP'],
  'frameworks': ['Vue', 'Express', '.Net', 'FastAPI', 'Ionic'],
  'tools': ['Git', 'AWS', 'Firebase', 'Vercel', 'Mistral AI', 'Figma']
};

export default function VintageTechSection() {
  // Get full objects for highlighted tech
  const highlightedItems = techStack.filter(item => 
    highlightedTech.some(h => h.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase().includes(h.toLowerCase()))
  );
  // Remove duplicates
  const uniqueHighlighted = Array.from(new Map(highlightedItems.map(item => [item.name, item])).values());

  return (
    <section className="section relative" id="tech">
      <div className="grid-pattern opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="mb-10">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Technical Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">stack</span>{' '}
            <span className="syntax-bracket">=</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        <div className="pl-4 sm:pl-8 space-y-8 mb-8">
          
          {/* Highlighted Stack (Icons) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-sm mb-4">
              <span className="syntax-property">core_technologies</span>
              <span className="syntax-bracket">:</span>{' '}
              <span className="syntax-bracket">[</span>
            </div>

            <div className="pl-4 sm:pl-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-3xl">
              {uniqueHighlighted.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded cursor-default hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-mono text-[var(--parchment-200)]">
                    &quot;{tech.name}&quot;
                  </span>
                  {index !== uniqueHighlighted.length - 1 && (
                    <span className="text-[var(--parchment-500)]">,</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="font-mono text-sm mt-3">
              <span className="syntax-bracket">]</span>
              <span className="text-[var(--parchment-500)]">,</span>
            </div>
          </motion.div>

          {/* Secondary Stack (Text Only Arrays) */}
          {Object.entries(secondaryStack).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
            >
              <div className="font-mono text-sm">
                <span className="syntax-property">{category}</span>
                <span className="syntax-bracket">:</span>{' '}
                <span className="syntax-bracket">[</span>
                <span className="text-[var(--syntax-string)] ml-2 leading-relaxed">
                  {items.map((item, i) => (
                    <span key={item} className="inline-block mr-2 hover:text-[var(--gold-accent)] transition-colors cursor-crosshair">
                      &quot;{item}&quot;{i !== items.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </span>
                <span className="syntax-bracket">]</span>
                <span className="text-[var(--parchment-500)]">{idx !== Object.keys(secondaryStack).length - 1 ? ',' : ''}</span>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl font-bold mt-8">
          <span className="syntax-bracket">{'}'}</span>
          <span className="text-[var(--parchment-500)]">;</span>
        </h2>
      </motion.div>
    </section>
  );
}
