'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { techStack } from '@/data/techStack';

const categories = {
  'Languages & Scripting': { icon: '💻', color: 'var(--accent-cyan)', techs: ['Python', 'VBA', 'C# .NET', 'TypeScript', 'JavaScript', 'C++', 'YAML', 'Google Apps Script'] },
  'Frontend & UI': { icon: '⚡', color: 'var(--blue-400)', techs: ['React', 'Next.js', 'Ionic React', 'Tailwind CSS', 'ShadCN UI', 'HTML', 'CSS'] },
  'Backend & Automation': { icon: '🔧', color: 'var(--accent-teal)', techs: ['FastAPI', '.NET Core', 'ExpressJS', 'Google Apps Script', 'VBA'] },
  'AI & Data': { icon: '🗄️', color: 'var(--accent-yellow)', techs: ['Microsoft Semantic Kernel', 'RAG', 'OpenAI', 'Mistral', 'Assembly AI', 'PostgreSQL', 'PgAdmin 4', 'Vector DB', 'Entity Framework Core', 'Alembic Migrations'] },
  'DevOps & Cloud': { icon: '☁️', color: 'var(--accent-purple)', techs: ['Docker', 'Git', 'GitHub Actions', 'Terraform', 'Azure', 'AWS', 'AWS Lambda', 'Amazon Connect', 'AWS Q', 'AWS S3', 'AWS DynamoDB'] },
  'Other Tools': { icon: '🛠️', color: 'var(--accent-green)', techs: ['Canva', 'CapCut', 'Filmora', 'Adobe Photoshop', 'NEMO Drive Test', 'Arduino'] },
};

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section className="section bg-[var(--bg-primary)] relative" id="tech">
      <div className="grid-pattern opacity-20" />
      
      {/* Glowing orbs - Blue theme */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--blue-600)] rounded-full opacity-10 blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mr-2" />
            Skills
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Tech Categories */}
        <div className="space-y-12">
          {Object.entries(categories).map(([category, { icon, color, techs }]) => {
            const categoryTech = techStack.filter((t) => techs.includes(t.name));
            
            if (categoryTech.length === 0) return null;

            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 rounded-xl"
                    style={{ 
                      borderColor: `${color}40`,
                      background: `${color}10`,
                    }}
                  >
                    <span className="text-xl mr-2">{icon}</span>
                    <span className="font-semibold" style={{ color }}>
                      {category}
                    </span>
                  </Badge>
                  <div 
                    className="flex-1 h-px"
                    style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
                  />
                  <span className="text-sm text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
                    {categoryTech.length} skills
                  </span>
                </div>

                {/* Tech grid */}
                <TooltipProvider>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {categoryTech.map((tech) => (
                      <Tooltip key={tech.name}>
                        <TooltipTrigger asChild>
                          <Card
                            className={`glass-card cursor-pointer transition-all duration-300 ${
                              hoveredTech === tech.name 
                                ? 'border-[var(--blue-500)] shadow-[var(--glow-blue)] -translate-y-1 scale-105' 
                                : 'hover:border-[var(--border-primary)] hover:-translate-y-0.5'
                            }`}
                            onMouseEnter={() => setHoveredTech(tech.name)}
                            onMouseLeave={() => setHoveredTech(null)}
                          >
                            <CardContent className="flex flex-col items-center gap-3 p-4">
                              <div className="relative w-10 h-10">
                                <Image
                                  src={tech.icon}
                                  alt={tech.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs text-center text-[var(--text-secondary)] line-clamp-1">
                                {tech.name}
                              </span>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tech.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Languages', count: 8, icon: '💻', color: 'var(--accent-cyan)' },
            { label: 'Frontend/UI', count: 7, icon: '⚡', color: 'var(--blue-400)' },
            { label: 'AI & Data', count: 10, icon: '🗄️', color: 'var(--accent-yellow)' },
            { label: 'Tools', count: techStack.length, icon: '🛠️', color: 'var(--accent-teal)' },
          ].map((stat) => (
            <Card key={stat.label} className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.count}+</div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
