# Intent: Ask Elijah

CT390 Rapid Prototyping with AI · Midterm · Elijah Cruzado · FIT, Fall 2026
Due: start of Week 10, Wednesday November 4, 2026

## 1. What are you building?

**Ask Elijah** is a chat assistant for my portfolio site, elijahcruzado.com. Recruiters and hiring managers type a question about my skills, experience or projects and get an answer drawn only from content I wrote. The chat opens from an animated character button, so it feels like part of my brand rather than a generic support widget. Inspired by the chat on emekarajis.com, where clicking an animated hat opens it.

### Core features

1. **Answers only from my content.** Resume, case study summaries, skills, tools, process and FAQs live in files in the repo and are loaded into the system prompt on the server.
2. **Tools with their own designed result cards.**
   - Project card: image, role, problem, outcome, link (Haleon design system, Legrand navigation redesign)
   - Experience timeline: Dentsu, IDX, MAIP, FIT
   - Resume download
   - Contact or book an intro call form
3. **Guardrails.** Only answers questions about me. Says "I don't have that" instead of guessing. Never invents salary or availability. Caps message length.
4. **Animated entry point.** A character or avatar button that opens the chat panel, built with Motion.
5. **Suggested starter questions.** For example: "What design systems have you built?", "Tell me about Haleon", "Are you open to roles in New York?"

### Source content (what the bot knows)

Product designer, about 3 years of experience, based in New York. Currently at Dentsu on enterprise B2B UX. Previously at IDX in corporate communications. FIT, Advertising and Digital Design, Magna Cum Laude. Certified Scrum Product Owner. MAIP 2024 alum. Key case studies: Haleon multi-brand design system (token driven) and Legrand navigation and information architecture redesign.

## 2. Who is it for?

- **Primary:** recruiters and hiring managers screening product designers. They have a few minutes per candidate and want quick, specific answers ("Has he built a design system?", "Is he in New York?") without reading every case study.
- **Secondary:** design leads and peers who want to go deeper on a project's process and outcome.
- **Me:** a way to show my work and my ability to design and ship an AI product in the same place.

Success looks like a recruiter getting a correct, sourced answer and a next step (open a case study, download the resume, or request an intro call) in under a minute.

## 3. What are the constraints?

**Time**
- About two weeks, from October 21 to November 4, alongside full-time work.
- Week 9 (October 28): 2 to 3 minute work in progress presentation, so the chat, one tool card and the animated button need to work by then.

**Data**
- Content comes only from files I write (resume, case study summaries, FAQs). No scraping, no external database for the MVP.
- No private or client-confidential details beyond what is already public in my portfolio.
- No salary, availability dates or personal details the bot could get wrong.

**Tools and tech**
- Next.js with the App Router.
- Vercel AI SDK and Vercel AI Gateway. The model call, content and tools stay on the server in a route handler at `/api/chat`; no API key in the browser.
- shadcn/ui for the chat UI, Motion for the animated button and panel.
- Storybook for every component and state (cards at desktop and 375px).
- Deployed on Vercel. GitHub Pages can't run the `/api/chat` route because it only hosts static files.
- Figma wireframe or design for the button, panel and result cards, linked in the README.

**Scope**
- In: chat with streaming answers, the four tool cards, guardrails, animated entry point, starter questions, mobile layout.
- Out for the midterm (stretch ideas): saving conversations to Supabase, "match me to this job" mode, and a voice or persona that sounds like me.
- Cost: a cap on message length and the number of messages per session to keep model spend low.

## Open questions for instructors

1. Is a portfolio chatbot different enough from the Week 6 chat app? What I plan to add on top: content-grounded answers, designed tool cards, guardrails and an animated branded entry point.
2. Can it live inside my existing site, or does it need to be its own deployed app? My plan is its own Vercel app for the midterm, embedded on elijahcruzado.com later.

## Notes from proposal review

(To fill in after the in-class review.)
