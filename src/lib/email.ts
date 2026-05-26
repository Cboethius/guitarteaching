import { site } from "./site";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping send:", subject);
    return { ok: false as const, skipped: true };
  }

  const from =
    process.env.RESEND_FROM ?? `${site.name} <onboarding@resend.dev>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[email] Resend error:", res.status, text);
    return { ok: false as const, error: text };
  }

  return { ok: true as const };
}

export function adminNotifyEmail() {
  return process.env.BOOKING_NOTIFY_EMAIL ?? site.email;
}

export function siteBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://guitarteaching.vercel.app"
  );
}
