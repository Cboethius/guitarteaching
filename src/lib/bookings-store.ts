import { promises as fs } from "fs";
import path from "path";
import type { Audience, ProductId } from "./pricing";

export type PaymentMethod = "stripe" | "direct" | "none";
export type BookingStatus = "pending_payment" | "paid" | "confirmed";

export type Booking = {
  id: string;
  createdAt: string;
  audience: Audience;
  productId: ProductId;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  lessonValueChf: number;
  amountChf: number;
  contactName: string;
  email: string;
  phone: string;
  note?: string;
  childName?: string;
  childAge?: number;
  address?: string;
  travelConfirmed?: boolean;
  preferredArea?: string;
  /** 30 or 45 for child bookings */
  lessonDurationMin?: number;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "bookings.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf-8");
  }
}

export async function readBookings(): Promise<Booking[]> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(raw) as Booking[];
}

export async function saveBooking(booking: Booking) {
  const all = await readBookings();
  all.push(booking);
  await fs.writeFile(dataFile, JSON.stringify(all, null, 2), "utf-8");
}

export async function updateBooking(
  id: string,
  patch: Partial<Booking>,
): Promise<Booking | null> {
  const all = await readBookings();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  await fs.writeFile(dataFile, JSON.stringify(all, null, 2), "utf-8");
  return all[idx];
}

export async function findBooking(id: string) {
  const all = await readBookings();
  return all.find((b) => b.id === id) ?? null;
}
