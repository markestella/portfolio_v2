'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      setIsTyping(true);
      const typeChar = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsTyping(false);
          onComplete?.();
        }
      };
      typeChar();
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="cursor-blink"></span>}
    </span>
  );
}
