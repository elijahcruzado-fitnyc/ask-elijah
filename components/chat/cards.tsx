import type { Contact, ExperienceItem, Project, Resume } from "@/lib/types";

// Matches the portfolio's .card: 1px dark border, 20px radius, white.
const cardBase = "w-full overflow-hidden rounded-[20px] border border-line bg-surface text-ink";

// Link behavior:
// - Portfolio pages (case studies, home) open in the same tab. target="_top"
//   so that inside the Webflow embed frame they replace the whole page, not
//   just the frame.
// - LinkedIn and the résumé open in a new tab, marked with the external icon
//   and announced to screen readers.
const SAME_TAB = { target: "_top" } as const;
const NEW_TAB = { target: "_blank", rel: "noreferrer" } as const;

function ExternalIcon() {
  return (
    <>
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M6 3h7v7M13 3 5 11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const meta = [project.client, project.year, project.company && `at ${project.company}`].filter(Boolean).join(" · ");
  return (
    <article className={cardBase} aria-label={`${project.title} case study`}>
      <div className="border-b border-line px-5 pt-5 pb-4" style={{ background: project.accent }}>
        <p className="label">{meta}</p>
        <h3 className="mt-1 text-[22px] leading-7 font-medium">{project.title}</h3>
      </div>
      <div className="space-y-3 p-5 text-[15px] leading-6">
        <p>
          <span className="font-medium">Role. </span>
          {project.role}
        </p>
        <p>
          <span className="font-medium">Problem. </span>
          {project.problem}
        </p>
        <div>
          <p className="font-medium">What he did</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 font-light">
            {project.whatIDid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p>
          <span className="font-medium">Outcome. </span>
          {project.outcome}
        </p>
        <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-[50px] border border-line px-3 py-1 text-[13px] leading-5">
              {tag}
            </li>
          ))}
        </ul>
        {project.url ? (
          <a href={project.url} {...SAME_TAB} className="btn btn-primary mt-1">
            Open case study <ArrowIcon />
          </a>
        ) : (
          <p className="text-[13px] text-muted">No public case study page yet.</p>
        )}
      </div>
    </article>
  );
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <article className={cardBase} aria-label="Experience timeline">
      <h3 className="label px-5 pt-5">Experience</h3>
      <ol className="relative m-5 mt-3 space-y-4 border-l border-line pl-5">
        {items.map((item) => (
          <li key={`${item.company}-${item.role}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[26px] size-3 rounded-full border border-line ${
                item.current ? "bg-accent" : item.education ? "bg-accent-soft" : "bg-surface"
              }`}
            />
            <p className="text-[15px] leading-6 font-medium">
              {item.role}, {item.company}
              {item.current && (
                <span className="ml-2 rounded-[50px] border border-line bg-accent px-2 py-0.5 text-[12px] font-medium">
                  Current
                </span>
              )}
            </p>
            <p className="text-[13px] text-muted">{item.dates}</p>
            <p className="mt-1 text-[15px] leading-6 font-light">{item.detail}</p>
          </li>
        ))}
      </ol>
      <div className="px-5 pb-5">
        <a href="https://www.linkedin.com/in/elijahcruzado/" {...NEW_TAB} className="btn">
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
        className="grid size-12 shrink-0 place-items-center rounded-[10px] border border-line bg-accent-soft text-[12px] font-medium"
      >
        {resume.format}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-medium">{resume.title}</h3>
        <p className="text-[13px] text-muted">{resume.note}</p>
      </div>
      <a href={resume.url} {...NEW_TAB} className="btn btn-primary" aria-label={`Open ${resume.title} (opens in a new tab)`}>
        Open <ExternalIcon />
      </a>
    </article>
  );
}

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <article className={`${cardBase} p-5`} aria-label="Contact Elijah">
      <h3 className="text-[18px] leading-6 font-medium">Reach Elijah directly</h3>
      <p className="mt-1 text-[15px] leading-6 font-light">He&apos;s happy to answer anything this assistant can&apos;t.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={contact.linkedin} {...NEW_TAB} className="btn btn-primary">
          Message on LinkedIn <ExternalIcon />
        </a>
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="btn">
            Email
          </a>
        )}
        <a href={contact.portfolio} {...SAME_TAB} className="btn">
          Portfolio <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export function CardSkeleton({ label }: { label: string }) {
  return (
    <div className={`${cardBase} p-5`} role="status" aria-label={label}>
      <div className="h-4 w-1/3 animate-pulse rounded bg-hairline" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-hairline" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-hairline" />
    </div>
  );
}
