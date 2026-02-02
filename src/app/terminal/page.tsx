"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SignatureAnimation from "@/components/terminal/SignatureAnimation";
import Terminal from "@/components/terminal/Terminal";
import { TerminalProvider } from "@/components/terminal/TerminalContext";

export default function TerminalPortfolio() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <TerminalProvider>
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: "#1a1311",
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        <AnimatePresence mode="wait">
          {showIntro ? (
            <SignatureAnimation 
              key="intro"
              onComplete={handleIntroComplete} 
              duration={4000}
            />
          ) : (
            <Terminal key="terminal" />
          )}
        </AnimatePresence>
      </div>
    </TerminalProvider>
  );
}
