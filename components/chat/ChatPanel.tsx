"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LIMITS } from "@/lib/limits";
import { followUpsFor, STARTERS, type ChatMessage, type ChatStatus } from "@/lib/chat-types";
import { Avatar } from "./Avatar";
import { Message, TypingIndicator } from "./Message";

export type ChatPanelProps = {
  messages: ChatMessage[];
  status: ChatStatus;
  error?: string;
  onSend: (text: string) => void;
  onClose?: () => void;
  onRetry?: () => void;
  onReset?: () => void;
  /** Story and test hook: start with text already in the box. */
  initialInput?: string;
};

/**
 * The chat itself, with no data fetching, so every state can be shown in
 * Storybook. ChatWidget wires it to useChat and the /api/chat route.
 */
export function ChatPanel({ messages, status, error, onSend, onClose, onRetry, onReset, initialInput = "" }: ChatPanelProps) {
  const [input, setInput] = useState(initialInput);
  const titleId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const userCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userCount >= LIMITS.maxUserMessages;
  const tooLong = input.length > LIMITS.maxMessageChars;
  const canSend = input.trim().length > 0 && !tooLong && !busy && !atLimit;
  const last = messages.at(-1);
  const showTyping = status === "submitted" || (status === "streaming" && last?.role === "assistant" && last.parts.every((p) => p.type !== "text" || !p.text));
  const followUps = !busy && !error && !atLimit ? followUpsFor(last) : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ block: "end" });
  }, [messages, status]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || atLimit || trimmed.length > LIMITS.maxMessageChars) return;
    onSend(trimmed);
    setInput("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="flex h-full w-full flex-col bg-paper text-ink"
      onKeyDown={(e) => {
        if (e.key === "Escape" && onClose) onClose();
      }}
    >
      <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <Avatar size={40} />
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-base leading-tight font-semibold">
            Ask Elijah
          </h2>
          <p className="text-xs text-muted">An AI assistant that knows Elijah's work. It can make mistakes.</p>
        </div>
        {onReset && messages.length > 0 && (
          <button type="button" onClick={onReset} className="min-h-11 rounded-full px-3 text-xs font-semibold text-muted hover:text-ink">
            New chat
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="grid size-11 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div role="log" aria-live="polite" aria-relevant="additions" className="flex flex-col gap-4">
          <div className="flex flex-col items-start">
            <p className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2.5 text-sm leading-relaxed">
              Hi, I&apos;m Elijah&apos;s assistant. Ask about his experience, his case studies, or how he works.
            </p>
          </div>
          {messages.map((m) => (
            <Message key={m.id} message={m} />
          ))}
          {showTyping && <TypingIndicator />}
          {error && (
            <div role="alert" className="rounded-2xl border border-danger/40 bg-danger-soft px-4 py-3 text-sm text-ink">
              <p>{error}</p>
              {onRetry && !atLimit && (
                <button type="button" onClick={onRetry} className="mt-2 min-h-11 font-semibold text-danger underline underline-offset-2">
                  Try again
                </button>
              )}
            </div>
          )}
          {atLimit && !error && (
            <p role="status" className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-muted">
              That&apos;s the limit for one conversation. Start a new chat, or reach Elijah on LinkedIn.
            </p>
          )}
        </div>
        <div ref={endRef} />
      </div>

      {(messages.length === 0 || followUps.length > 0) && (
        <div className="px-4 pb-2">
          <p className="sr-only">{messages.length === 0 ? "Suggested questions" : "Suggested follow ups"}</p>
          <ul className="flex flex-wrap gap-2">
            {(messages.length === 0 ? STARTERS : followUps).map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => send(q)}
                  disabled={busy}
                  className="min-h-11 rounded-full border border-line bg-surface px-3.5 text-sm text-ink hover:border-accent disabled:opacity-50"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit} className="border-t border-line bg-surface px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2">
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Your question
          </label>
          <textarea
            id={`${titleId}-input`}
            ref={inputRef}
            rows={1}
            value={input}
            disabled={atLimit}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={atLimit ? "Conversation limit reached" : "Ask a question"}
            aria-describedby={`${titleId}-hint`}
            aria-invalid={tooLong || undefined}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-paper px-4 py-2.5 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink disabled:opacity-40"
          >
            Send
          </button>
        </div>
        <p id={`${titleId}-hint`} className={`mt-2 text-xs ${tooLong ? "text-danger" : "text-muted"}`}>
          {tooLong
            ? `Keep it under ${LIMITS.maxMessageChars} characters (${input.length} now).`
            : "Answers are generated by AI from Elijah's portfolio and LinkedIn."}
        </p>
      </form>
    </section>
  );
}
