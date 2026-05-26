import { NextResponse } from "next/server";
import { findByToken, submitReview } from "@/lib/testimonials-store";
import { adminNotifyEmail, sendEmail, siteBaseUrl } from "@/lib/email";

type RouteContext = { params: Promise<{ token: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;
  const row = await findByToken(token);

  if (!row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if (row.status === "rejected" || row.status === "published") {
    return NextResponse.json({ error: "closed", status: row.status }, { status: 410 });
  }

  return NextResponse.json({
    quoteDe: row.quoteDe,
    author: row.author,
    contextDe: row.contextDe,
    rating: row.rating,
    status: row.status,
    alreadySubmitted: row.status === "pending",
  });
}

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;
  const body = (await request.json()) as {
    quoteDe?: string;
    author?: string;
    contextDe?: string;
    rating?: number;
    consentName?: string;
    consent?: boolean;
  };

  if (!body.consent) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }

  if (!body.quoteDe?.trim() || !body.author?.trim() || !body.contextDe?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!body.consentName?.trim()) {
    return NextResponse.json({ error: "consent_name_required" }, { status: 400 });
  }

  const result = await submitReview(token, {
    quoteDe: body.quoteDe,
    author: body.author,
    contextDe: body.contextDe,
    rating: body.rating ?? 5,
    consentName: body.consentName,
  });

  if (!result) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if ("error" in result && result.error === "already_finalized") {
    return NextResponse.json({ error: "already_finalized" }, { status: 409 });
  }

  const row = result.row!;
  const adminUrl = `${siteBaseUrl()}/admin/testimonials`;

  try {
    await sendEmail({
      to: adminNotifyEmail(),
      subject: `Testimonial waiting for approval — ${row.author}`,
      html: `<p><strong>${row.author}</strong> submitted a testimonial for your review.</p>
<p><em>${row.quoteDe.replace(/</g, "&lt;")}</em></p>
<p><a href="${adminUrl}">Open admin to approve</a></p>`,
    });
  } catch (err) {
    console.error("[testimonial] notify email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
