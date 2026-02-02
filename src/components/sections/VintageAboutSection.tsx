'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], icon: '🎨', level: 92 },
  { category: 'Backend', items: ['.NET', 'FastAPI', 'Node.js', 'PostgreSQL'], icon: '⚙️', level: 88 },
  { category: 'DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'Vercel'], icon: '🚀', level: 70 },
  { category: 'AI/ML', items: ['Semantic Kernel', 'OpenAI', 'LangChain', 'Gemini'], icon: '🤖', level: 75 },
];

export default function VintageAboutSection() {
  return (
    <section className="section relative" id="about">
      <div className="grid-pattern opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Section Header - Code Style */}
        <div className="mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: About
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">class</span>{' '}
            <span className="syntax-type">About</span>{' '}
            <span className="syntax-keyword">extends</span>{' '}
            <span className="syntax-function">Developer</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        {/* Bio Section */}
        <div className="pl-4 sm:pl-8 mb-12 space-y-6">
          <div className="vintage-card p-6">
            <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
              {'//'} constructor()
            </div>
            <div className="space-y-4 text-[var(--parchment-200)] leading-relaxed">
              <p>
                I&apos;m a passionate <span className="syntax-keyword">Software Engineer</span> based in 
                Davao City, Philippines with over <span className="syntax-number">4</span> years of 
                experience in building web applications and integrating AI solutions.
              </p>
              <p>
                My journey in software development started during my college years studying{' '}
                <span className="syntax-string">Computer Engineering</span>, and I&apos;ve been 
                hooked ever since. I love solving complex problems and turning ideas into reality 
                through clean, efficient code.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="pl-4 sm:pl-8 mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} getSkills(): Skill[]
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="vintage-card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="font-bold text-[var(--parchment-100)]">{skill.category}</h3>
                  <span className="ml-auto font-mono text-sm text-[var(--gold-accent)]">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-[var(--espresso-600)] rounded-full mb-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-accent)] rounded-full"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs font-mono bg-[var(--espresso-600)] text-[var(--parchment-300)] rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} getExperience(): Experience[]
          </div>
          
          <div className="space-y-4">
            {experiences.slice(0, 3).map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="vintage-card p-5 border-l-4 border-l-[var(--gold-accent)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[var(--parchment-100)]">{exp.title}</h3>
                  <span className="font-mono text-xs text-[var(--parchment-500)]">{exp.date}</span>
                </div>
                <p className="text-sm text-[var(--gold-accent)] mb-2">{exp.company}</p>
                <p className="text-sm text-[var(--parchment-300)]">{exp.highlights[0]}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">{'}'}</span>
        </h2>
      </motion.div>
    </section>
  );
}
