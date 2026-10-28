export type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  company: string;
  role: string;
  tags: string[];
  summary: string;
  problem: string;
  whatIDid: string[];
  outcome: string;
  details: string[];
  /** Case study link. Empty when there is no public page yet. */
  url: string;
  accent: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  detail: string;
  current?: boolean;
  education?: boolean;
};

export type Resume = { title: string; url: string; format: string; note: string };

export type Contact = { linkedin: string; portfolio: string; email: string };
