import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { approveTestimonial } from "@/lib/testimonials-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let quoteEn: string | undefined;
  try {
    const body = (await request.json()) as { quoteEn?: string };
    quoteEn = body.quoteEn;
  } catch {
    quoteEn = undefined;
  }
  const result = await approveTestimonial(id, quoteEn);

  if (!result) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ row: result });
}
