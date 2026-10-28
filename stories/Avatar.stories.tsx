import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/chat/Avatar";

const meta: Meta<typeof Avatar> = { title: "Ask Elijah/Avatar", component: Avatar, args: { size: 96, animated: true } };
export default meta;
type Story = StoryObj<typeof Avatar>;
export const Animated: Story = {};
export const Still: Story = { args: { animated: false } };
export const Small: Story = { args: { size: 40 } };
