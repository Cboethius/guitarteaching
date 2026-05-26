import { readJsonStore, writeJsonStore } from "./json-store";
import type { Audience, ProductId } from "./pricing";

export type PaymentMethod = "stripe" | "direct";
export type BookingStatus = "pending_payment" | "paid";

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

const STORE_FILE = "bookings.json";

async function readBookings(): Promise<Booking[]> {
  return readJsonStore<Booking[]>(STORE_FILE, []);
}

async function writeBookings(all: Booking[]) {
  await writeJsonStore(STORE_FILE, all);
}

export async function saveBooking(booking: Booking) {
  const all = await readBookings();
  all.push(booking);
  await writeBookings(all);
}

export async function updateBooking(
  id: string,
  patch: Partial<Booking>,
): Promise<Booking | null> {
  const all = await readBookings();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  await writeBookings(all);
  return all[idx];
}

export async function findBooking(id: string) {
  const all = await readBookings();
  return all.find((b) => b.id === id) ?? null;
}
