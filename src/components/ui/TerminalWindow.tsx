'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
