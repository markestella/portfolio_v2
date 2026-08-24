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
  { id: 'presentations', label: 'Presentations', filename: 'presentations.json', icon: '▶️' },
  { id: 'products', label: 'Products', filename: 'products.tsx', icon: '🧾' },
  { id: 'tech', label: 'Skills', filename: 'skills.tsx', icon: '⚙️' },
  { id: 'certificates', label: 'Certificates', filename: 'certs.tsx', icon: '🏆' },
  { id: 'contact', label: 'Contact', filename: 'contact.tsx', icon: '💬' },
];

interface IDELayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

type SidebarView = 'explorer' | 'search' | 'git' | 'settings';

export default function IDELayout({ children, activeSection = 'home' }: IDELayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState<SidebarView>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef<HTMLElement>(null);

  // Mock Git Data
  const gitChanges = [
    { file: 'src/app/page.tsx', status: 'M', name: 'page.tsx' },
    { file: 'src/components/layout/IDELayout.tsx', status: 'M', name: 'IDELayout.tsx' },
    { file: 'src/styles/globals.css', status: 'M', name: 'globals.css' },
    { file: 'src/components/Sidebar.tsx', status: 'A', name: 'Sidebar.tsx' },
  ];
  
  // Mock Search Data
  const searchResults = [
    { file: 'src/app/page.tsx', matches: 3, preview: '...import VintageHero...' },
    { file: 'src/components/layout/IDELayout.tsx', matches: 5, preview: '...const [activeView, setActiveView]...' },
    { file: 'src/components/sections/Hero.tsx', matches: 1, preview: '...export default function Hero...' },
  ];

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

  const handleNavClick = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
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

  const handleActivityClick = (view: SidebarView) => {
    if (activeView === view && isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setActiveView(view);
      setIsSidebarOpen(true);
    }
  };

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
              className={`activity-icon ${activeView === 'explorer' && isSidebarOpen ? 'active' : ''}`}
              onClick={() => handleActivityClick('explorer')}
              title="Explorer (Shift+E)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div 
              className={`activity-icon ${activeView === 'search' && isSidebarOpen ? 'active' : ''}`}
              onClick={() => handleActivityClick('search')}
              title="Search (Shift+F)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div 
              className={`activity-icon ${activeView === 'git' && isSidebarOpen ? 'active' : ''}`}
              onClick={() => handleActivityClick('git')}
              title="Source Control (Ctrl+Shift+G)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
              </svg>
            </div>
            <div 
              className={`activity-icon mt-auto mb-2 ${activeView === 'settings' && isSidebarOpen ? 'active' : ''}`}
              onClick={() => handleActivityClick('settings')}
              title="Settings"
            >
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
          {/* Sidebar Views */}
          {activeView === 'explorer' && (
            <>
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
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`sidebar-item ${currentSection === item.id ? 'active' : ''}`}
                  >
                    <span className="sidebar-item-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="sidebar-item-ext">.{item.filename.split('.').pop()}</span>
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

              <div className="p-4 border-t border-[var(--ide-tab-border)]">
                <Link 
                  href="#contact"
                  onClick={() => handleNavClick('contact')}
                  className="btn-vintage w-full text-center text-sm block"
                >
                  Hire Me
                </Link>
              </div>
            </>
          )}

          {activeView === 'search' && (
            <>
              <div className="ide-sidebar-header">
                <span className="uppercase">Search</span>
              </div>
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--input)] border border-[var(--border)] rounded px-3 py-1 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
                {searchQuery && (
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    {searchResults.length} results found
                  </div>
                )}
                <div className="space-y-1">
                  {searchResults.map((result, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex items-center gap-2 py-1 px-2 hover:bg-[var(--ide-sidebar-hover)] rounded">
                        <span className="text-[var(--text-muted)]">▶</span>
                         <span className="text-sm text-[var(--text-primary)] font-mono text-xs">{result.file}</span>
                         <span className="ml-auto text-[var(--text-muted)] text-xs">{result.matches}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'git' && (
            <>
               <div className="ide-sidebar-header flex justify-between">
                <span className="uppercase">Source Control</span>
                <div className="flex gap-2">
                  <span className="text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-primary)]">↻</span>
                  <span className="text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-primary)]">✓</span>
                </div>
              </div>
              <div className="ide-sidebar-nav">
                 <div className="px-3 py-2 flex justify-between items-center text-xs font-mono text-[var(--parchment-500)] uppercase tracking-wider">
                  <span>Changes</span>
                  <span className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full px-1.5 py-0.5 text-[10px]">{gitChanges.length}</span>
                </div>
                {gitChanges.map((change, idx) => (
                  <div key={idx} className="sidebar-item group">
                    <span className={`text-xs w-4 ${change.status === 'M' ? 'text-yellow-500' : 'text-green-500'}`}>{change.status}</span>
                    <span className="text-sm truncate">{change.name}</span>
                    <span className="ml-auto text-xs text-[var(--text-muted)] truncate max-w-[60px] opacity-0 group-hover:opacity-100">{change.file}</span>
                  </div>
                ))}
              </div>
            </>
          )}

           {activeView === 'settings' && (
            <>
               <div className="ide-sidebar-header">
                <span className="uppercase">Settings</span>
              </div>
              <div className="p-4 text-sm text-[var(--text-muted)]">
                <p>Theme: Vintage Earth</p>
                <p className="mt-2">Font: Merriweather</p>
              </div>
            </>
          )}

        </aside>

        {/* Editor Area */}
        <div className="ide-editor-area">
          {/* File Tabs */}
          {/* File Tabs Area */}
          <div className="flex bg-[var(--ide-tab-inactive)] border-b border-[var(--ide-tab-border)] shrink-0 h-[42px] items-stretch">
            {/* Mobile Menu Button - Permanent Left Side */}
            <div className="lg:hidden flex items-center justify-center border-r border-[var(--ide-tab-border)] w-[42px] relative z-20 bg-[var(--ide-tab-inactive)] shrink-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-full h-full flex items-center justify-center hover:bg-[var(--ide-sidebar-hover)] transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg 
                  className="w-5 h-5 text-[var(--parchment-300)]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Scrollable Tabs Container */}
            <div className="ide-tabs flex-1 border-b-0 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`ide-tab ${currentSection === item.id ? 'active' : ''}`}
                >
                  <span className="ide-tab-icon">{item.icon}</span>
                  <span>{item.filename}</span>
                </a>
              ))}
            </div>
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
