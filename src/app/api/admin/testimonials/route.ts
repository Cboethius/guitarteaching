import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createInvite, listAllTestimonials } from "@/lib/testimonials-store";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rows = await listAllTestimonials();
  const base = new URL(request.url).origin;

  return NextResponse.json({
    testimonials: rows.map((r) => ({
      ...r,
      reviewUrl: `${base}/testimonial/review/${r.token}`,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const row = await createInvite();
  const reviewUrl = `${new URL(request.url).origin}/testimonial/review/${row.token}`;

  return NextResponse.json({ row, reviewUrl });
}
