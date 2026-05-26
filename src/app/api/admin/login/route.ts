import { NextResponse } from "next/server";
import {
  adminSessionCookieValue,
  ADMIN_COOKIE,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password?.trim() ?? "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "admin_not_configured" },
      { status: 503 },
    );
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  const token = adminSessionCookieValue();
  if (!token) {
    return NextResponse.json({ error: "admin_not_configured" }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
