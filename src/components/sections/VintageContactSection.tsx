'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VintageContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="section relative" id="contact">
      <div className="grid-pattern opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Contact
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">async function</span>{' '}
            <span className="syntax-function">sendMessage</span>
            <span className="syntax-bracket">()</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        <div className="pl-4 sm:pl-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
                {'//'} Get in touch
              </div>
              
              <p className="text-[var(--parchment-200)] leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out!
              </p>

              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'mark.estella09@gmail.com', href: 'mailto:mark.estella09@gmail.com' },
                  { icon: '💼', label: 'LinkedIn', value: 'markdestella98', href: 'https://linkedin.com/in/markdestella98' },
                  { icon: '💻', label: 'GitHub', value: 'markestella', href: 'https://github.com/markestella' },
                  { icon: '📍', label: 'Location', value: 'Davao City, Philippines', href: null },
                ].map((item) => (
                  <div key={item.label} className="vintage-card p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs text-[var(--parchment-500)] font-mono">{item.label}</div>
                        {item.href ? (
                          <a 
                            href={item.href}
                            target={item.href.startsWith('mailto') ? undefined : '_blank'}
                            rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                            className="text-[var(--parchment-200)] hover:text-[var(--gold-accent)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[var(--parchment-200)]">{item.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability Badge */}
              <div className="vintage-card p-4 border-l-4 border-l-[var(--accent-green)]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  <span className="text-[var(--parchment-200)]">
                    Currently available for freelance work
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
                {'//'} Send a message
              </div>
              
              <form onSubmit={handleSubmit} className="vintage-card p-6 space-y-5">
                <div>
                  <label className="block font-mono text-sm text-[var(--parchment-400)] mb-2">
                    <span className="syntax-property">name</span>
                    <span className="syntax-bracket">:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[var(--espresso-600)] border border-[var(--ide-tab-border)] rounded text-[var(--parchment-100)] placeholder:text-[var(--parchment-500)] focus:outline-none focus:border-[var(--gold-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[var(--parchment-400)] mb-2">
                    <span className="syntax-property">email</span>
                    <span className="syntax-bracket">:</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[var(--espresso-600)] border border-[var(--ide-tab-border)] rounded text-[var(--parchment-100)] placeholder:text-[var(--parchment-500)] focus:outline-none focus:border-[var(--gold-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[var(--parchment-400)] mb-2">
                    <span className="syntax-property">subject</span>
                    <span className="syntax-bracket">:</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry"
                    className="w-full px-4 py-3 bg-[var(--espresso-600)] border border-[var(--ide-tab-border)] rounded text-[var(--parchment-100)] placeholder:text-[var(--parchment-500)] focus:outline-none focus:border-[var(--gold-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[var(--parchment-400)] mb-2">
                    <span className="syntax-property">message</span>
                    <span className="syntax-bracket">:</span>
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-[var(--espresso-600)] border border-[var(--ide-tab-border)] rounded text-[var(--parchment-100)] placeholder:text-[var(--parchment-500)] focus:outline-none focus:border-[var(--gold-accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-vintage disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📤</span>
                      <span>await sendMessage()</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[var(--accent-green)]/20 border border-[var(--accent-green)]/30 rounded text-[var(--accent-green)] text-sm text-center"
                  >
                    ✅ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[var(--destructive)]/20 border border-[var(--destructive)]/30 rounded text-[var(--destructive)] text-sm text-center"
                  >
                    ❌ Failed to send message. Please try again.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">{'}'}</span>
        </h2>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--ide-tab-border)]">
          <div className="text-center">
            <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
              {'//'} © 2026 mckbyte. Built with Next.js & Tailwind CSS
            </div>
            <div className="flex justify-center gap-4">
              {[
                { href: 'https://github.com/markestella', icon: '💻', label: 'GitHub' },
                { href: 'https://linkedin.com/in/markdestella98', icon: '💼', label: 'LinkedIn' },
                { href: 'mailto:mark.estella09@gmail.com', icon: '📧', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 flex items-center justify-center vintage-card hover:border-[var(--gold-accent)] transition-all text-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
