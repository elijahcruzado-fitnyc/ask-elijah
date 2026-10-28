import type { Metadata } from "next";
import { ChatWidget } from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Ask Elijah",
  robots: { index: false },
};

/**
 * Loaded inside the frame that public/embed.js adds to elijahcruzado.com.
 * Transparent, so only the launcher or the panel shows on the host page.
 */
export default function EmbedPage() {
  return (
    <div className="embed-root">
      <ChatWidget embedded />
    </div>
  );
}
