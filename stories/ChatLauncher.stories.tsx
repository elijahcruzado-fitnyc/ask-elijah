import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChatLauncher } from "@/components/chat/ChatLauncher";

const meta: Meta<typeof ChatLauncher> = {
  title: "Ask Elijah/Chat Launcher",
  component: ChatLauncher,
  args: { onOpen: fn(), open: false },
  decorators: [(Story) => <div style={{ height: 200 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ChatLauncher>;
export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile1" } } };
