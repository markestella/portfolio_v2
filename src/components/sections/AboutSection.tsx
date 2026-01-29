'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { experiences } from '@/data/experience';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], icon: '🎨', color: 'var(--accent-cyan)', level: 92 },
  { category: 'Backend', items: ['.NET', 'FastAPI', 'Node.js', 'PostgreSQL'], icon: '⚙️', color: 'var(--blue-400)', level: 88 },
  { category: 'DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'Vercel'], icon: '🚀', color: 'var(--accent-teal)', level: 70 },
  { category: 'AI/ML', items: ['Semantic Kernel', 'OpenAI', 'LangChain', 'Gemini'], icon: '🤖', color: 'var(--accent-purple)', level: 75 },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section className="section bg-[var(--bg-secondary)] relative" id="about">
      <div className="grid-pattern opacity-20" />
      
      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--blue-600)] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--blue-500)]/20 text-[var(--blue-400)] border-[var(--blue-500)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--blue-500)] mr-2" />
            About
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A passionate developer with a love for creating beautiful, functional, and user-friendly applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Profile card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6">
                  {/* Profile image */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-600)] to-[var(--accent-cyan)] opacity-20" />
                    <Image src="/me.jpg" alt="Mark Estella" fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Mark Estella</h3>
                      <p className="text-[var(--blue-400)]">Software Engineer</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: '📍', label: 'Location', value: 'Davao City, PH' },
                        { icon: '💼', label: 'Experience', value: '4+ Years' },
                        { icon: '🎓', label: 'Education', value: 'BS Computer Eng.' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 p-3 bg-[var(--bg-tertiary)] rounded-xl">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <div className="text-xs text-[var(--text-muted)]">{item.label}</div>
                            <div className="text-sm text-white">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white hover:opacity-90"
                      asChild
                    >
                      <a href="/cv.pdf" download className="flex items-center justify-center gap-2">
                        <span>📄</span>
                        <span>Download Resume</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Tabbed content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-secondary)] p-1.5 h-auto">
                {[
                  { id: 'story', label: 'My Story', icon: '📖' },
                  { id: 'experience', label: 'Experience', icon: '💼' },
                  { id: 'skills', label: 'Skills', icon: '🛠️' },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 py-3 rounded-xl data-[state=active]:bg-[var(--blue-600)] data-[state=active]:text-white data-[state=active]:shadow-[var(--glow-blue)] transition-all"
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Story Tab */}
              <TabsContent value="story" className="space-y-6">
                <Card className="glass-card">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--blue-500)]/20 flex items-center justify-center text-2xl">
                        👋
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Hello there!</h3>
                        <p className="text-sm text-[var(--text-muted)]">Let me tell you about myself</p>
                      </div>
                    </div>

                    <Separator className="bg-[var(--border-secondary)]" />

                    <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        I&apos;m a passionate <span className="text-[var(--blue-400)]">Software Engineer</span> based in Davao City, Philippines 
                        with over 4 years of experience in building web applications and integrating AI solutions.
                      </p>
                      <p>
                        My journey in software development started during my college years, and I&apos;ve been 
                        hooked ever since. I love solving complex problems and turning ideas into reality 
                        through clean, efficient code.
                      </p>
                      <p>
                        When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
                        open-source projects, or sharing knowledge with the developer community.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {[
                        { label: 'Coffee consumed', value: '1000+', icon: '☕' },
                        { label: 'Lines of code', value: '100k+', icon: '💻' },
                        { label: 'Bugs fixed', value: '∞', icon: '🐛' },
                        { label: 'Happy clients', value: '20+', icon: '😊' },
                      ].map((stat) => (
                        <div key={stat.label} className="p-4 bg-[var(--bg-tertiary)] rounded-xl text-center">
                          <div className="text-2xl mb-1">{stat.icon}</div>
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                {experiences.map((exp, index) => (
                  <Card key={index} className="glass-card group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[var(--blue-500)]/20 flex items-center justify-center text-2xl group-hover:bg-[var(--blue-500)]/30 transition-colors">
                          💼
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white group-hover:text-[var(--blue-400)] transition-colors">
                                {exp.title}
                              </h3>
                              <p className="text-[var(--blue-400)]">{exp.company}</p>
                            </div>
                            <Badge variant="outline" className="border-[var(--border-primary)] text-[var(--text-muted)]">
                              {exp.date}
                            </Badge>
                          </div>
                          <ul className="text-sm text-[var(--text-muted)] mb-3 space-y-1">
                            {exp.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[var(--blue-400)] mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{ background: `${skillGroup.color}20` }}
                          >
                            {skillGroup.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{skillGroup.category}</h3>
                            <p className="text-xs text-[var(--text-muted)]">{skillGroup.items.length} technologies</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold" style={{ color: skillGroup.color }}>
                          {skillGroup.level}%
                        </span>
                      </div>
                      
                      <Progress value={skillGroup.level} className="h-2 mb-4" />
                      
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge 
                            key={skill}
                            className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-secondary)] hover:border-[var(--blue-500)] transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
