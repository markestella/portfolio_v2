'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { getYouTubeEmbedUrl } from '@/lib/youtube';

export default function VintageProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section relative" id="projects">
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
            {'//'} Section: Projects
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">function</span>{' '}
            <span className="syntax-function">getProjects</span>
            <span className="syntax-bracket">()</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} Filter by category
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                  activeFilter === cat
                    ? 'bg-[var(--gold-accent)] text-[var(--espresso-900)]'
                    : 'bg-[var(--espresso-600)] text-[var(--parchment-300)] hover:bg-[var(--espresso-500)]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} return [{' '}
            <span className="text-[var(--syntax-number)]">{filteredProjects.length}</span> projects ]
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="vintage-card overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsVideoPlaying(false);
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso-800)] via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-mono bg-[var(--espresso-800)]/90 text-[var(--gold-accent)] rounded">
                        {project.category}
                      </span>
                    </div>

                    {project.video && (
                      <div className="absolute top-3 right-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-red-500/90 rounded text-white text-sm">
                          ▶
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-[var(--parchment-500)]">
                        {project.date}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[var(--parchment-100)] mb-2 group-hover:text-[var(--gold-accent)] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-[var(--parchment-400)] line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono bg-[var(--espresso-600)] text-[var(--parchment-300)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-0.5 text-xs font-mono text-[var(--parchment-500)]">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-3 border-t border-[var(--ide-tab-border)]">
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-sm text-[var(--parchment-300)] hover:text-[var(--gold-accent)] transition-colors"
                      >
                        <span>💻</span>
                        <span>Code</span>
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-sm text-[var(--parchment-300)] hover:text-[var(--gold-accent)] transition-colors"
                      >
                        <span>🚀</span>
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">{'}'}</span>
        </h2>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => {
              setSelectedProject(null);
              setIsVideoPlaying(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="vintage-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative aspect-video w-full bg-[var(--espresso-900)]">
                {selectedProject.video && isVideoPlaying ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedProject.video, true)}
                    title={`${selectedProject.title} video demo`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--espresso-800)] to-transparent" />

                {selectedProject.video && !isVideoPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 m-auto h-14 w-44 rounded bg-[var(--gold-accent)] text-[var(--espresso-900)] font-mono text-sm font-bold shadow-lg hover:brightness-110 transition"
                    aria-label={`Play video demo for ${selectedProject.title}`}
                  >
                    ▶ Play Video
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsVideoPlaying(false);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[var(--espresso-800)]/90 rounded text-[var(--parchment-300)] hover:text-[var(--parchment-100)]"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-[var(--gold-accent)] text-[var(--espresso-900)] rounded">
                    {selectedProject.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--parchment-500)]">
                    {selectedProject.date}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--parchment-100)] mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-[var(--parchment-300)] mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
                    {'//'} Technologies used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-mono bg-[var(--espresso-600)] text-[var(--parchment-200)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-vintage flex-1 text-center"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-vintage flex-1 text-center"
                  >
                    Live Demo
                  </a>
                  {selectedProject.interactiveDemoLink && (
                    <a
                      href={selectedProject.interactiveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-vintage flex-1 text-center"
                    >
                      Terminal Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
