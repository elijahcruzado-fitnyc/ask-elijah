import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { LIMITS } from "@/lib/limits";
import { bot, experienceAnswer, haleonAnswer, loadingCard, resumeAnswer, salaryAnswer, user } from "./fixtures";

const meta: Meta<typeof ChatPanel> = {
  title: "Ask Elijah/Chat Panel",
  component: ChatPanel,
  args: { messages: [], status: "ready", onSend: fn(), onClose: fn(), onRetry: fn(), onReset: fn() },
  decorators: [(Story) => <div style={{ height: 760, maxWidth: 420, border: "1px solid var(--line)" }}><Story /></div>],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ChatPanel>;

export const Empty: Story = {};
export const Thinking: Story = { args: { messages: [user("Tell me about Haleon")], status: "submitted" } };
export const LoadingCard: Story = { args: { messages: [user("Tell me about Haleon"), loadingCard], status: "streaming" } };
export const ProjectAnswer: Story = { args: { messages: [user("Tell me about Haleon"), haleonAnswer] } };
export const ExperienceAnswer: Story = { args: { messages: [user("Where has he worked?"), experienceAnswer] } };
export const ResumeAnswer: Story = { args: { messages: [user("Can I see his résumé?"), resumeAnswer] } };
export const DeclinesSalary: Story = { args: { messages: [user("What's his salary expectation?"), salaryAnswer] } };
export const OffTopic: Story = {
  args: {
    messages: [user("Write me a Python script that sorts a list"), bot("I only cover Elijah's work. Try asking how he uses AI in his design process.")],
  },
};
export const Error: Story = {
  args: { messages: [user("Tell me about Haleon")], status: "error", error: "Something went wrong on my side. Try again in a moment." },
};
export const NotConnected: Story = {
  args: {
    messages: [user("What does Elijah do?")],
    status: "error",
    error: "The assistant isn't connected yet. Add AI_GATEWAY_API_KEY to .env.local and restart the server.",
  },
};
export const TooLong: Story = { args: { initialInput: "x".repeat(LIMITS.maxMessageChars + 20) } };
export const LimitReached: Story = {
  args: {
    messages: Array.from({ length: LIMITS.maxUserMessages }, (_, i) => [user(`Question ${i + 1}`), bot("Answer.")]).flat(),
  },
};
export const MobileEmpty: Story = {
  name: "Empty at 375px",
  globals: { viewport: { value: "mobile1" } },
  decorators: [(Story) => <div style={{ height: 760, width: 375 }}><Story /></div>],
};
export const MobileProjectAnswer: Story = {
  name: "Project answer at 375px",
  args: { messages: [user("Tell me about Haleon"), haleonAnswer] },
  globals: { viewport: { value: "mobile1" } },
  decorators: [(Story) => <div style={{ height: 760, width: 375 }}><Story /></div>],
};
