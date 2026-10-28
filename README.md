# Ask Elijah

**Live app:** coming soon (Vercel)
**Figma design:** coming soon
**Intent:** [intent.md](./intent.md)

A chat assistant for elijahcruzado.com. Recruiters and hiring managers ask about my skills, experience and projects, and it answers only from content I provide. CT390 Rapid Prototyping with AI midterm, FIT, Fall 2026. Due Wednesday, November 4.

## Stack

Next.js (App Router) · Vercel AI SDK · Vercel AI Gateway · shadcn/ui · Motion · Storybook · Vercel

## What works now (Week 9)

- Home page with an animated launcher (Motion) that opens the chat panel. Escape or the close button closes it and returns focus.
- Streaming answers from `app/api/chat/route.ts`, grounded only in the files in `content/`. The prompt and content never reach the browser.
- Four tools with designed cards: project (`showProject`), experience timeline (`showExperience`), résumé (`getResume`), contact (`contactElijah`).
- Starter questions, and follow up questions after each answer.
- Guardrails: 500 character cap, 20 questions per conversation, user and assistant roles only, empty messages rejected, step limit, friendly errors.
- Storybook: 27 stories covering every card and panel state, including errors, limits and 375px.

## Run it locally

```
npm install
cp .env.example .env.local     # then paste your AI Gateway key into .env.local
npm run dev                    # http://localhost:3000
npm run storybook              # http://localhost:6006
```

No key yet? `ASK_ELIJAH_MOCK=1 npm run dev` runs a scripted test model so you can click through every card. Never set it on Vercel.

## Where things live

| Path | What it is |
| --- | --- |
| `content/*.md` | Facts about Elijah, one subject per file. Edit these to change what the bot knows |
| `content/data.ts` | Projects, experience, résumé and contact, used by the cards and the prompt |
| `lib/system-prompt.ts` | Builds the instructions on the server from the content |
| `lib/tools.ts` | The four tools. They return content, the model only picks which card |
| `lib/limits.ts` | Message length, conversation and step caps |
| `app/api/chat/route.ts` | The chat route: validation, model call, streaming |
| `components/chat/` | Avatar, launcher, panel, messages, cards |
| `stories/` | Storybook stories and fixtures |

## Prompt log

1. "Create a Next.js App Router app called ask-elijah and an intent.md that answers: what am I building, who is it for, and what are the constraints. Use my midterm idea notes." (Week 8, proposal review prep)
2. "Can you look and interact with https://emekarajis.com/ to learn his AI chatbot and functionality" (teardown of the reference chatbot)
3. "Can you use this information for my intent? Make it detailed, use my portfolio https://elijahcruzado.webflow.io/, LinkedIn, resume, and the case study projects for Haleon and Legrand. Also my current role is Senior Product Designer at JPMC"
4. "Look at week 9" then "Continue without a browser": built the first working version: content files, chat route with tools and guardrails, launcher, panel, cards, follow ups, and Storybook stories.
5. "Can you make the chatbot use ui css styling and visual design from my website: https://elijahcruzado.webflow.io/" (tokens, fonts, buttons, pills and cards taken from elijahcruzado.webflow.shared.905761db3.css)
