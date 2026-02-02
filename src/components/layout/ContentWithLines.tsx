'use client';

import { useRef, useEffect, useState } from 'react';

interface ContentWithLinesProps {
  children: React.ReactNode;
  showLineNumbers?: boolean;
  startLine?: number;
}

export default function ContentWithLines({ 
  children, 
  showLineNumbers = true,
  startLine = 1 
}: ContentWithLinesProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const calculateLines = () => {
      const contentHeight = contentRef.current?.scrollHeight || 0;
      const lineHeight = 32; // Match the line-number height in CSS
      const lines = Math.ceil(contentHeight / lineHeight);
      setLineCount(lines);
    };

    calculateLines();
    
    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateLines);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div className="content-with-lines">
      {showLineNumbers && (
        <div className="line-numbers hidden lg:block" aria-hidden="true">
          {Array.from({ length: Math.max(lineCount, 30) }, (_, i) => (
            <div key={i} className="line-number">
              {startLine + i}
            </div>
          ))}
        </div>
      )}
      <div ref={contentRef} className="main-content">
        {children}
      </div>
    </div>
  );
}
