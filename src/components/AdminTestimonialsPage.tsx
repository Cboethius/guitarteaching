"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SeaCreatureAvatarPicker } from "@/components/SeaCreatureAvatarPicker";
import {
  TestimonialSeaCreatureIcon,
  testimonialSeaCreatureForIndex,
} from "@/components/TestimonialSeaCreatureIcon";
import { useLocale } from "@/lib/i18n/context";
import type { TestimonialSeaCreature } from "@/lib/testimonials";

type AdminRow = {
  id: string;
  status: "draft" | "pending" | "published" | "rejected";
  quoteDe: string;
  quoteEn: string;
  author: string;
  contextDe: string;
  contextEn: string;
  rating: number;
  seaCreature?: TestimonialSeaCreature;
  reviewUrl: string;
  submittedAt?: string;
  publishedAt?: string;
};

export function AdminTestimonialsPage() {
  const { t } = useLocale();
  const ta = t.adminTestimonials;

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newReviewUrl, setNewReviewUrl] = useState<string | null>(null);

  const creatureLabels = useMemo(
    () =>
      ({
        crab: ta.creatureCrab,
        fish: ta.creatureFish,
        octopus: ta.creatureOctopus,
        jellyfish: ta.creatureJellyfish,
        seahorse: ta.creatureSeahorse,
        starfish: ta.creatureStarfish,
      }) satisfies Record<TestimonialSeaCreature, string>,
    [ta],
  );

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        setAuthenticated(false);
        setLoginError(ta.loadError);
        return;
      }
      const data = (await res.json()) as { testimonials: AdminRow[] };
      setRows(data.testimonials);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
      setLoginError(ta.loadError);
    } finally {
      setLoading(false);
    }
  }, [ta.loadError]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.status === 503) {
      setLoginError(ta.notConfigured);
      return;
    }

    if (!res.ok) {
      setLoginError(ta.loginError);
      return;
    }

    setPassword("");
    await loadRows();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setRows([]);
  }

  async function handleCreateLink() {
    setCreating(true);
    setNewReviewUrl(null);

    try {
      const res = await fetch("/api/admin/testimonials", { method: "POST" });

      if (!res.ok) return;

      const data = (await res.json()) as { reviewUrl: string };
      setNewReviewUrl(data.reviewUrl);
      await loadRows();
    } finally {
      setCreating(false);
    }
  }

  async function copyLink(url: string, id: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* ignore */
    }
  }

  async function handleApprove(id: string) {
    await fetch(`/api/admin/testimonials/${id}/approve`, { method: "POST" });
    await loadRows();
  }

  async function handleReject(id: string) {
    await fetch(`/api/admin/testimonials/${id}/reject`, { method: "POST" });
    await loadRows();
  }

  async function handleAvatarChange(
    id: string,
    seaCreature: TestimonialSeaCreature,
  ) {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seaCreature }),
    });
    await loadRows();
  }

  function avatarForRow(row: AdminRow, index: number) {
    return row.seaCreature ?? testimonialSeaCreatureForIndex(index);
  }

  if (authenticated === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-semibold sm:text-4xl">{ta.title}</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <label className="block text-sm font-medium">
            {ta.password}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full min-h-11 rounded-lg border border-pastel bg-white px-3 py-2 text-base text-forest"
              autoComplete="current-password"
            />
          </label>
          {loginError && (
            <p className="text-sm text-red-700" role="alert">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "…" : ta.login}
          </button>
        </form>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-semibold sm:text-4xl">{ta.title}</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <label className="block text-sm font-medium">
            {ta.password}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full min-h-11 rounded-lg border border-pastel bg-white px-3 py-2 text-base text-forest"
              autoComplete="current-password"
            />
          </label>
          {loginError && (
            <p className="text-sm text-red-700" role="alert">
              {loginError}
            </p>
          )}
          <button type="submit" className="btn-primary w-full justify-center">
            {ta.login}
          </button>
        </form>
      </div>
    );
  }

  const openLinks = rows.filter((r) => r.status === "draft");
  const pending = rows.filter((r) => r.status === "pending");
  const published = rows.filter((r) => r.status === "published");
  const rejected = rows.filter((r) => r.status === "rejected");

  function RowCard({
    row,
    rowIndex,
    actions,
  }: {
    row: AdminRow;
    rowIndex: number;
    actions?: React.ReactNode;
  }) {
    const avatar = avatarForRow(row, rowIndex);
    const awaitingStudent = row.status === "draft";

    return (
      <li className="border-pastel rounded-xl border bg-white p-4">
        {awaitingStudent ? (
          <p className="text-forest/80 text-sm leading-relaxed">
            {ta.notSubmittedYet}
          </p>
        ) : (
          <div className="flex items-start gap-3">
            <div className="border-forest/20 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-cream">
              <TestimonialSeaCreatureIcon creature={avatar} className="h-8 w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold">{row.author}</p>
                <span className="text-forest/60 text-xs">{row.rating}★</span>
              </div>
              <p className="text-forest/80 mt-2 text-sm leading-relaxed">
                {row.quoteDe}
              </p>
              <p className="text-forest/60 mt-2 text-xs leading-snug">
                {row.contextDe}
              </p>
            </div>
          </div>
        )}

        {row.status === "pending" && (
          <div className="mt-3">
            <SeaCreatureAvatarPicker
              legend={ta.avatar}
              hint={ta.avatarHint}
              labels={creatureLabels}
              value={avatar}
              onChange={(creature) => handleAvatarChange(row.id, creature)}
            />
          </div>
        )}

        {awaitingStudent && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              readOnly
              value={row.reviewUrl}
              className="border-pastel min-h-9 flex-1 rounded-lg border bg-cream px-2 text-xs"
            />
            <button
              type="button"
              onClick={() => copyLink(row.reviewUrl, row.id)}
              className="border-forest text-forest hover:bg-pastel-light/60 min-h-9 rounded-full border px-4 text-sm font-medium"
            >
              {copiedId === row.id ? ta.copied : ta.copyLink}
            </button>
          </div>
        )}
        {actions && <div className="mt-4">{actions}</div>}
      </li>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">{ta.title}</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="text-forest/70 hover:text-forest text-sm underline"
        >
          {ta.logout}
        </button>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">{ta.newLink}</h2>
        <p className="text-forest/70 mt-2 text-sm leading-relaxed">
          {ta.newLinkHint}
        </p>
        <button
          type="button"
          onClick={handleCreateLink}
          disabled={creating}
          className="btn-primary mt-4 justify-center disabled:opacity-60"
        >
          {creating ? "…" : ta.createLink}
        </button>

        {newReviewUrl && (
          <div className="border-forest/30 bg-pastel-light/40 mt-6 rounded-xl border p-4">
            <p className="text-sm font-medium">{ta.reviewLink}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                readOnly
                value={newReviewUrl}
                className="border-pastel min-h-9 flex-1 rounded-lg border bg-white px-2 text-xs"
              />
              <button
                type="button"
                onClick={() => copyLink(newReviewUrl, "new")}
                className="border-forest text-forest hover:bg-pastel-light/60 min-h-9 rounded-full border px-4 text-sm font-medium"
              >
                {copiedId === "new" ? ta.copied : ta.copyLink}
              </button>
            </div>
          </div>
        )}
      </section>

      {loading && (
        <p className="text-forest/60 mt-12 text-sm leading-relaxed">…</p>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-semibold">{ta.pending}</h2>
        {pending.length === 0 ? (
          <p className="text-forest/60 mt-3 text-sm leading-relaxed">{ta.empty}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pending.map((row, i) => (
              <RowCard
                key={row.id}
                row={row}
                rowIndex={i}
                actions={
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(row.id)}
                      className="btn-primary text-sm"
                    >
                      {ta.approve}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(row.id)}
                      className="border-forest/40 text-forest hover:bg-pastel-light/40 rounded-full border px-4 py-2 text-sm"
                    >
                      {ta.reject}
                    </button>
                  </div>
                }
              />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">{ta.openLinks}</h2>
        {openLinks.length === 0 ? (
          <p className="text-forest/60 mt-3 text-sm leading-relaxed">{ta.empty}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {openLinks.map((row, i) => (
              <RowCard key={row.id} row={row} rowIndex={i} />
            ))}
          </ul>
        )}
      </section>

      {published.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">{ta.published}</h2>
          <ul className="mt-4 space-y-3">
            {published.map((row, i) => (
              <RowCard key={row.id} row={row} rowIndex={i} />
            ))}
          </ul>
        </section>
      )}

      {rejected.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">{ta.rejected}</h2>
          <ul className="mt-4 space-y-3">
            {rejected.map((row, i) => (
              <RowCard key={row.id} row={row} rowIndex={i} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
