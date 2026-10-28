"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chat-types";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";

/** Turn whatever the route sent back into one friendly sentence. */
function readableError(error: Error | undefined) {
  if (!error) return undefined;
  try {
    const parsed = JSON.parse(error.message);
    if (typeof parsed?.error === "string") return parsed.error;
  } catch {
    // not JSON
  }
  return error.message && error.message.length < 200 ? error.message : "Something went wrong. Try again in a moment.";
}

export function ChatWidget({ openOnLoad = false }: { openOnLoad?: boolean }) {
  const [open, setOpen] = useState(openOnLoad);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  const reduce = useReducedMotion();
  const { messages, sendMessage, status, error, regenerate, setMessages, clearError } = useChat<ChatMessage>();

  // Return focus to the launcher when the panel closes.
  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Let the hero button on the page open the chat.
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("ask-elijah:open", openChat);
    return () => window.removeEventListener("ask-elijah:open", openChat);
  }, []);

  return (
    <>
      <ChatLauncher ref={launcherRef} open={open} onOpen={() => setOpen(true)} />
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/30 sm:bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              className="fixed inset-0 z-50 sm:inset-y-3 sm:right-3 sm:left-auto sm:w-[420px] sm:overflow-hidden sm:rounded-3xl sm:border sm:border-line sm:shadow-2xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <ChatPanel
                messages={messages}
                status={status}
                error={readableError(error)}
                onSend={(text) => sendMessage({ text })}
                onClose={() => setOpen(false)}
                onRetry={() => {
                  clearError();
                  regenerate();
                }}
                onReset={() => {
                  clearError();
                  setMessages([]);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
