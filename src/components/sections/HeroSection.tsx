'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { techStack } from '@/data/techStack';

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI Integration Specialist',
  'Backend Developer',
];

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let charIndex = 0;
    
    if (isTyping) {
      const typeInterval = setInterval(() => {
        if (charIndex <= role.length) {
          setDisplayedRole(role.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 80);
      
      return () => clearInterval(typeInterval);
    } else {
      const deleteInterval = setInterval(() => {
        if (charIndex >= 0) {
          setDisplayedRole(role.slice(0, charIndex));
          charIndex--;
        } else {
          clearInterval(deleteInterval);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }
      }, 40);
      
      return () => clearInterval(deleteInterval);
    }
  }, [currentRoleIndex, isTyping]);

  const displayedTech = techStack.slice(0, 8);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-20 md:pt-24 md:pb-24 relative overflow-hidden">
      {/* Animated background - Blue theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--blue-600)] rounded-full opacity-15 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--blue-800)] rounded-full opacity-10 blur-[150px]"></div>
      </div>
      
      <div className="grid-pattern opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-card)] border-[var(--border-primary)] hover:border-[var(--blue-500)] transition-colors"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-green)]"></span>
              </span>
              <span className="text-sm text-[var(--text-secondary)]">Available for new projects</span>
            </Badge>

            <div>
              <p className="text-[var(--blue-400)] text-lg mb-2 font-medium">Hello, I&apos;m</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="text-white">Mark </span>
                <span className="gradient-text">Estella</span>
              </h1>
              <div className="h-12 flex items-center">
                <span className="text-2xl md:text-3xl text-[var(--text-secondary)]">
                  {displayedRole}
                  <span className="text-[var(--blue-500)] animate-pulse">|</span>
                </span>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
              Crafting exceptional digital experiences with modern technologies. 
              Specialized in <span className="text-[var(--blue-400)]">full-stack development</span>,{' '}
              <span className="text-[var(--accent-cyan)]">AI integration</span>, and{' '}
              <span className="text-[var(--accent-teal)]">scalable solutions</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg"
                className="btn-glow bg-gradient-to-r from-[var(--blue-600)] to-[var(--blue-500)] hover:from-[var(--blue-500)] hover:to-[var(--blue-400)] text-white shadow-lg shadow-blue-500/25"
              >
                <Link href="#projects" className="flex items-center gap-2">
                  <span>📁</span>
                  <span>View My Work</span>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:border-[var(--blue-500)] hover:text-[var(--blue-400)]"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <span>💬</span>
                  <span>Let&apos;s Talk</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <span className="text-[var(--text-muted)] text-sm">Find me on</span>
              <TooltipProvider>
                <div className="flex gap-3">
                  {[
                    { href: 'https://github.com/markestella', icon: '💻', label: 'GitHub' },
                    { href: 'https://linkedin.com/in/markdestella98', icon: '💼', label: 'LinkedIn' },
                    { href: 'mailto:mark.estella09@gmail.com', icon: '📧', label: 'Email' },
                  ].map((social) => (
                    <Tooltip key={social.label}>
                      <TooltipTrigger asChild>
                        <a
                          href={social.href}
                          target={social.href.startsWith('mailto') ? undefined : '_blank'}
                          rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                          className="w-11 h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--border-secondary)] flex items-center justify-center text-xl hover:border-[var(--blue-500)] hover:bg-[var(--bg-card-hover)] transition-all hover:scale-110 hover:shadow-[var(--glow-blue)]"
                        >
                          {social.icon}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{social.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Right content - Profile Card */}
          <div className="relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--blue-600)] rounded-full opacity-20 blur-[80px]"></div>
            
            <Card className="glass-card relative max-w-md w-full overflow-visible">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/30 px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mr-2 animate-pulse"></span>
                  Online
                </Badge>
              </div>

              <CardContent className="p-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--blue-500)] to-[var(--accent-cyan)] rounded-full blur-lg opacity-50"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--blue-500)]">
                    <Image src="/me.jpg" alt="Mark Estella" fill className="object-cover" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Mark Estella</h3>
                  <p className="text-[var(--blue-400)]">Software Engineer</p>
                  <p className="text-[var(--text-muted)] text-sm mt-2">📍 Davao City, Philippines</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[var(--bg-tertiary)] rounded-2xl">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">15+</div>
                    <div className="text-xs text-[var(--text-muted)]">Projects</div>
                  </div>
                  <div className="text-center border-x border-[var(--border-secondary)]">
                    <div className="text-xl font-bold text-white">4+</div>
                    <div className="text-xs text-[var(--text-muted)]">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">20+</div>
                    <div className="text-xs text-[var(--text-muted)]">Skills</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-[var(--text-muted)] flex items-center justify-between">
                    <span>Tech Stack</span>
                    <span className="text-[var(--blue-400)]">{techStack.length}+ tools</span>
                  </div>
                  <TooltipProvider>
                    <div className="flex flex-wrap gap-2">
                      {displayedTech.map((tech) => (
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] p-2 hover:border-[var(--blue-500)] hover:scale-110 transition-all cursor-pointer hover:shadow-[var(--glow-blue)]">
                              <Image src={tech.icon} alt={tech.name} width={24} height={24} className="w-full h-full object-contain" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent><p>{tech.name}</p></TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1 border-[var(--border-secondary)] text-[var(--text-secondary)] hover:border-[var(--blue-500)] hover:text-white" asChild>
                    <a href="/cv.pdf" download>📄 Download CV</a>
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white hover:opacity-90" asChild>
                    <Link href="#contact">💬 Message</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 floating" style={{ animationDelay: '0s' }}>
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-2xl shadow-[var(--glow-blue)]">⚛️</div>
            </div>
            <div className="absolute -bottom-4 -left-4 floating" style={{ animationDelay: '2s' }}>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-xl shadow-[var(--glow-cyan)]">🚀</div>
            </div>
            <div className="absolute top-1/2 -right-8 floating" style={{ animationDelay: '4s' }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-lg shadow-[var(--glow-blue)]">💡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
