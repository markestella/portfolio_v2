'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { projects, Project } from '@/data/projects';
import { getYouTubeEmbedUrl } from '@/lib/youtube';

const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  'Frontend': { bg: 'rgba(34, 211, 238, 0.15)', text: 'var(--accent-cyan)', glow: 'var(--glow-cyan)' },
  'Backend': { bg: 'rgba(59, 130, 246, 0.15)', text: 'var(--blue-400)', glow: 'var(--glow-blue)' },
  'Full Stack & AI': { bg: 'rgba(168, 85, 247, 0.15)', text: 'var(--accent-purple)', glow: 'var(--glow-purple)' },
  'Next.js': { bg: 'rgba(34, 211, 238, 0.15)', text: 'var(--accent-teal)', glow: 'var(--glow-cyan)' },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const colors = categoryColors[project.category] || categoryColors['Frontend'];

  return (
    <Card 
      className="glass-card group cursor-pointer overflow-hidden"
      onClick={() => onViewDetails(project)}
    >
      {/* Top accent bar */}
      <div 
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${colors.text}, var(--accent-cyan))` }}
      />
      
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            PROJ-{String(index + 1).padStart(3, '0')}
          </span>
          <Badge 
            variant="outline"
            className="text-xs border-0"
            style={{ 
              background: colors.bg,
              color: colors.text,
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full mr-1.5" 
              style={{ background: colors.text }}
            />
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0">
        {/* Project image */}
        <div className="relative h-40 rounded-xl overflow-hidden mb-4 border border-[var(--border-secondary)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
          
          {project.video && (
            <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-red-500/90 flex items-center justify-center">
              <span className="text-sm">▶️</span>
            </div>
          )}
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--blue-400)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-secondary)]"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge variant="secondary" className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
              +{project.tech.length - 4}
            </Badge>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-secondary)]">
          <span className="text-xs text-[var(--text-muted)] flex items-center gap-2">
            <span>📅</span>
            {project.date}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-[var(--bg-tertiary)] hover:bg-[var(--blue-600)] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.codeLink, '_blank');
              }}
            >
              💻
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-cyan)] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoLink, '_blank');
              }}
            >
              🚀
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))];
    return ['all', ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsVideoPlaying(false);
    setIsDialogOpen(true);
  };

  return (
    <section className="section relative" id="projects">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--blue-600)] rounded-full opacity-10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px]" />
      </div>
      
      <div className="grid-pattern opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--blue-500)]/20 text-[var(--blue-400)] border-[var(--blue-500)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--blue-500)] mr-2" />
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A collection of my recent work showcasing full-stack development, AI integration, and modern web technologies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full max-w-2xl">
            <TabsList className="w-full bg-[var(--bg-card)] border border-[var(--border-secondary)] p-1.5 rounded-full flex-wrap h-auto gap-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-[var(--blue-600)] data-[state=active]:text-white data-[state=active]:shadow-[var(--glow-blue)] transition-all capitalize"
                >
                  {category === 'all' ? '🎯 All Projects' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-[var(--text-muted)]">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setIsVideoPlaying(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl w-[90vw] max-h-[85vh] flex flex-col bg-[var(--bg-card)] border-[var(--border-primary)] text-white p-0 overflow-hidden">
          {selectedProject && (
            <>
              <DialogHeader className="p-6 pb-2 shrink-0">
                <DialogTitle className="text-2xl gradient-text">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-[var(--text-muted)]">
                  {selectedProject.category} • {selectedProject.date}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
                {/* Media */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border-secondary)] shrink-0">
                  {selectedProject.video ? (
                    isVideoPlaying ? (
                      <iframe
                        src={getYouTubeEmbedUrl(selectedProject.video, true)}
                        title={`${selectedProject.title} video demo`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/45" />
                        <button
                          type="button"
                          onClick={() => setIsVideoPlaying(true)}
                          className="absolute inset-0 m-auto h-14 w-44 rounded-lg bg-white text-slate-950 font-semibold hover:bg-[var(--blue-400)] hover:text-white transition"
                          aria-label={`Play video demo for ${selectedProject.title}`}
                        >
                          ▶ Play Video
                        </button>
                      </>
                    )
                  ) : (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-[var(--blue-400)] mb-2">Description</h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-medium text-[var(--blue-400)] mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <Badge 
                        key={tech}
                        className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-secondary)]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 pb-2">
                  <Button
                    className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] hover:border-[var(--blue-500)] hover:bg-[var(--bg-tertiary)]"
                    variant="outline"
                    asChild
                  >
                    <a href={selectedProject.codeLink} target="_blank" rel="noopener noreferrer">
                      💻 View Source Code
                    </a>
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white hover:opacity-90"
                    asChild
                  >
                    <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                      🚀 Live Demo
                    </a>
                  </Button>
                  {selectedProject.interactiveDemoLink && (
                    <Button
                      className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] hover:border-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)]"
                      variant="outline"
                      asChild
                    >
                      <a href={selectedProject.interactiveDemoLink} target="_blank" rel="noopener noreferrer">
                        Terminal Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
