import "server-only";
import { tool } from "ai";
import { z } from "zod";
import { contact, experience, projects, resume } from "@/content/data";

const projectIds = projects.map((p) => p.id) as [string, ...string[]];

// Each tool returns content straight from content/data.ts. The model only
// chooses which card to show; it never writes the card's facts.
export const tools = {
  showProject: tool({
    description: "Show a card for one of Elijah's projects or case studies.",
    inputSchema: z.object({
      projectId: z.enum(projectIds).describe("Which project to show"),
    }),
    execute: async ({ projectId }) => projects.find((p) => p.id === projectId)!,
  }),
  showExperience: tool({
    description: "Show Elijah's career and education timeline.",
    inputSchema: z.object({}),
    execute: async () => ({ items: experience }),
  }),
  getResume: tool({
    description: "Show a card to download Elijah's résumé.",
    inputSchema: z.object({}),
    execute: async () => resume,
  }),
  contactElijah: tool({
    description: "Show ways to contact Elijah directly.",
    inputSchema: z.object({
      reason: z.string().optional().describe("Short reason, e.g. a question the facts don't cover"),
    }),
    execute: async () => contact,
  }),
};
