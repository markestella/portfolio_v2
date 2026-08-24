'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MonitorPlay, MousePointer2 } from 'lucide-react';
import presentations from '@/data/presentations.json';

export default function VintagePresentationsSection() {
  return (
    <section className="section relative" id="presentations">
      <div className="grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="mb-10">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Interactive proposal decks
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">presentations</span>{' '}
              <span className="syntax-bracket">=</span>{' '}
              <span className="syntax-bracket">[</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--parchment-400)]">
              Product stories designed as working experiences—not static slides. Select any card to open and explore the full presentation.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2" aria-label="Proposal presentations">
          {presentations.map((presentation, index) => (
            <motion.a
              key={presentation.id}
              href={presentation.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="presentation-card group block overflow-hidden rounded-md border border-[var(--ide-tab-border)] bg-[var(--espresso-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-accent)]"
              aria-label={`Open ${presentation.title} interactive presentation in a new tab`}
            >
              <div className="presentation-preview relative aspect-[16/9] overflow-hidden bg-[var(--espresso-900)]">
                <iframe
                  src={presentation.url}
                  title={`${presentation.title} preview`}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 transition-transform duration-700 group-hover:scale-[0.515]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso-900)]/80 via-transparent to-black/10" />
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded bg-[var(--espresso-900)]/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--parchment-300)] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
                  Live preview
                </div>
                <span
                  className="absolute right-3 top-3 rounded px-2.5 py-1.5 font-mono text-[10px] text-[var(--espresso-900)]"
                  style={{ backgroundColor: presentation.accent }}
                >
                  {String(presentation.slides).padStart(2, '0')} SLIDES
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--espresso-900)]/10 opacity-0 transition-all duration-300 group-hover:bg-[var(--espresso-900)]/45 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex items-center gap-2 rounded bg-[var(--gold-accent)] px-4 py-2.5 font-mono text-xs font-bold text-[var(--espresso-900)] shadow-lg">
                    <MonitorPlay size={16} /> Open presentation
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: presentation.accent }}>
                      {presentation.category}
                    </p>
                    <h3 className="text-lg font-bold text-[var(--parchment-100)] transition-colors group-hover:text-[var(--gold-light)]">
                      {presentation.title}
                    </h3>
                  </div>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--ide-tab-border)] text-[var(--parchment-400)] transition-all group-hover:border-[var(--gold-muted)] group-hover:bg-[var(--gold-accent)] group-hover:text-[var(--espresso-900)]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--parchment-400)]">
                  {presentation.description}
                </p>
                <div className="flex flex-wrap gap-1.5 border-t border-[var(--ide-tab-border)] pt-4">
                  {presentation.highlights.map((highlight) => (
                    <span key={highlight} className="rounded bg-[var(--espresso-600)] px-2 py-1 font-mono text-[10px] text-[var(--parchment-300)]">
                      {highlight}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-[var(--parchment-500)]">
                    <MousePointer2 size={11} /> Explore
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <h2 className="mt-10 text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">];</span>
        </h2>
      </motion.div>
    </section>
  );
}
