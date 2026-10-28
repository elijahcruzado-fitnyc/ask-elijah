"use client";

import { motion, useReducedMotion } from "motion/react";

type AvatarProps = { size?: number; animated?: boolean; className?: string };

/**
 * Ask Elijah's character: a speech bubble with a face. Original artwork.
 * It blinks and bobs gently unless the visitor prefers reduced motion.
 */
export function Avatar({ size = 48, animated = true, className }: AvatarProps) {
  const reduce = useReducedMotion();
  const live = animated && !reduce;

  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      animate={live ? { y: [0, -2, 0] } : undefined}
      transition={live ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <path
        d="M32 6c14.4 0 26 9.9 26 22.6 0 12.6-11.6 22.6-26 22.6-2.6 0-5.1-.3-7.4-.9L13 56l2.6-10.3C9.8 41.6 6 35.5 6 28.6 6 15.9 17.6 6 32 6Z"
        fill="var(--accent)"
      />
      <motion.g
        style={{ transformOrigin: "32px 26px" }}
        animate={live ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
        transition={live ? { duration: 4.5, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] } : undefined}
      >
        <ellipse cx="24" cy="26" rx="3.2" ry="4.2" fill="var(--accent-ink)" />
        <ellipse cx="40" cy="26" rx="3.2" ry="4.2" fill="var(--accent-ink)" />
      </motion.g>
      <path d="M24 35c4.6 4 11.4 4 16 0" stroke="var(--accent-ink)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </motion.svg>
  );
}
