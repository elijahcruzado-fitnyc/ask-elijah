# Ask Elijah

**Live app:** https://ask-elijah.vercel.app
**On my portfolio:** https://elijahcruzado.com (launcher in the bottom right corner)
**Figma design:** https://www.figma.com/design/RhmUjt8EHFcIs571B7KrVM
**Intent:** [intent.md](./intent.md)

A chat assistant for elijahcruzado.com. Recruiters and hiring managers ask about my skills, experience and projects, and it answers only from content I provide. CT390 Rapid Prototyping with AI midterm, FIT, Fall 2026. Due Wednesday, November 4.

## Stack

Next.js 16 (App Router) · Vercel AI SDK 7 · Vercel AI Gateway · Tailwind 4 · Motion · Storybook 10 · Vercel

## Midterm requirements

| Requirement | Status |
| --- | --- |
| `intent.md` in the repo root answering what, who and constraints | Done |
| Next.js app built with the App Router | Done |
| Deployed on Vercel, live URL at the top of this README | Done: https://ask-elijah.vercel.app |
| Wireframe or design in Figma, linked in this README | Done: [Ask Elijah · Midterm Wireframe](https://www.figma.com/design/RhmUjt8EHFcIs571B7KrVM) |
| Repo on my own GitHub account, instructors (`dave11mj`, `hedyd`) invited as collaborators | Done |
| 2 to 3 minute work in progress presentation | Given in Week 9 |

## What works

- Live on Vercel and embedded on my Webflow portfolio with one script tag.
- Visual design matched to elijahcruzado.com: Bricolage Grotesque, the portfolio's colors, buttons, pills and cards.
- Home page with an animated launcher (Motion) that opens the chat panel. Escape or the close button closes it and returns focus.
- Streaming answers from `app/api/chat/route.ts`, grounded only in the files in `content/`. The prompt and content never reach the browser.
- Four tools with designed cards: project (`showProject`), experience timeline (`showExperience`), résumé (`getResume`), contact (`contactElijah`).
- Starter questions, and follow up questions after each answer.
- Guardrails: 500 character cap, 20 questions per conversation, 30 requests per visitor per 10 minutes, user and assistant roles only, empty messages rejected, step limit, friendly errors.
- Only my portfolio domains can show the chat in a frame.
- Storybook: 27 stories covering every card and panel state, including errors, limits and 375px.

## Design

Figma: [Ask Elijah · Midterm Wireframe](https://www.figma.com/design/RhmUjt8EHFcIs571B7KrVM). It recreates the states from the course Chat App Wireframe in my portfolio's design system.

| Section | What's in it |
| --- | --- |
| Desktop · 1440 | Closed (launcher on my portfolio), Empty (starter questions), Draft, Thinking, Complete (project card), Follow up (experience timeline), Guardrail (salary, contact card), Error |
| Mobile · 375 | Closed, Empty, Complete (project card), Guardrail (salary) |
| Foundations | Color palette, type scale (Bricolage Grotesque) and shape rules, taken from the portfolio's Webflow stylesheet |
| Components | Avatar, chat launcher, button (primary, hover, secondary, disabled, optional arrow), chip, tag, message bubble (user, assistant, greeting), typing indicator, panel header, composer, project, experience, résumé and contact cards, error message. Colors are Figma variables matching `app/globals.css` |

Research behind the design: [docs/reference-teardown.md](./docs/reference-teardown.md), a teardown of the AI assistant on emekarajis.com.

## Run it locally

```
npm install
cp .env.example .env.local     # then paste your AI Gateway key into .env.local
npm run dev                    # http://localhost:3000
npm run storybook              # http://localhost:6006
```

No key yet? `ASK_ELIJAH_MOCK=1 npm run dev` runs a scripted test model so you can click through every card. Never set it on Vercel.

## Add it to elijahcruzado.com (Webflow)

1. The app is deployed at https://ask-elijah.vercel.app (Vercel project `ask-elijah`, auto deploys on every push to `main`). AI Gateway signs in with Vercel OIDC, so no API key is stored in Vercel.
2. In Webflow: Site settings → Custom code → Footer code, paste:
   ```html
   <script src="https://ask-elijah.vercel.app/embed.js" defer></script>
   ```
3. Publish the site. The launcher appears in the bottom right of every page.
4. Optional: give any link or button the attribute `data-ask-elijah` to open the chat from it.

Only elijahcruzado.com, www.elijahcruzado.com and elijahcruzado.webflow.io can show the chat in a frame. To change that list, set `ASK_ELIJAH_FRAME_ANCESTORS` in Vercel (space separated). Custom code needs a paid Webflow site plan.

## Where things live

| Path | What it is |
| --- | --- |
| `content/*.md` | Facts about Elijah, one subject per file. Edit these to change what the bot knows |
| `content/data.ts` | Projects, experience, résumé and contact, used by the cards and the prompt |
| `lib/system-prompt.ts` | Builds the instructions on the server from the content |
| `lib/tools.ts` | The four tools. They return content, the model only picks which card |
| `lib/limits.ts` | Message length, conversation and step caps |
| `app/api/chat/route.ts` | The chat route: rate limit, validation, model call, streaming |
| `app/embed/page.tsx`, `public/embed.js` | The Webflow embed: frame page and loader script |
| `lib/rate-limit.ts` | 30 requests per visitor per 10 minutes (per server instance) |
| `components/chat/` | Avatar, launcher, panel, messages, cards |
| `stories/` | Storybook stories and fixtures |
| `docs/reference-teardown.md` | Teardown of the emekarajis.com assistant that inspired this project |

## Prompt log

1. "Create a Next.js App Router app called ask-elijah and an intent.md that answers: what am I building, who is it for, and what are the constraints. Use my midterm idea notes." (Week 8, proposal review prep)
2. "Can you look and interact with https://emekarajis.com/ to learn his AI chatbot and functionality" (teardown of the reference chatbot)
3. "Can you use this information for my intent? Make it detailed, use my portfolio https://elijahcruzado.webflow.io/, LinkedIn, resume, and the case study projects for Haleon and Legrand. Also my current role is Senior Product Designer at JPMC"
4. "Look at week 9" then "Continue without a browser": built the first working version: content files, chat route with tools and guardrails, launcher, panel, cards, follow ups, and Storybook stories.
5. "Can you make the chatbot use ui css styling and visual design from my website: https://elijahcruzado.webflow.io/" (tokens, fonts, buttons, pills and cards taken from elijahcruzado.webflow.shared.905761db3.css)
6. "Do this for me and make sure everything is set up": added the Webflow embed (/embed and embed.js), frame allowlist, per visitor rate limit, and deployed to Vercel.
7. "That worked, now just make sure the GitHub is updated so I can submit for the midterm": updated intent.md (architecture, milestone status, scope) and this README for submission.
8. "There isn't anything on Classroom 50 to accept, we are doing this in our own repo and invited Hedy and David": replaced the Classroom 50 row in the checklist.
9. "Can you quickly generate a wireframe, remember the previous wireframe we used. Recreate it to make our design": rebuilt the course Chat App Wireframe states (closed, empty, draft, thinking, complete, follow up, guardrail, error) as Ask Elijah at 1440 and 375, with components and the portfolio color variables in Figma.
10. "Make sure all of this is in the repo and updated": added docs/reference-teardown.md and a Design section describing the Figma file.
