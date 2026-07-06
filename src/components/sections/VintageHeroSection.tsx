'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Cloud Infrastructure Engineer',
  'AI/RAG Solutions Developer',
];

export default function VintageHeroSection() {
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

  return (
    <section className="min-h-[80vh] flex items-center py-16 relative overflow-hidden" id="home">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--gold-accent)] rounded-full opacity-5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--syntax-string)] rounded-full opacity-5 blur-[100px]" />
      </div>
      
      <div className="grid-pattern opacity-30" />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Code-like intro comment */}
          <div className="font-mono text-sm text-[var(--syntax-comment)]">
            {'//'} Welcome to my portfolio
          </div>

          {/* Main heading with syntax highlighting */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">developer</span>{' '}
              <span className="syntax-bracket">=</span>{' '}
              <span className="syntax-bracket">{'{'}</span>
            </h1>
            
            <div className="pl-6 sm:pl-8 space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl">
                <span className="syntax-property">name</span>
                <span className="syntax-bracket">:</span>{' '}
                <span className="syntax-string">&quot;Mark Estella&quot;</span>
                <span className="text-[var(--parchment-500)]">,</span>
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl">
                <span className="syntax-property">role</span>
                <span className="syntax-bracket">:</span>{' '}
                <span className="syntax-string">&quot;{displayedRole}<span className="animate-pulse text-[var(--gold-accent)]">|</span>&quot;</span>
                <span className="text-[var(--parchment-500)]">,</span>
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl">
                <span className="syntax-property">location</span>
                <span className="syntax-bracket">:</span>{' '}
                <span className="syntax-string">&quot;Davao City, PH&quot;</span>
              </p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="syntax-bracket">{'}'}</span>
              <span className="text-[var(--parchment-500)]">;</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-[var(--parchment-300)] max-w-2xl leading-relaxed">
            Building full-stack applications, cloud infrastructure, and AI-powered tools with{' '}
            <span className="text-[var(--syntax-function)]">full-stack development</span>,{' '}
            <span className="text-[var(--syntax-type)]">RAG chatbot solutions</span>, and{' '}
            <span className="text-[var(--syntax-string)]">scalable Azure and AWS deployments</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#projects" className="btn-vintage inline-flex items-center gap-2">
              <span>📁</span>
              <span>View My Work</span>
            </Link>
            <a href="/cv.pdf" download className="btn-outline-vintage inline-flex items-center gap-2">
              <span>📄</span>
              <span>Download Resume</span>
            </a>
            <Link href="#contact" className="btn-outline-vintage inline-flex items-center gap-2">
              <span>💬</span>
              <span>Let&apos;s Talk</span>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-[var(--ide-tab-border)]">
            {[
              { value: '15+', label: 'Projects' },
              { value: '4+', label: 'Years Exp.' },
              { value: '20+', label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-[var(--parchment-500)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
