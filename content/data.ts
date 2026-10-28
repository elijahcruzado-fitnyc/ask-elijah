// Structured content used by the tool cards and folded into the system
// prompt. Server only: imported by lib/system-prompt.ts and lib/tools.ts.
// Card components import only the types from lib/types.ts.

import type { Contact, ExperienceItem, Project, Resume } from "@/lib/types";

const PORTFOLIO = "https://elijahcruzado.webflow.io";

export const projects: Project[] = [
  {
    id: "haleon",
    title: "Haleon Huddle",
    client: "Haleon",
    year: "2025",
    company: "dentsu",
    role: "UX/UI Design",
    tags: ["Design systems", "Information architecture", "Multi brand"],
    summary:
      "A unified, personalized, multi channel self care destination that brings every Haleon brand, service and experience into one platform.",
    problem:
      "Scattered, inconsistent brand sites with limited flexibility and little insight into user behavior. Everyone got the same experience regardless of their needs.",
    whatIDid: [
      "Sitemap blueprint and content audit to migrate brand sites into HaleonHuddle.com, deciding which pages to keep, delete or repurpose",
      "Low fidelity wireframes, tested with users and iterated",
      "High fidelity detailed design and the USSF soccer partnership landing page",
      "Brand site transformation on a token driven design system across six brand properties",
    ],
    outcome:
      "A token driven system that keeps each of six brands distinct while staying consistent, plus a roadmap toward content hubs and personalization in 2026.",
    details: [
      "Vision: integrated, scalable and consumer led, anchored by content hubs and first party data.",
      "Connects growth priorities: GLP-1 support, the US Soccer (USSF) partnership, healthcare professional moments, promotions and seasonal solutions.",
      "Research segments: in control of their health (35 to 54), in control of their health (55+), and controlled by their health (35+).",
      "Pain points: fragmented health information, hard to find personalized support, confusing access to savings and benefits.",
      "Takeaway: unifying many brands needed strong governance and close design, product and engineering collaboration.",
    ],
    url: `${PORTFOLIO}/haleon-huddle`,
    accent: "#0f766e",
  },
  {
    id: "legrand",
    title: "Legrand navigation redesign",
    client: "Legrand",
    year: "",
    company: "dentsu",
    role: "UX design, information architecture",
    tags: ["Information architecture", "Navigation", "User research"],
    summary:
      "A rebuild of Legrand's navigation and information architecture around a hub led model.",
    problem:
      "User research showed people couldn't find what they needed in the existing site structure.",
    whatIDid: [
      "Diagnosed the navigation problem from user research",
      "Rebuilt the information architecture around a hub led model",
    ],
    outcome:
      "In his words, the project was less about the final UI and more about the diagnostic work that made the UI possible.",
    details: [],
    url: "",
    accent: "#b45309",
  },
  {
    id: "herbalife",
    title: "Herbalife",
    client: "Herbalife",
    year: "",
    company: "dentsu",
    role: "UX/UI Design",
    tags: ["Ecommerce", "Design systems", "Rebrand"],
    summary:
      "A refreshed brand identity and ecommerce platform for a global nutrition company that sells through 4.5 million independent distributors.",
    problem:
      "An outdated platform created friction for customers and distributors, who often preferred buying in person, and the brand no longer resonated with a younger audience.",
    whatIDid: [
      "UX research, audits and personas to find pain points and MVP opportunities",
      "Redesigned purchasing journey and visual identity",
    ],
    outcome:
      "A simpler shopping experience and a handed off design system with over 600 components.",
    details: [],
    url: `${PORTFOLIO}/herbalife`,
    accent: "#15803d",
  },
  {
    id: "opentable",
    title: "OpenTable",
    client: "Academic project",
    year: "2023",
    company: "FIT",
    role: "UX research and UI design, team of four",
    tags: ["Mobile app", "UX research"],
    summary:
      "A restaurant discovery redesign that makes choosing where to eat easier and more enjoyable.",
    problem:
      "Too many similar options, few signals of authenticity, and no support for planning with a group.",
    whatIDid: [
      "Interviews, competitive analysis and a heuristic review",
      "Redesigned discovery from browse to booking",
    ],
    outcome: "A warmer, clearer discovery flow with group planning support.",
    details: [],
    url: `${PORTFOLIO}/opentable`,
    accent: "#b91c1c",
  },
  {
    id: "rayban",
    title: "RayBan",
    client: "Academic project",
    year: "2022",
    company: "FIT",
    role: "UI design, prototyping, design systems, team of four",
    tags: ["Ecommerce", "Responsive"],
    summary:
      "An ecommerce redesign that puts iconic products first and makes browsing easier across devices.",
    problem:
      "Cluttered navigation, static product imagery and a homepage with too much information and too little direction.",
    whatIDid: [
      "Wireframes to test information flow and product priority",
      "Simplified navigation and a supporting design system",
    ],
    outcome: "A focused, mobile friendly shopping experience.",
    details: [],
    url: `${PORTFOLIO}/rayban`,
    accent: "#1f2937",
  },
  {
    id: "honeymoon",
    title: "Honeymoon",
    client: "Academic project",
    year: "2023",
    company: "FIT",
    role: "Branding, UI and experiential design, team of two",
    tags: ["Brand", "Experiential"],
    summary:
      "A conceptual music festival brand experience inspired by Lana Del Rey's cinematic storytelling.",
    problem:
      "A celebrated artist with few large scale experiences that capture the depth of her work.",
    whatIDid: [
      "Research into her discography, visual language and fan culture",
      "Visual identity, digital touchpoints and physical activations",
    ],
    outcome: "A cohesive festival world across brand, digital and physical touchpoints.",
    details: [],
    url: `${PORTFOLIO}/honeymoon`,
    accent: "#9d174d",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Senior Product Designer",
    company: "JPMorganChase",
    dates: "Oct 2026 to present",
    detail: "Chase Card Acquisition Product team, Product Design and User Experience Design.",
    current: true,
  },
  {
    role: "UX/UI Designer",
    company: "IDX",
    dates: "May 2026 to Oct 2026",
    detail:
      "Discovery, information architecture, prototyping and interaction design for complex enterprise and consumer content ecosystems. Explored AI assisted design and development workflows.",
  },
  {
    role: "Product Designer",
    company: "dentsu",
    dates: "Jun 2024 to May 2026",
    detail: "Enterprise UX from concept to high fidelity. Clients: Subaru, National Car, Herbalife, Haleon, Legrand.",
  },
  {
    role: "Visual Designer",
    company: "Furman Roth Advertising",
    dates: "Sep 2022 to Dec 2022",
    detail: "Web, social and marketing design. Contract.",
  },
  {
    role: "Brand Designer",
    company: "DBC",
    dates: "Jul 2019 to Aug 2019",
    detail: "Built a sub brand within a larger branding system. Internship.",
  },
  {
    role: "BFA, Advertising and Digital Design",
    company: "Fashion Institute of Technology",
    dates: "2020 to 2024",
    detail: "Magna Cum Laude. MAIP 2024 alum.",
    education: true,
  },
];

export const resume: Resume = {
  title: "Elijah Cruzado, Résumé 2026",
  url: "https://cdn.prod.website-files.com/696996310c02e35484d6599f/69a5fe9dda614eaff4228b39_Elijah%20Cruzado%20Resume%202026.pdf",
  format: "PDF",
  note: "Hosted on his portfolio.",
};

export const contact: Contact = {
  linkedin: "https://www.linkedin.com/in/elijahcruzado/",
  portfolio: "https://elijahcruzado.com",
  // Email left empty until Elijah confirms which address to show.
  email: "",
};
