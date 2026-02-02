"use client";

import { motion, AnimatePresence, type Easing } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
  duration?: number;
}

export default function IntroAnimation({ 
  onComplete, 
  duration = 3000 
}: IntroAnimationProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Hide cursor after signature draws
    const cursorTimer = setTimeout(() => {
      setShowCursor(false);
    }, duration * 0.8);

    // Complete animation
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, duration);

    // Callback after fade
    const callbackTimer = setTimeout(() => {
      onComplete();
    }, duration + 800);

    return () => {
      clearTimeout(cursorTimer);
      clearTimeout(completeTimer);
      clearTimeout(callbackTimer);
    };
  }, [duration, onComplete]);

  // Simplified signature for better animation
  const mckbytePath = `
    M 30 60 
    Q 35 30, 45 55 
    Q 50 70, 55 45
    Q 60 30, 70 50
    Q 75 60, 80 45
    L 85 55
    M 95 35
    Q 88 50, 95 60
    Q 105 65, 110 50
    M 120 25
    L 120 65
    Q 125 50, 135 50
    Q 145 50, 145 60
    M 155 25
    L 155 65
    M 155 45
    Q 160 35, 175 45
    Q 180 50, 175 60
    M 190 30
    Q 195 45, 200 30
    Q 205 45, 210 30
    M 220 35
    Q 212 45, 218 60
    Q 230 65, 238 50
    Q 245 35, 235 35
    M 255 35
    Q 248 55, 258 62
    Q 268 68, 275 50
    Q 280 35, 268 32
  `;

  const easeInOut: Easing = "easeInOut";
  const linearEase: Easing = "linear";

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: duration / 1000 * 0.7,
          ease: easeInOut,
        },
        opacity: {
          duration: 0.3,
        },
      },
    },
  };

  const containerVariants = {
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };

  const cursorVariants = {
    blink: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: linearEase,
      },
    },
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#1a1311" }}
          variants={containerVariants}
          initial="visible"
          exit="exit"
        >
          {/* Subtle vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(26, 19, 17, 0.8) 100%)",
            }}
          />

          {/* Signature SVG */}
          <div className="relative">
            <svg
              viewBox="0 0 300 100"
              className="w-[300px] md:w-[400px] lg:w-[500px] h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Glow filter */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9952c" />
                  <stop offset="50%" stopColor="#e6b84d" />
                  <stop offset="100%" stopColor="#d4a847" />
                </linearGradient>
              </defs>

              {/* Main signature path */}
              <motion.path
                d={mckbytePath}
                fill="none"
                stroke="url(#amberGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Animated cursor following the path */}
              {showCursor && (
                <motion.circle
                  cx="275"
                  cy="50"
                  r="4"
                  fill="#e6b84d"
                  variants={cursorVariants}
                  animate="blink"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(230, 184, 77, 0.8))",
                  }}
                />
              )}
            </svg>

            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "60%", 
                opacity: 0.6,
                transition: { delay: duration / 1000 * 0.6, duration: 0.5 }
              }}
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #d4a847, transparent)",
              }}
            />
          </div>

          {/* Tagline that fades in */}
          <motion.p
            className="absolute bottom-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 0.6, 
              y: 0,
              transition: { delay: duration / 1000 * 0.7, duration: 0.5 }
            }}
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "0.875rem",
              color: "#d4c8b0",
              letterSpacing: "0.2em",
            }}
          >
            developer · craftsman · problem solver
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
