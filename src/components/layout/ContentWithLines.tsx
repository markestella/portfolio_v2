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
      if (!contentRef.current) return;
      
      const styles = window.getComputedStyle(contentRef.current);
      const verticalPadding = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
      
      // Calculate height based on content box only (excluding padding)
      const contentHeight = contentRef.current.clientHeight - verticalPadding;
      const lineHeight = 32;
      
      const lines = Math.floor(contentHeight / lineHeight);
      setLineCount(Math.max(1, lines));
    };

    // Use a small delay to ensure rendering is complete
    const timer = setTimeout(calculateLines, 100);
    
    // Recalculate on resize
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
           if (entry.target === contentRef.current) {
             // entry.contentRect.height excludes padding/border
             const contentHeight = entry.contentRect.height;
             const lineHeight = 32;
             const lines = Math.floor(contentHeight / lineHeight);
             
             setLineCount(prev => {
                const newLines = Math.max(1, lines);
                return prev !== newLines ? newLines : prev;
             });
           }
        }
    });

    // Also use MutationObserver to detect content changes
    const mutationObserver = new MutationObserver(calculateLines);

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
      mutationObserver.observe(contentRef.current, { childList: true, subtree: true, attributes: true });
    }

    return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
        clearTimeout(timer);
    };
  }, [children]);

  return (
    <div className="content-with-lines">
      {showLineNumbers && (
        <div className="line-numbers hidden lg:block" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
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
