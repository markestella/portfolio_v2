'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '#home', label: 'Home', icon: '🏠' },
  { href: '#about', label: 'About', icon: '👤' },
  { href: '#projects', label: 'Projects', icon: '📁' },
  { href: '#products', label: 'Products', icon: '🧾' },
  { href: '#tech', label: 'Skills', icon: '🛠️' },
  { href: '#certificates', label: 'Certificates', icon: '🏆' },
  { href: '#contact', label: 'Contact', icon: '💬' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--bg-secondary)]/95 backdrop-blur-xl border-b border-[var(--border-primary)] shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--blue-500)] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-[var(--blue-500)] group-hover:border-[var(--blue-400)] transition-all">
                <Image
                  src="/me.jpg"
                  alt="Mark Estella"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text">Mark Estella</h1>
              <p className="text-xs text-[var(--text-muted)]">Software Engineer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-tertiary)]/80 backdrop-blur-sm rounded-full p-1.5 border border-[var(--border-secondary)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[var(--blue-600)] text-white shadow-[var(--glow-blue)]'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Badge className="bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/30">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mr-2 animate-pulse"></span>
              Available
            </Badge>
            <Button 
              asChild
              className="bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white shadow-lg shadow-blue-500/25 hover:opacity-90"
            >
              <a href="#contact" className="flex items-center gap-2">
                <span>✨</span>
                <span>Hire Me</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] text-[var(--text-primary)] hover:border-[var(--blue-500)] transition-all"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[var(--blue-600)]/20 border-[var(--blue-500)]'
                    : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] hover:border-[var(--blue-500)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[var(--blue-600)] text-white'
                    : 'bg-[var(--bg-card)] group-hover:bg-[var(--blue-600)]'
                }`}>
                  {link.icon}
                </div>
                <span className="font-medium text-white">{link.label}</span>
              </a>
            ))}
            
            {/* Mobile CTA */}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white font-semibold"
            >
              <span>✨</span>
              <span>Hire Me</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
