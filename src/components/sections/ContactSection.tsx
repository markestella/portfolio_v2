'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://portfolio-contact-api-j0fi.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'mark.estella09@gmail.com', href: 'mailto:mark.estella09@gmail.com', color: 'var(--blue-400)' },
    { icon: '💻', label: 'GitHub', value: '@markestella', href: 'https://github.com/markestella', color: 'var(--accent-cyan)' },
    { icon: '💼', label: 'LinkedIn', value: 'markdestella98', href: 'https://linkedin.com/in/markdestella98', color: 'var(--accent-teal)' },
    { icon: '🌐', label: 'OnlineJobs', value: 'View Profile', href: 'https://www.onlinejobs.ph/jobseekers/info/1330521', color: 'var(--accent-green)' },
  ];

  return (
    <section className="section bg-[var(--bg-primary)] relative" id="contact">
      <div className="grid-pattern opacity-20" />
      
      {/* Glowing orbs - Blue theme */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--blue-600)] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--blue-500)]/20 text-[var(--blue-400)] border-[var(--blue-500)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--blue-500)] mr-2" />
            Contact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left side - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main card */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--blue-600)] to-[var(--accent-cyan)] flex items-center justify-center text-2xl">
                    📬
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Get in Touch</h3>
                    <p className="text-sm text-[var(--text-muted)]">I&apos;m always open for a chat</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={info.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="group flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-secondary)] hover:border-[var(--blue-500)] transition-all hover:shadow-[var(--glow-blue)]"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `${info.color}20`, border: `1px solid ${info.color}30` }}
                      >
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-[var(--text-muted)]">{info.label}</div>
                        <div className="text-white group-hover:text-[var(--blue-400)] transition-colors">{info.value}</div>
                      </div>
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--blue-400)] transition-colors">→</span>
                    </a>
                  ))}
                </div>

                {/* Location */}
                <div className="mt-8 pt-8 border-t border-[var(--border-secondary)]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <div className="text-sm text-[var(--text-muted)]">Based in</div>
                      <div className="text-white">Davao City, Philippines</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability badge */}
            <Card className="bg-gradient-to-r from-[var(--accent-green)]/20 to-transparent border-[var(--accent-green)]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent-green)]"></span>
                  </span>
                  <div>
                    <div className="font-semibold text-white">Currently Available</div>
                    <div className="text-sm text-[var(--text-muted)]">Open for freelance & full-time opportunities</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Contact Form */}
          <div className="lg:col-span-3">
            <Card className="glass-card">
              <CardContent className="p-8">
                {/* Form header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-2xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Message</h3>
                    <p className="text-sm text-[var(--text-muted)]">Fill out the form below</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[var(--text-secondary)]">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--blue-500)] focus:ring-[var(--blue-500)]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[var(--text-secondary)]">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--blue-500)] focus:ring-[var(--blue-500)]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[var(--text-secondary)]">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Project Inquiry"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--blue-500)] focus:ring-[var(--blue-500)]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[var(--text-secondary)]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--blue-500)] focus:ring-[var(--blue-500)]/20 resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[var(--blue-600)] to-[var(--accent-cyan)] text-white hover:opacity-90 shadow-lg shadow-blue-500/25 h-12 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>🚀</span>
                        Send Message
                      </span>
                    )}
                  </Button>

                  {/* Status messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-[var(--accent-green)]/20 border border-[var(--accent-green)]/30 rounded-xl text-center">
                      <span className="text-[var(--accent-green)]">✅ Message sent successfully! I&apos;ll get back to you soon.</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-[var(--accent-red)]/20 border border-[var(--accent-red)]/30 rounded-xl text-center">
                      <span className="text-[var(--accent-red)]">❌ Failed to send message. Please try again or email me directly.</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
