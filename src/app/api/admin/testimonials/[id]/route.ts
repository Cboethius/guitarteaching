import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isTestimonialSeaCreature } from "@/lib/testimonials";
import {
  deleteTestimonial,
  updateTestimonialReply,
  updateTestimonialSeaCreature,
} from "@/lib/testimonials-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as {
    seaCreature?: string;
    teacherReplyDe?: string;
    teacherReplyEn?: string;
  };

  let result:
    | Awaited<ReturnType<typeof updateTestimonialSeaCreature>>
    | Awaited<ReturnType<typeof updateTestimonialReply>>;

  if (body.seaCreature != null) {
    if (!isTestimonialSeaCreature(body.seaCreature)) {
      return NextResponse.json({ error: "invalid_creature" }, { status: 400 });
    }
    result = await updateTestimonialSeaCreature(id, body.seaCreature);
  } else if (body.teacherReplyDe != null || body.teacherReplyEn != null) {
    result = await updateTestimonialReply(
      id,
      body.teacherReplyDe ?? "",
      body.teacherReplyEn ?? "",
    );
  } else {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

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
