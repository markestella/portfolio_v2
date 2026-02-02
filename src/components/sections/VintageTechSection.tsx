'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { techStack } from '@/data/techStack';

// Group tech stack by category
const techCategories = {
  'Languages': ['TypeScript', 'Javascript', 'Python', 'C#', 'C++', 'Java', 'PHP'],
  'Frontend': ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'HTML', 'ShadcnUI', 'Ionic', 'Flutter'],
  'Backend': ['.Net', 'FastAPI', 'Nodejs', 'Node.js'],
  'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Firebase'],
  'DevOps & Tools': ['Docker', 'Git', 'Github', 'Gitlab', 'Vercel', 'AWS', 'Azure'],
  'AI/ML': ['OpenAI', 'Mistral AI', 'Pytorch', 'Tensorflow'],
};

export default function VintageTechSection() {
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
        <div className="mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Technical Skills
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">techStack</span>{' '}
            <span className="syntax-bracket">=</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        {/* Tech Categories */}
        <div className="pl-4 sm:pl-8 space-y-8 mb-8">
          {Object.entries(techCategories).map(([category, techNames], categoryIndex) => {
            // Filter tech items that match the category
            const categoryTech = techStack.filter(tech => 
              techNames.some(name => 
                tech.name.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(tech.name.toLowerCase())
              )
            );

            if (categoryTech.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="font-mono text-sm mb-4">
                  <span className="syntax-property">{category.toLowerCase().replace(/[\/\s&]+/g, '_')}</span>
                  <span className="syntax-bracket">:</span>{' '}
                  <span className="syntax-bracket">[</span>
                </div>

                <div className="pl-4 sm:pl-6 flex flex-wrap gap-3">
                  {categoryTech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="vintage-card p-3 flex items-center gap-3 hover:border-[var(--gold-accent)] transition-all group"
                    >
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          fill
                          className="object-contain filter group-hover:brightness-110 transition-all"
                        />
                      </div>
                      <span className="text-sm text-[var(--parchment-200)] group-hover:text-[var(--gold-accent)] transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="font-mono text-sm mt-3">
                  <span className="syntax-bracket">]</span>
                  <span className="text-[var(--parchment-500)]">,</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All Tech (Scrollable) */}
        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} All {techStack.length}+ technologies
          </div>
          
          <div className="vintage-card p-6 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[var(--espresso-600)] rounded hover:bg-[var(--espresso-500)] transition-colors group"
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs text-[var(--parchment-300)] group-hover:text-[var(--parchment-100)]">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">{'}'}</span>
          <span className="text-[var(--parchment-500)]">;</span>
        </h2>
      </motion.div>
    </section>
  );
}
