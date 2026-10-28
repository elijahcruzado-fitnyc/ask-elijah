import "server-only";
import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";

// Scripted model for local testing only (ASK_ELIJAH_MOCK=1). It picks a
// reply from keywords in the last user message, and calls a tool the first
// time round so the cards can be checked end to end.

const usage = {
  inputTokens: { total: 10, noCache: 10, cacheRead: undefined, cacheWrite: undefined },
  outputTokens: { total: 20, text: 20, reasoning: undefined },
};

type Script = { tool?: { name: string; input: object }; text: string };

function pick(question: string): Script {
  const q = question.toLowerCase();
  if (q.includes("haleon"))
    return {
      tool: { name: "showProject", input: { projectId: "haleon" } },
      text: "On Haleon Huddle, Elijah worked on UX/UI design for a platform that brings every Haleon brand into one self care destination, built on a token driven system across six brands.",
    };
  if (q.includes("legrand"))
    return {
      tool: { name: "showProject", input: { projectId: "legrand" } },
      text: "For Legrand, Elijah rebuilt the navigation and information architecture around a hub led model after research showed people couldn't find what they needed.",
    };
  if (q.includes("résumé") || q.includes("resume") || q.includes("cv"))
    return { tool: { name: "getResume", input: {} }, text: "Here's his résumé." };
  if (q.includes("contact") || q.includes("reach"))
    return { tool: { name: "contactElijah", input: {} }, text: "The best way to reach Elijah is LinkedIn." };
  if (q.includes("salary") || q.includes("rate"))
    return {
      tool: { name: "contactElijah", input: { reason: "salary" } },
      text: "I don't have that. Elijah doesn't share salary or rates here, but you can ask him directly.",
    };
  if (q.includes("python") || q.includes("code for me"))
    return { text: "I only cover Elijah's work. Try asking how he uses AI in his design process." };
  if (q.includes("background") || q.includes("worked") || q.includes("experience") || q.includes("do?"))
    return {
      tool: { name: "showExperience", input: {} },
      text: "Elijah is a Senior Product Designer at JPMorganChase on the Chase Card Acquisition Product team. Before that he spent about two years doing enterprise UX at dentsu.",
    };
  if (q.includes("ai"))
    return {
      text: "AI is built into how Elijah works. He uses Claude and Figma MCP to speed up research synthesis, prototyping and iteration, so more of his time goes into judgment calls.",
    };
  return {
    text: "Elijah is a New York based Senior Product Designer who works on complex, multi brand systems and moves faster with AI.",
  };
}

function lastUserText(prompt: unknown): string {
  const messages = prompt as { role: string; content: unknown }[];
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return "";
  if (typeof last.content === "string") return last.content;
  return (last.content as { type: string; text?: string }[])
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join(" ");
}

export function mockModel() {
  return new MockLanguageModelV4({
    doStream: async ({ prompt }) => {
      const script = pick(lastUserText(prompt));
      const toolAlreadyRan = (prompt as { role: string }[]).at(-1)?.role === "tool";
      const chunks: unknown[] = [];

      if (script.tool && !toolAlreadyRan) {
        chunks.push({
          type: "tool-call",
          toolCallId: `call-${Date.now()}`,
          toolName: script.tool.name,
          input: JSON.stringify(script.tool.input),
        });
        chunks.push({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage });
      } else {
        chunks.push({ type: "text-start", id: "t1" });
        for (const word of script.text.split(/(?<= )/)) chunks.push({ type: "text-delta", id: "t1", delta: word });
        chunks.push({ type: "text-end", id: "t1" });
        chunks.push({ type: "finish", finishReason: { unified: "stop", raw: undefined }, usage });
      }

      return {
        stream: simulateReadableStream({ chunks: chunks as never[], chunkDelayInMs: 25 }),
      };
    },
  });
}
