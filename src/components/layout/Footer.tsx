'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { href: 'https://github.com/markestella', icon: '💻', label: 'GitHub' },
  { href: 'https://linkedin.com/in/markdestella98', icon: '💼', label: 'LinkedIn' },
  { href: 'mailto:mark.estella09@gmail.com', icon: '📧', label: 'Email' },
];

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#tech', label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[var(--blue-500)] to-transparent blur-sm" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--blue-500)] rounded-xl blur-lg opacity-50" />
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[var(--blue-500)]">
                  <Image
                    src="/me.jpg"
                    alt="Mark Estella"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">Mark Estella</h3>
                <p className="text-sm text-[var(--text-muted)]">Software Engineer</p>
              </div>
            </Link>
            
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Passionate about building exceptional digital experiences with modern technologies and AI integration.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] flex items-center justify-center text-lg hover:border-[var(--blue-500)] hover:bg-[var(--bg-card)] transition-all hover:shadow-[var(--glow-blue)]"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--blue-400)] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue-500)]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Let&apos;s Work Together</h4>
            <p className="text-[var(--text-secondary)] text-sm">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white hover:opacity-90 shadow-lg shadow-blue-500/25"
            >
              <a href="#contact" className="flex items-center justify-center gap-2">
                <span>💬</span>
                <span>Get in Touch</span>
              </a>
            </Button>

            <div className="p-4 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-secondary)]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-green)]"></span>
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  Available for freelance work
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[var(--border-secondary)]" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>
            © {currentYear} Mark Estella. Built with{' '}
            <span className="text-[var(--blue-400)]">Next.js</span> &{' '}
            <span className="text-[var(--accent-cyan)]">TailwindCSS</span>
          </p>
          
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>in Davao City, Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
