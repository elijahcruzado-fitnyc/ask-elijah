import type { ChatMessage } from "@/lib/chat-types";
import { contact, experience, projects, resume } from "@/content/data";

let n = 0;
const id = () => `m${++n}`;

export const user = (text: string): ChatMessage => ({ id: id(), role: "user", parts: [{ type: "text", text }] });
export const bot = (text: string, extra: ChatMessage["parts"] = []): ChatMessage => ({
  id: id(),
  role: "assistant",
  parts: [...extra, { type: "text", text, state: "done" }],
});

const done = <T,>(type: string, input: object, output: T) =>
  ({ type, toolCallId: id(), state: "output-available", input, output }) as unknown as ChatMessage["parts"][number];

export const haleon = projects.find((p) => p.id === "haleon")!;
export const legrand = projects.find((p) => p.id === "legrand")!;

export const haleonAnswer = bot(
  "On Haleon Huddle, Elijah worked on UX/UI design for a platform that brings every Haleon brand into one self care destination.",
  [done("tool-showProject", { projectId: "haleon" }, haleon)],
);
export const experienceAnswer = bot(
  "Elijah is a Senior Product Designer at JPMorganChase. Before that he did enterprise UX at dentsu.",
  [done("tool-showExperience", {}, { items: experience })],
);
export const resumeAnswer = bot("Here's his résumé.", [done("tool-getResume", {}, resume)]);
export const salaryAnswer = bot("I don't have that. Elijah doesn't share salary or rates here, but you can ask him directly.", [
  done("tool-contactElijah", { reason: "salary" }, contact),
]);
export const loadingCard: ChatMessage = {
  id: id(),
  role: "assistant",
  parts: [{ type: "tool-showProject", toolCallId: "x", state: "input-available", input: { projectId: "haleon" } } as never],
};
