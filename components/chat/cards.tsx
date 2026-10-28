import type { Contact, ExperienceItem, Project, Resume } from "@/lib/types";

const cardBase = "w-full overflow-hidden rounded-2xl border border-line bg-surface text-ink";
const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors";
const primary = `${buttonBase} bg-accent text-accent-ink hover:opacity-90`;
const secondary = `${buttonBase} border border-line text-ink hover:bg-paper`;

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M6 3h7v7M13 3 5 11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const meta = [project.client, project.year, project.company && `at ${project.company}`].filter(Boolean).join(" · ");
  return (
    <article className={cardBase} aria-label={`${project.title} case study`}>
      <div className="flex items-end gap-3 px-4 pt-4 pb-3" style={{ background: project.accent, color: "#fff" }}>
        <div className="min-w-0">
          <p className="text-xs font-medium opacity-85">{meta}</p>
          <h3 className="text-lg leading-tight font-semibold">{project.title}</h3>
        </div>
      </div>
      <div className="space-y-3 p-4 text-sm leading-relaxed">
        <p>
          <span className="font-semibold">Role. </span>
          {project.role}
        </p>
        <p>
          <span className="font-semibold">Problem. </span>
          {project.problem}
        </p>
        <div>
          <p className="font-semibold">What he did</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-muted">
            {project.whatIDid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p>
          <span className="font-semibold">Outcome. </span>
          {project.outcome}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-ink">
              {tag}
            </li>
          ))}
        </ul>
        {project.url ? (
          <a href={project.url} target="_blank" rel="noreferrer" className={primary}>
            Open case study <ExternalIcon />
          </a>
        ) : (
          <p className="text-xs text-muted">No public case study page yet.</p>
        )}
      </div>
    </article>
  );
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <article className={cardBase} aria-label="Experience timeline">
      <h3 className="px-4 pt-4 text-sm font-semibold">Experience</h3>
      <ol className="relative m-4 mt-3 space-y-4 border-l border-line pl-5">
        {items.map((item) => (
          <li key={`${item.company}-${item.role}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[25px] size-2.5 rounded-full ${
                item.current ? "bg-accent" : "border border-line bg-surface"
              }`}
            />
            <p className="text-sm font-semibold">
              {item.role}, {item.company}
              {item.current && (
                <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium">Current</span>
              )}
            </p>
            <p className="text-xs text-muted">{item.dates}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
          </li>
        ))}
      </ol>
      <div className="px-4 pb-4">
        <a href="https://www.linkedin.com/in/elijahcruzado/" target="_blank" rel="noreferrer" className={secondary}>
          View on LinkedIn <ExternalIcon />
        </a>
      </div>
    </article>
  );
}

export function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <article className={`${cardBase} flex items-center gap-3 p-4`} aria-label="Résumé">
      <div
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-xs font-bold text-accent"
      >
        {resume.format}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{resume.title}</h3>
        <p className="text-xs text-muted">{resume.note}</p>
      </div>
      <a href={resume.url} target="_blank" rel="noreferrer" className={primary} aria-label={`Open ${resume.title}`}>
        Open
      </a>
    </article>
  );
}

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <article className={`${cardBase} p-4`} aria-label="Contact Elijah">
      <h3 className="text-sm font-semibold">Reach Elijah directly</h3>
      <p className="mt-1 text-sm text-muted">He's happy to answer anything this assistant can't.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className={primary}>
          Message on LinkedIn <ExternalIcon />
        </a>
        {contact.email && (
          <a href={`mailto:${contact.email}`} className={secondary}>
            Email
          </a>
        )}
        <a href={contact.portfolio} target="_blank" rel="noreferrer" className={secondary}>
          Portfolio <ExternalIcon />
        </a>
      </div>
    </article>
  );
}

export function CardSkeleton({ label }: { label: string }) {
  return (
    <div className={`${cardBase} p-4`} role="status" aria-label={label}>
      <div className="h-4 w-1/3 animate-pulse rounded bg-line" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-line" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-line" />
    </div>
  );
}
