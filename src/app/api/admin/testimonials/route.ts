import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { siteBaseUrl } from "@/lib/email";
import { createInvite, listAllTestimonials } from "@/lib/testimonials-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rows = await listAllTestimonials();
  const base = siteBaseUrl();

  return NextResponse.json({
    testimonials: rows.map((r) => ({
      ...r,
      reviewUrl: `${base}/testimonial/review/${r.token}`,
    })),
  });
}

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const row = await createInvite();
  const reviewUrl = `${siteBaseUrl()}/testimonial/review/${row.token}`;

  return NextResponse.json({ row, reviewUrl });
}
