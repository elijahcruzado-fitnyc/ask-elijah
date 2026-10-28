import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardSkeleton, ContactCard, ExperienceTimeline, ProjectCard, ResumeCard } from "@/components/chat/cards";
import { contact, experience, resume } from "@/content/data";
import { haleon, legrand } from "./fixtures";

const meta: Meta = {
  title: "Ask Elijah/Cards",
  decorators: [(Story) => <div style={{ maxWidth: 380, padding: 16 }}><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const ProjectHaleon: Story = { render: () => <ProjectCard project={haleon} /> };
export const ProjectWithoutLink: Story = { name: "Project, no case study page (Legrand)", render: () => <ProjectCard project={legrand} /> };
export const Experience: Story = { render: () => <ExperienceTimeline items={experience} /> };
export const Resume: Story = { render: () => <ResumeCard resume={resume} /> };
export const Contact: Story = { render: () => <ContactCard contact={contact} /> };
export const ContactWithEmail: Story = { render: () => <ContactCard contact={{ ...contact, email: "hello@example.com" }} /> };
export const Loading: Story = { render: () => <CardSkeleton label="Loading project" /> };
export const ProjectMobile: Story = {
  name: "Project at 375px",
  globals: { viewport: { value: "mobile1" } },
  render: () => <ProjectCard project={haleon} />,
};
