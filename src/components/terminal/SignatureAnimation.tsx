"use client";

import { motion, AnimatePresence, type Easing } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface SignatureAnimationProps {
  onComplete: () => void;
  duration?: number;
}

export default function SignatureAnimation({ 
  onComplete, 
  duration = 4000,
  
}: SignatureAnimationProps) {
  const [phase, setPhase] = useState<"drawing" | "glowing" | "fading">("drawing");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Phase 1: Drawing (0 - 70% of duration)
    const glowTimer = setTimeout(() => {
      setPhase("glowing");
    }, duration * 0.7);

    // Phase 2: Start fading
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
      setIsComplete(true);
    }, duration * 0.9);

    // Phase 3: Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  // Skip animation on click
  const handleSkip = useCallback(() => {
    setIsComplete(true);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  const easeInOut: Easing = "easeInOut";

  // Elegant cursive path for "mckbyte" - designed for smooth animation
  // Each letter is crafted to flow into the next
  const signaturePaths = [
    // 'm' - first letter, slightly larger
    "M 15 55 Q 18 35 25 45 Q 30 55 28 50 Q 26 40 35 45 Q 42 50 40 48 Q 38 42 48 45 L 52 52",
    // 'c'
    "M 60 42 Q 52 45 52 52 Q 52 60 62 58 Q 68 56 68 52",
    // 'k'
    "M 75 32 L 75 62 M 75 48 Q 82 42 88 38 M 75 48 Q 82 55 90 62",
    // 'b'
    "M 98 32 L 98 62 M 98 48 Q 105 42 110 48 Q 114 54 108 58 Q 102 62 98 58",
    // 'y'
    "M 120 42 Q 125 55 130 42 M 130 42 Q 135 58 128 72",
    // 't'
    "M 142 38 L 142 62 M 135 45 L 150 45",
    // 'e'
    "M 158 50 L 172 50 Q 175 42 168 40 Q 158 40 156 52 Q 156 60 168 58",
  ];

  // Combined path for single stroke effect
  const combinedPath = signaturePaths.join(" ");

  // Decorative flourish under the signature
  const flourishPath = "M 30 75 Q 90 85 170 70";

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: "#1a1311" }}
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            transition: { duration: 0.5, ease: easeInOut }
          }}
        >
          {/* Ambient glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212, 168, 71, 0.05) 0%, transparent 60%)",
            }}
            animate={{
              opacity: phase === "glowing" ? [0.5, 0.8, 0.5] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(26, 19, 17, 0.9) 100%)",
            }}
          />

          {/* Main signature SVG */}
          <div className="relative">
            <svg
              viewBox="0 0 200 100"
              className="w-[280px] sm:w-[360px] md:w-[450px] lg:w-[520px] h-auto"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Gradient for the stroke */}
                <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9952c" />
                  <stop offset="30%" stopColor="#e6b84d" />
                  <stop offset="70%" stopColor="#d4a847" />
                  <stop offset="100%" stopColor="#c9952c" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="signatureGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Softer glow for flourish */}
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background path (subtle shadow) */}
              <motion.path
                d={combinedPath}
                fill="none"
                stroke="rgba(26, 19, 17, 0.8)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: duration / 1000 * 0.65,
                  ease: easeInOut,
                }}
                style={{ transform: "translate(1px, 1px)" }}
              />

              {/* Main signature path */}
              <motion.path
                d={combinedPath}
                fill="none"
                stroke="url(#signatureGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={phase === "glowing" ? "url(#signatureGlow)" : "none"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                }}
                transition={{
                  pathLength: {
                    duration: duration / 1000 * 0.65,
                    ease: easeInOut,
                  },
                  opacity: {
                    duration: 0.3,
                  },
                }}
              />

              {/* Decorative flourish */}
              <motion.path
                d={flourishPath}
                fill="none"
                stroke="#d4a847"
                strokeWidth="1"
                strokeLinecap="round"
                filter="url(#softGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 0.6,
                }}
                transition={{
                  pathLength: {
                    duration: duration / 1000 * 0.3,
                    delay: duration / 1000 * 0.6,
                    ease: easeInOut,
                  },
                  opacity: {
                    duration: 0.3,
                    delay: duration / 1000 * 0.6,
                  },
                }}
              />

              {/* Animated dot/cursor that follows the path */}
              <motion.circle
                cx="15"
                cy="55"
                r="3"
                fill="#e6b84d"
                filter="url(#signatureGlow)"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: phase === "drawing" ? 1 : 0,
                  cx: [15, 52, 68, 90, 98, 130, 142, 172],
                  cy: [55, 52, 52, 62, 58, 42, 62, 50],
                }}
                transition={{
                  duration: duration / 1000 * 0.65,
                  ease: easeInOut,
                  times: [0, 0.12, 0.22, 0.35, 0.48, 0.62, 0.78, 1],
                }}
              />
            </svg>

            {/* Subtle reflection effect */}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 w-3/4 h-8 opacity-20"
              style={{
                background: "linear-gradient(180deg, rgba(212, 168, 71, 0.3) 0%, transparent 100%)",
                filter: "blur(8px)",
                transform: "translateX(-50%) scaleY(-0.3)",
              }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-12 text-center tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: phase !== "drawing" ? 0.7 : 0, 
              y: phase !== "drawing" ? 0 : 20,
            }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "0.75rem",
              color: "#d4c8b0",
              letterSpacing: "0.3em",
            }}
          >
            developer · craftsman · problem solver
          </motion.p>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "0.7rem",
              color: "#a89880",
            }}
          >
            click anywhere to skip
          </motion.p>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#5c4632] opacity-40" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#5c4632] opacity-40" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#5c4632] opacity-40" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#5c4632] opacity-40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
