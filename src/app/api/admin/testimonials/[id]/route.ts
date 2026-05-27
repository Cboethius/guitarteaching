import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isTestimonialSeaCreature } from "@/lib/testimonials";
import {
  deleteTestimonial,
  updateTestimonialSeaCreature,
} from "@/lib/testimonials-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { seaCreature?: string };

  if (!body.seaCreature || !isTestimonialSeaCreature(body.seaCreature)) {
    return NextResponse.json({ error: "invalid_creature" }, { status: 400 });
  }

  const result = await updateTestimonialSeaCreature(id, body.seaCreature);

  if (!result) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ row: result });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteTestimonial(id);

  if (!deleted) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
