/**
 * Checks user-facing copy in translations.ts via the LanguageTool API (DE + EN).
 *
 * Usage: npm run check:copy
 *
 * Optional env:
 *   LANGUAGETOOL_API_URL  (default: https://api.languagetool.org/v2/check)
 *   LANGUAGETOOL_API_KEY  (for premium/self-hosted; optional on the public API)
 */

import { getTranslations } from "../src/lib/i18n/translations";

const LT_API =
  process.env.LANGUAGETOOL_API_URL ?? "https://api.languagetool.org/v2/check";
const LT_KEY = process.env.LANGUAGETOOL_API_KEY;

const LOCALES = [
  { id: "de" as const, ltLang: "de-CH" },
  { id: "en" as const, ltLang: "en-GB" },
];

/** Brand names, tech terms, and music vocabulary LanguageTool often flags wrongly. */
const ALLOWLIST =
  /\b(TWINT|Vercel|Stripe|CHF|revDSG|FADP|FDPIC|EDÖB|UWG|localStorage|fingerpicking|Freediving|Metal|Zoom|PayPal|IBAN|Resend|Vimeo|Postgres|npm|Node\.js|GitHub)\b/i;

/** Rule IDs that are noisy for marketing/legal copy or intentional site style. */
const DISABLED_RULES = [
  "ENGLISH_WORD_REPEAT_BEGINNING_RULE",
  "GERMAN_WORD_REPEAT_RULE",
  "COMMA_COMPOUND_SENTENCE",
  "WHITESPACE_RULE",
].join(",");

const BATCH_MAX_CHARS = 3500;
const REQUEST_DELAY_MS = 3500;

type CopyEntry = { path: string; text: string };

type LtMatch = {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements?: { value: string }[];
  rule: { id: string; description: string };
};

function collectStrings(value: unknown, path: string, out: CopyEntry[]): void {
  if (typeof value === "string") {
    out.push({ path, text: value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectStrings(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      collectStrings(nested, path ? `${path}.${key}` : key, out);
    }
  }
}

function shouldSkip(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 3) return true;
  if (/^https?:\/\//.test(trimmed)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+/.test(trimmed)) return true;
  const withoutPlaceholders = trimmed.replace(/\{[^}]+\}/g, "").trim();
  if (withoutPlaceholders.length < 2) return true;
  return false;
}

function localIssues(text: string): string[] {
  const issues: string[] = [];
  if (text.includes("—")) {
    issues.push("Contains an em dash (—). Use a comma, colon, or full stop instead.");
  }
  return issues;
}

function batchEntries(entries: CopyEntry[]): CopyEntry[][] {
  const batches: CopyEntry[][] = [];
  let current: CopyEntry[] = [];
  let size = 0;

  for (const entry of entries) {
    const added = entry.text.length + 2;
    if (current.length > 0 && size + added > BATCH_MAX_CHARS) {
      batches.push(current);
      current = [];
      size = 0;
    }
    current.push(entry);
    size += added;
  }

  if (current.length > 0) batches.push(current);
  return batches;
}

function buildBatch(entries: CopyEntry[]) {
  let text = "";
  const spans: { path: string; start: number; end: number }[] = [];

  for (const entry of entries) {
    if (text) text += "\n\n";
    const start = text.length;
    text += entry.text;
    spans.push({ path: entry.path, start, end: text.length });
  }

  return { text, spans };
}

function findSpan(
  spans: { path: string; start: number; end: number }[],
  offset: number,
) {
  return spans.find((span) => offset >= span.start && offset < span.end);
}

function isInsidePlaceholder(text: string, offset: number): boolean {
  const before = text.slice(0, offset);
  const open = before.lastIndexOf("{");
  const close = before.lastIndexOf("}");
  return open > close;
}

function shouldReportMatch(
  match: LtMatch,
  entry: CopyEntry,
  spanStart: number,
): boolean {
  const relativeOffset = match.offset - spanStart;
  const matched = entry.text.slice(
    relativeOffset,
    relativeOffset + match.length,
  );

  if (!matched.trim()) return false;
  if (isInsidePlaceholder(entry.text, relativeOffset)) return false;
  if (ALLOWLIST.test(matched)) return false;
  if (/REPEAT/i.test(match.rule.id)) return false;
  if (match.message.includes("Oxford spelling")) return false;

  // Mostly-placeholder UI strings (e.g. "CHF {price}").
  if (entry.text.includes("{") && matched.length <= 6) return false;

  return true;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkWithLanguageTool(
  text: string,
  language: string,
): Promise<LtMatch[]> {
  const params = new URLSearchParams({
    text,
    language,
    enabledOnly: "false",
    disabledRules: DISABLED_RULES,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };
  if (LT_KEY) headers.Authorization = `Bearer ${LT_KEY}`;

  const response = await fetch(LT_API, {
    method: "POST",
    headers,
    body: params,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LanguageTool API ${response.status}: ${body}`);
  }

  const data = (await response.json()) as { matches?: LtMatch[] };
  return data.matches ?? [];
}

function snippet(text: string, offset: number, length: number) {
  const start = Math.max(0, offset - 24);
  const end = Math.min(text.length, offset + length + 24);
  const excerpt = text.slice(start, end).replace(/\n/g, " ");
  return `…${excerpt}…`;
}

async function main() {
  const findings: string[] = [];

  for (const locale of LOCALES) {
    const messages = getTranslations(locale.id);
    const entries: CopyEntry[] = [];
    collectStrings(messages, "", entries);

    const checkable = entries.filter((entry) => !shouldSkip(entry.text));

    for (const entry of checkable) {
      for (const issue of localIssues(entry.text)) {
        findings.push(`[${locale.id}] ${entry.path}\n  ${issue}\n  “${entry.text}”`);
      }
    }

    const batches = batchEntries(checkable);

    for (let i = 0; i < batches.length; i++) {
      if (i > 0) await sleep(REQUEST_DELAY_MS);

      const batch = batches[i]!;
      const { text, spans } = buildBatch(batch);
      const matches = await checkWithLanguageTool(text, locale.ltLang);

      for (const match of matches) {
        const span = findSpan(spans, match.offset);
        if (!span) continue;

        const entry = batch.find((e) => e.path === span.path);
        if (!entry) continue;
        if (!shouldReportMatch(match, entry, span.start)) continue;

        const suggestion = match.replacements?.[0]?.value;
        const fix = suggestion ? ` Suggestion: “${suggestion}”` : "";

        findings.push(
          `[${locale.id}] ${span.path}\n  ${match.message}${fix}\n  ${snippet(entry.text, match.offset - span.start, match.length)}`,
        );
      }
    }
  }

  if (findings.length === 0) {
    console.log("check:copy passed (LanguageTool + local rules).");
    return;
  }

  console.error(`check:copy found ${findings.length} issue(s):\n`);
  for (const finding of findings) {
    console.error(`${finding}\n`);
  }
  process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
