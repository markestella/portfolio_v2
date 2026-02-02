'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/projects';
import { techStack } from '@/data/techStack';
import { certificates } from '@/data/certificates';

interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  description?: string;
  trend?: { value: number; isPositive: boolean };
}

function StatCard({ value, label, icon, suffix = '', description, trend }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setDisplayValue(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <Card className="stat-card group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="stat-icon">
            {icon}
          </div>
          {trend && (
            <Badge 
              variant="secondary" 
              className={`text-xs ${trend.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </Badge>
          )}
        </div>
        
        <div className="stat-value">
          {displayValue}{suffix}
        </div>
        
        <div className="text-[var(--text-secondary)] text-sm font-medium mb-1">
          {label}
        </div>
        
        {description && (
          <p className="text-[var(--text-muted)] text-xs">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface SkillProgressProps {
  name: string;
  level: number;
  icon?: string;
}

function SkillProgress({ name, level, icon }: SkillProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 500);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-secondary)] flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {name}
        </span>
        <span className="text-[var(--blue-400)] font-mono">{level}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

export default function DashboardStats() {
  const stats = [
    {
      value: projects.length,
      label: 'Total Projects',
      icon: <span className="text-2xl">📁</span>,
      suffix: '+',
      description: 'Completed & deployed',
      trend: { value: 25, isPositive: true },
    },
    {
      value: 4,
      label: 'Years Experience',
      icon: <span className="text-2xl">⚡</span>,
      suffix: '+',
      description: 'In software development',
    },
    {
      value: techStack.length,
      label: 'Technologies',
      icon: <span className="text-2xl">🛠️</span>,
      suffix: '+',
      description: 'Tools & frameworks',
      trend: { value: 15, isPositive: true },
    },
    {
      value: certificates.length,
      label: 'Certifications',
      icon: <span className="text-2xl">🏆</span>,
      suffix: '',
      description: 'Professional achievements',
    },
  ];

  const skillCategories = [
    { name: 'Frontend Development', level: 92, icon: '🎨' },
    { name: 'Backend Development', level: 88, icon: '⚙️' },
    { name: 'AI/ML Integration', level: 75, icon: '🤖' },
    { name: 'DevOps & Cloud', level: 70, icon: '☁️' },
    { name: 'Database Design', level: 85, icon: '🗃️' },
  ];

  const recentActivity = [
    { action: 'Deployed', project: 'Recipe Finder App', time: '2 days ago', icon: '🚀' },
    { action: 'Updated', project: 'AI Chatbot', time: '1 week ago', icon: '🔄' },
    { action: 'Completed', project: 'Portfolio Redesign', time: '2 weeks ago', icon: '✅' },
    { action: 'Started', project: 'Next.js Portfolio', time: '3 weeks ago', icon: '🎯' },
  ];

  return (
    <section className="section relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h2>
            <p className="text-[var(--text-muted)] text-sm">Real-time portfolio statistics</p>
          </div>
          <Badge className="bg-[var(--blue-500)]/20 text-[var(--blue-400)] border-[var(--blue-500)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mr-2 animate-pulse"></span>
            Live Data
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills Progress */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>📊</span>
                  Skill Proficiency
                </h3>
                <Badge variant="outline" className="text-xs border-[var(--border-primary)] text-[var(--text-muted)]">
                  Updated today
                </Badge>
              </div>
              
              <div className="space-y-4">
                {skillCategories.map((skill, index) => (
                  <SkillProgress key={index} {...skill} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>📋</span>
                  Recent Activity
                </h3>
                <Badge variant="outline" className="text-xs border-[var(--border-primary)] text-[var(--text-muted)]">
                  Last 30 days
                </Badge>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--blue-500)]/10 flex items-center justify-center text-lg group-hover:bg-[var(--blue-500)]/20 transition-colors">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="text-[var(--blue-400)]">{activity.action}</span>{' '}
                        {activity.project}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[var(--blue-500)]/50"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
