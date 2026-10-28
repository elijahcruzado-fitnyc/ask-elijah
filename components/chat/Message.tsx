import type { ChatMessage } from "@/lib/chat-types";
import { CardSkeleton, ContactCard, ExperienceTimeline, ProjectCard, ResumeCard } from "./cards";

const LOADING_LABELS: Record<string, string> = {
  "tool-showProject": "Loading project",
  "tool-showExperience": "Loading experience",
  "tool-getResume": "Loading résumé",
  "tool-contactElijah": "Loading contact options",
};

export function Message({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-[20px] rounded-br-md bg-bubble-user px-4 py-2.5 text-[15px] leading-6 text-bubble-user-ink">
          <span className="sr-only">You said: </span>
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="sr-only">Ask Elijah said:</span>
      {/* Answer first, then the cards that back it up. */}
      {[...message.parts.map((part, i) => ({ part, i }))]
        .sort((a, b) => Number(a.part.type !== "text") - Number(b.part.type !== "text") || a.i - b.i)
        .map(({ part, i }) => {
        const key = `${message.id}-${i}`;
        switch (part.type) {
          case "text":
            return part.text.trim() ? (
              <p
                key={key}
                className="max-w-[92%] rounded-[20px] rounded-bl-md border border-line bg-surface px-4 py-2.5 text-[15px] leading-6 whitespace-pre-wrap"
              >
                {part.text}
              </p>
            ) : null;
          case "tool-showProject":
          case "tool-showExperience":
          case "tool-getResume":
          case "tool-contactElijah": {
            if (part.state === "output-error") return null;
            if (part.state !== "output-available") return <CardSkeleton key={key} label={LOADING_LABELS[part.type]} />;
            if (part.type === "tool-showProject") return <ProjectCard key={key} project={part.output} />;
            if (part.type === "tool-showExperience") return <ExperienceTimeline key={key} items={part.output.items} />;
            if (part.type === "tool-getResume") return <ResumeCard key={key} resume={part.output} />;
            return <ContactCard key={key} contact={part.output} />;
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div role="status" aria-label="Ask Elijah is typing" className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 animate-bounce rounded-full bg-ink motion-reduce:animate-none"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
