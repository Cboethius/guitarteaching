<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Website copy (DE / EN)

All user-facing strings live in `src/lib/i18n/translations.ts`.

Before changing copy, run `npm run check:copy` (LanguageTool API for grammar and spelling).

Writing rules:

- Sound smooth and professional: flowing sentences, not a stack of short, choppy lines.
- German: formal **Sie** (Zürich teaching site). Swiss spelling where established (`schliessen`, `regelmässig`, `weiss`).
- English: clear, warm, direct. British spelling where natural (`practise` verb, `practising`).
- **Never** use em dashes (`—`). Use commas, colons, or full stops instead.
- Read each paragraph aloud; if it stumbles, rewrite it.
- Placeholders like `{price}` must stay intact.
