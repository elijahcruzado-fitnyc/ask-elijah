"use client";

export function OpenChatButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ask-elijah:open"))}
      className="min-h-12 rounded-full bg-accent px-6 text-base font-semibold text-accent-ink hover:opacity-90"
    >
      {children}
    </button>
  );
}
