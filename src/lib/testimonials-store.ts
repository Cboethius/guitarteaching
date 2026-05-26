import { randomBytes, randomUUID } from "crypto";
import { readJsonStore, updateJsonStore } from "./json-store";
import type { Testimonial, TestimonialSeaCreature } from "./testimonials";
import { TESTIMONIAL_SEA_CREATURES } from "./testimonials";

export type TestimonialStatus = "draft" | "pending" | "published" | "rejected";

export type StoredTestimonial = {
  id: string;
  token: string;
  status: TestimonialStatus;
  quoteDe: string;
  quoteEn: string;
  author: string;
  contextDe: string;
  contextEn: string;
  rating: number;
  seaCreature?: TestimonialSeaCreature;
  consentAt?: string;
  consentName?: string;
  submittedAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

const STORE_FILE = "testimonials-submissions.json";
const EMPTY_STORE: StoredTestimonial[] = [];

async function readAll(): Promise<StoredTestimonial[]> {
  return readJsonStore<StoredTestimonial[]>(STORE_FILE, EMPTY_STORE);
}

function seaCreatureForIndex(index: number): TestimonialSeaCreature {
  return TESTIMONIAL_SEA_CREATURES[
    ((index % TESTIMONIAL_SEA_CREATURES.length) +
      TESTIMONIAL_SEA_CREATURES.length) %
      TESTIMONIAL_SEA_CREATURES.length
  ];
}

export function generateReviewToken() {
  return randomBytes(32).toString("base64url");
}

export function toPublicTestimonial(row: StoredTestimonial): Testimonial {
  return {
    id: row.id,
    quoteDe: row.quoteDe,
    quoteEn: row.quoteEn || row.quoteDe,
    author: row.author,
    contextDe: row.contextDe,
    contextEn: row.contextEn || row.contextDe,
    rating: row.rating,
    seaCreature: row.seaCreature,
  };
}

export async function listPublishedTestimonials(): Promise<Testimonial[]> {
  const rows = await readAll();
  return rows
    .filter((r) => r.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.createdAt).getTime() -
        new Date(a.publishedAt ?? a.createdAt).getTime(),
    )
    .map(toPublicTestimonial);
}

export async function listAllTestimonials() {
  const rows = await readAll();
  return rows.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function findByToken(token: string) {
  const rows = await readAll();
  return rows.find((r) => r.token === token) ?? null;
}

export type CreateInviteInput = {
  seaCreature?: TestimonialSeaCreature;
};

export async function createInvite(input: CreateInviteInput = {}) {
  const now = new Date().toISOString();
  const row: StoredTestimonial = {
    id: randomUUID(),
    token: generateReviewToken(),
    status: "draft",
    quoteDe: "",
    quoteEn: "",
    author: "",
    contextDe: "",
    contextEn: "",
    rating: 5,
    seaCreature: input.seaCreature,
    createdAt: now,
    updatedAt: now,
  };

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    rows.push(row);
    return rows;
  });

  return row;
}

/** @deprecated Use createInvite — kept for any legacy rows */
export type CreateDraftInput = {
  quoteDe: string;
  quoteEn?: string;
  author: string;
  contextDe: string;
  contextEn?: string;
  rating?: number;
  seaCreature?: TestimonialSeaCreature;
};

export async function createDraft(input: CreateDraftInput) {
  const now = new Date().toISOString();
  const row: StoredTestimonial = {
    id: randomUUID(),
    token: generateReviewToken(),
    status: "draft",
    quoteDe: input.quoteDe.trim(),
    quoteEn: (input.quoteEn ?? "").trim(),
    author: input.author.trim(),
    contextDe: input.contextDe.trim(),
    contextEn: (input.contextEn ?? "").trim(),
    rating: input.rating ?? 5,
    seaCreature: input.seaCreature,
    createdAt: now,
    updatedAt: now,
  };

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    rows.push(row);
    return rows;
  });

  return row;
}

export type SubmitReviewInput = {
  quoteDe: string;
  author: string;
  contextDe: string;
  rating: number;
  consentName: string;
};

export async function submitReview(
  token: string,
  input: SubmitReviewInput,
): Promise<
  | null
  | { error: "already_finalized"; row: StoredTestimonial }
  | { row: StoredTestimonial }
> {
  let result:
    | null
    | { error: "already_finalized"; row: StoredTestimonial }
    | { row: StoredTestimonial } = null;

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    const idx = rows.findIndex((r) => r.token === token);
    if (idx === -1) {
      result = null;
      return rows;
    }

    const row = rows[idx];
    if (row.status !== "draft") {
      result = { error: "already_finalized", row };
      return rows;
    }

    const now = new Date().toISOString();
    rows[idx] = {
      ...row,
      quoteDe: input.quoteDe.trim(),
      author: input.author.trim(),
      contextDe: input.contextDe.trim(),
      rating: Math.min(5, Math.max(1, Math.round(input.rating))),
      consentName: input.consentName.trim(),
      consentAt: now,
      submittedAt: now,
      status: "pending",
      updatedAt: now,
    };
    result = { row: rows[idx] };
    return rows;
  });

  return result;
}

export async function approveTestimonial(
  id: string,
  quoteEn?: string,
): Promise<
  StoredTestimonial | null | { error: "not_pending"; row: StoredTestimonial }
> {
  let result:
    | null
    | StoredTestimonial
    | { error: "not_pending"; row: StoredTestimonial } = null;

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) {
      result = null;
      return rows;
    }

    const row = rows[idx];
    if (row.status !== "pending") {
      result = { error: "not_pending", row };
      return rows;
    }

    const publishedCount = rows.filter((r) => r.status === "published").length;
    const now = new Date().toISOString();

    rows[idx] = {
      ...row,
      status: "published",
      quoteEn: (quoteEn ?? row.quoteEn).trim() || row.quoteDe,
      contextEn: row.contextEn.trim() || row.contextDe,
      seaCreature: row.seaCreature ?? seaCreatureForIndex(publishedCount),
      publishedAt: now,
      updatedAt: now,
    };
    result = rows[idx];
    return rows;
  });

  return result;
}

export async function rejectTestimonial(id: string) {
  let result: StoredTestimonial | null = null;

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) {
      result = null;
      return rows;
    }

    const now = new Date().toISOString();
    rows[idx] = {
      ...rows[idx],
      status: "rejected",
      updatedAt: now,
    };
    result = rows[idx];
    return rows;
  });

  return result;
}

export async function updateTestimonialSeaCreature(
  id: string,
  seaCreature: TestimonialSeaCreature,
): Promise<
  StoredTestimonial | null | { error: "not_editable"; row: StoredTestimonial }
> {
  let result:
    | null
    | StoredTestimonial
    | { error: "not_editable"; row: StoredTestimonial } = null;

  await updateJsonStore(STORE_FILE, EMPTY_STORE, (rows) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) {
      result = null;
      return rows;
    }

    const row = rows[idx];
    if (row.status !== "pending") {
      result = { error: "not_editable", row };
      return rows;
    }

    const now = new Date().toISOString();
    rows[idx] = {
      ...row,
      seaCreature,
      updatedAt: now,
    };
    result = rows[idx];
    return rows;
  });

  return result;
}
