"use client";

export function OpenChatButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ask-elijah:open"))}
      className="btn btn-primary"
    >
      {children}
    </button>
  );
}
