import { readJsonStore, updateJsonStore } from "./json-store";
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
const EMPTY_STORE: Booking[] = [];

async function readBookings(): Promise<Booking[]> {
  return readJsonStore<Booking[]>(STORE_FILE, EMPTY_STORE);
}

export async function saveBooking(booking: Booking) {
  await updateJsonStore(STORE_FILE, EMPTY_STORE, (all) => {
    all.push(booking);
    return all;
  });
}

export async function updateBooking(
  id: string,
  patch: Partial<Booking>,
): Promise<Booking | null> {
  let updated: Booking | null = null;

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (all) => {
    const idx = all.findIndex((b) => b.id === id);
    if (idx === -1) return all;
    all[idx] = { ...all[idx], ...patch };
    updated = all[idx];
    return all;
  });

  return updated;
}

export async function findBooking(id: string) {
  const all = await readBookings();
  return all.find((b) => b.id === id) ?? null;
}
