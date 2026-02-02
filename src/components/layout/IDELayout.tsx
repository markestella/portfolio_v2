'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  filename: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', filename: 'home.tsx', icon: '📄' },
  { id: 'about', label: 'About', filename: 'about.tsx', icon: '📄' },
  { id: 'projects', label: 'Projects', filename: 'projects.tsx', icon: '📁' },
  { id: 'tech', label: 'Skills', filename: 'skills.tsx', icon: '⚙️' },
  { id: 'certificates', label: 'Certificates', filename: 'certs.tsx', icon: '🏆' },
  { id: 'contact', label: 'Contact', filename: 'contact.tsx', icon: '💬' },
];

interface IDELayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export default function IDELayout({ children, activeSection = 'home' }: IDELayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      // Run once on mount
      handleScroll();
    }
    
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleNavClick = useCallback((id: string) => {
    setCurrentSection(id);
    if (isMobile) {
      setIsSidebarOpen(false);
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMobile]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="ide-frame">
      {/* Title Bar with Window Controls */}
      <div className="ide-titlebar">
        <div className="window-controls">
          <div className="window-dot close" />
          <div className="window-dot minimize" />
          <div className="window-dot maximize" />
        </div>
        <span className="ml-4 text-xs font-mono text-[var(--parchment-500)]">
          mckbyte — portfolio
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--parchment-500)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
            Available for hire
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ide-content">
        {/* Activity Bar (Desktop) */}
        {!isMobile && (
          <aside className="ide-activity-bar">
            <div 
              className={`activity-icon ${isSidebarOpen ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Explorer (Shift+E)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="activity-icon" title="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className="activity-icon" title="Source Control">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
              </svg>
            </div>
            <div className="activity-icon mt-auto mb-2" title="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
          </aside>
        )}

        {/* Sidebar Overlay (Mobile) */}
        <AnimatePresence>
          {isSidebarOpen && isMobile && (
            <motion.div
              className="sidebar-overlay open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`ide-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="ide-sidebar-header">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
            </svg>
            <span>Explorer</span>
          </div>

          <nav className="ide-sidebar-nav">
            <div className="px-3 py-2 text-xs font-mono text-[var(--parchment-500)] uppercase tracking-wider">
              Portfolio
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`sidebar-item ${currentSection === item.id ? 'active' : ''}`}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span>{item.label}</span>
                <span className="sidebar-item-ext">.tsx</span>
              </a>
            ))}

            <div className="mt-6 px-3 py-2 text-xs font-mono text-[var(--parchment-500)] uppercase tracking-wider">
              Links
            </div>

            <a
              href="https://github.com/markestella"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <span className="sidebar-item-icon">💻</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/markdestella98"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <span className="sidebar-item-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="/cv.pdf"
              download
              className="sidebar-item"
            >
              <span className="sidebar-item-icon">📄</span>
              <span>Resume</span>
              <span className="sidebar-item-ext">.pdf</span>
            </a>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[var(--ide-tab-border)]">
            <Link 
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className="btn-vintage w-full text-center text-sm block"
            >
              Hire Me
            </Link>
          </div>
        </aside>

        {/* Editor Area */}
        <div className="ide-editor-area">
          {/* File Tabs */}
          <div className="ide-tabs relative">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded bg-[var(--espresso-700)] hover:bg-[var(--espresso-600)] transition-colors z-10"
              aria-label="Toggle sidebar"
            >
              <svg 
                className="w-4 h-4 text-[var(--parchment-300)]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Spacer for mobile menu button */}
            <div className="w-10 lg:hidden flex-shrink-0" />

            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`ide-tab ${currentSection === item.id ? 'active' : ''}`}
              >
                <span className="ide-tab-icon">{item.icon}</span>
                <span>{item.filename}</span>
              </a>
            ))}
          </div>

          {/* Main Content with Line Numbers */}
          <main className="ide-main" ref={mainRef}>
            {children}
          </main>
        </div>
      </div>

      {/* Status Bar */}
      <div className="ide-statusbar">
        <div className="statusbar-section">
          <div className="statusbar-item">
            <span className="statusbar-dot success" />
            <span>Ready</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
        <div className="statusbar-section">
          <span className="hidden sm:inline">TypeScript React</span>
          <span>|</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  );
}
