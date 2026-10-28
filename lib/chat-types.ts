import type { UIDataTypes, UIMessage } from "ai";
import type { Contact, ExperienceItem, Project, Resume } from "./types";

export type AskElijahTools = {
  showProject: { input: { projectId: string }; output: Project };
  showExperience: { input: Record<string, never>; output: { items: ExperienceItem[] } };
  getResume: { input: Record<string, never>; output: Resume };
  contactElijah: { input: { reason?: string }; output: Contact };
};

export type ChatMessage = UIMessage<unknown, UIDataTypes, AskElijahTools>;
export type ChatStatus = "submitted" | "streaming" | "ready" | "error";

export const STARTERS = [
  "What does Elijah do?",
  "Tell me about Haleon",
  "How does he use AI in his work?",
  "What design systems has he built?",
];

/** Follow up chips, picked from the cards in the latest answer. */
export function followUpsFor(message: ChatMessage | undefined): string[] {
  if (!message || message.role !== "assistant") return [];
  const types = message.parts.map((p) => p.type);
  const project = message.parts.find((p) => p.type === "tool-showProject");
  const projectId = project && "input" in project ? project.input?.projectId : undefined;

  if (projectId === "haleon") return ["Tell me about Legrand", "How does he use AI?", "Can I see his résumé?"];
  if (projectId === "legrand") return ["Tell me about Haleon", "How does he run research?", "How can I reach him?"];
  if (projectId) return ["Tell me about Haleon", "Show his experience", "How can I reach him?"];
  if (types.includes("tool-showExperience")) return ["Tell me about Haleon", "What's his education?", "Can I see his résumé?"];
  if (types.includes("tool-getResume")) return ["Show his experience", "How can I reach him?"];
  if (types.includes("tool-contactElijah")) return ["Tell me about Haleon", "How does he use AI?"];
  return ["Tell me about Haleon", "Show his experience", "How can I reach him?"];
}
