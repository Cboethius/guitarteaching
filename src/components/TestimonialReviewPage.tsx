"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";

const pageShell = "mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16";
const pageTitle = "text-3xl font-semibold sm:text-4xl";
const pageLead = "text-forest/80 mt-4 text-base leading-relaxed";
const inputClass =
  "mt-1 w-full min-h-11 rounded-lg border border-pastel bg-white px-3 py-2 text-base text-forest";

type ReviewData = {
  quoteDe: string;
  author: string;
  contextDe: string;
  rating: number;
  status: string;
  alreadySubmitted: boolean;
};

function resolveToken(tokenProp?: string, paramToken?: string | string[]) {
  if (tokenProp?.trim()) return tokenProp.trim();
  if (Array.isArray(paramToken)) return paramToken[0]?.trim() ?? "";
  return paramToken?.trim() ?? "";
}

export function TestimonialReviewPage({ token: tokenProp }: { token?: string }) {
  const { token: paramToken } = useParams<{ token: string }>();
  const token = resolveToken(tokenProp, paramToken);
  const { t } = useLocale();
  const tr = t.testimonialReview;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"not_found" | "closed" | "load" | null>(
    null,
  );
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [quoteDe, setQuoteDe] = useState("");
  const [author, setAuthor] = useState("");
  const [contextDe, setContextDe] = useState("");
  const [rating, setRating] = useState(5);
  const [consentName, setConsentName] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("not_found");
      setLoading(false);
      return;
    }

    fetch(`/api/testimonials/review/${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (res.status === 404) {
          setError("not_found");
          return;
        }
        if (res.status === 410) {
          setError("closed");
          return;
        }
        if (!res.ok) {
          setError("load");
          return;
        }
        const data = (await res.json()) as ReviewData;
        setQuoteDe(data.quoteDe);
        setAuthor(data.author);
        setContextDe(data.contextDe);
        setRating(data.rating);
        if (data.alreadySubmitted) setAlreadySubmitted(true);
      })
      .catch(() => setError("load"))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent || submitting) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch(`/api/testimonials/review/${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteDe,
          author,
          contextDe,
          rating,
          consentName,
          consent,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      if (res.status === 409) {
        setAlreadySubmitted(true);
        return;
      }

      setSubmitError(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className={pageShell}>
        <p className="text-forest/70 text-center text-base leading-relaxed">
          {tr.loading}
        </p>
      </div>
    );
  }

  if (error === "not_found") {
    return (
      <div className={pageShell}>
        <h1 className={pageTitle}>{tr.title}</h1>
        <p className={pageLead}>{tr.notFound}</p>
      </div>
    );
  }

  if (error === "closed") {
    return (
      <div className={pageShell}>
        <h1 className={pageTitle}>{tr.title}</h1>
        <p className={pageLead}>{tr.closed}</p>
      </div>
    );
  }

  if (error === "load") {
    return (
      <div className={pageShell}>
        <h1 className={pageTitle}>{tr.title}</h1>
        <p className={pageLead}>{tr.error}</p>
      </div>
    );
  }

  if (submitted || alreadySubmitted) {
    return (
      <div className={pageShell}>
        <h1 className={pageTitle}>{tr.title}</h1>
        <p className={pageLead}>
          {submitted ? tr.thanks : tr.alreadySubmitted}
        </p>
      </div>
    );
  }

  return (
    <div className={pageShell}>
      <h1 className={pageTitle}>{tr.title}</h1>
      <p className={pageLead}>{tr.intro}</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <label className="block text-sm font-medium">
          {tr.quote}
          <textarea
            required
            rows={5}
            value={quoteDe}
            onChange={(e) => setQuoteDe(e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </label>

        <label className="block text-sm font-medium">
          {tr.author}
          <input
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-sm font-medium">
          {tr.context}
          <input
            required
            type="text"
            value={contextDe}
            onChange={(e) => setContextDe(e.target.value)}
            className={inputClass}
          />
        </label>

        <fieldset className="space-y-1">
          <legend className="text-sm font-medium">{tr.rating}</legend>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`min-h-11 min-w-11 rounded-lg border text-lg transition-colors ${
                  rating >= n
                    ? "border-forest bg-pastel-light/50 text-clay"
                    : "border-pastel bg-white text-pastel"
                }`}
                aria-label={`${n}`}
              >
                ★
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-medium">
          {tr.consentName}
          <input
            required
            type="text"
            value={consentName}
            onChange={(e) => setConsentName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <input
            required
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="border-pastel mt-1 h-4 w-4 shrink-0 rounded"
          />
          <span>{tr.consent}</span>
        </label>

        {submitError && (
          <p className="text-sm text-red-700" role="alert">
            {tr.error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !consent}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {submitting ? tr.loading : tr.submit}
        </button>
      </form>
    </div>
  );
}
