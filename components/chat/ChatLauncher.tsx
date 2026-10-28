"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Avatar } from "./Avatar";

type ChatLauncherProps = { onOpen: () => void; open?: boolean };

/** Floating button that opens the chat. Bottom right on every screen size. */
export const ChatLauncher = forwardRef<HTMLButtonElement, ChatLauncherProps>(function ChatLauncher(
  { onOpen, open = false },
  ref,
) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label="Open Ask Elijah, an AI assistant about Elijah's work"
      aria-expanded={open}
      aria-haspopup="dialog"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: open ? 0 : 1, y: 0, scale: 1 }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full border border-line bg-surface py-2 pr-5 pl-2 text-sm font-semibold text-ink shadow-lg sm:right-6 sm:bottom-6"
      style={{ pointerEvents: open ? "none" : "auto" }}
    >
      <Avatar size={40} />
      Ask about my work
    </motion.button>
  );
});
