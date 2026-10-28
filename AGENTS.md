<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Ask Elijah project rules

- Read `intent.md` before starting any task. Scope and constraints live there.
- App Router only. The model call, my content files and tools stay on the server in `app/api/chat/route.ts`. Never expose an API key or the system prompt to the browser.
- The bot answers only from content files in the repo. When the content doesn't cover a question, it says "I don't have that". It never invents salary, availability or personal details.
- Every component and state gets a Storybook story, checked at desktop and 375px.
- Deploy target is Vercel (GitHub Pages can't run the API route).
- Commit messages say what changed. Log prompts in `README.md` under "Prompt log".
- Content lives in `content/` (Markdown facts plus `data.ts` for card data). Tools return content from there; the model never writes card facts.
- `ASK_ELIJAH_MOCK=1` is for local testing only. Never set it in Vercel.
- Storybook uses `@tailwindcss/vite` (see `.storybook/main.ts`) because the app compiles Tailwind through Turbopack.
- Visual design matches elijahcruzado.com. Tokens live at the top of `app/globals.css` (from the site's Webflow stylesheet). Use the `.btn`, `.btn-primary`, `.pill` and `.label` classes there instead of new button styles. Secondary text uses `--muted` (#5c5c5c), not the site's #ababab, for WCAG contrast.
