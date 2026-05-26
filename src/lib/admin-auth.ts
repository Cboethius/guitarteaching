import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "axe_admin_session";

function adminToken(password: string) {
  return createHmac("sha256", password).update("axe-school-admin").digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const a = Buffer.from(adminToken(password));
  const b = Buffer.from(adminToken(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const expected = adminToken(password);
  try {
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function adminSessionCookieValue() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return adminToken(password);
}
