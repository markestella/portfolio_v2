'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SignatureAnimation from '@/components/terminal/SignatureAnimation';
import IDELayout from '@/components/layout/IDELayout';

interface IDEWrapperProps {
  children: React.ReactNode;
}

export default function IDEWrapper({ children }: IDEWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <SignatureAnimation
          key="intro"
          onComplete={handleIntroComplete}
          duration={4000}
        />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <IDELayout>
            {children}
          </IDELayout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
