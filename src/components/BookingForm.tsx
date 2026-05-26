"use client";

import { ContactHint } from "@/components/ContactHint";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  buildProductId,
  bundleSizeFromProductId,
  childLessonDurations,
  formatFromProductId,
  formatProductDuration,
  getProduct,
  lessonFormats,
  lessonKindFromProduct,
  productHasFlexibleDuration,
  resolveProductId,
  type Audience,
  type BundleSize,
  type ChildLessonDuration,
  type LessonFormat,
  type LessonKind,
  type ProductId,
} from "@/lib/pricing";
import { useLocale } from "@/lib/i18n/context";
import { productName } from "@/lib/i18n/translations";
import { childMaxAge } from "@/lib/site";

const inputClass =
  "mt-1 w-full min-h-11 rounded-lg border border-pastel bg-white px-3 py-2 text-base text-forest";

function parseAudience(param: string | null): Audience | null {
  if (param === "regular" || param === "child") return param;
  return null;
}

function choiceCardClass(selected: boolean) {
  return `cursor-pointer rounded-xl border p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
    selected
      ? "border-forest bg-pastel-light/50"
      : "border-pastel bg-white hover:border-forest/40"
  }`;
}

const choiceGridTwo = "mt-3 grid gap-3 sm:grid-cols-2";
const choiceGridThree = "mt-3 grid gap-3 md:grid-cols-3";
const fieldLegend = "text-lg font-semibold";

export function BookingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { locale, t } = useLocale();

  const audience = parseAudience(params.get("audience"));
  const initialProductId: ProductId = audience
    ? resolveProductId(audience, params.get("product"))
    : "zoom";
  const initialProduct = audience ? getProduct(audience, initialProductId) : null;

  const [lessonKind, setLessonKind] = useState<LessonKind>(() =>
    initialProduct ? lessonKindFromProduct(initialProduct) : "trial",
  );
  const [lessonFormat, setLessonFormat] = useState<LessonFormat>(() =>
    formatFromProductId(initialProductId),
  );
  const [bundleSize, setBundleSize] = useState<BundleSize>(() =>
    bundleSizeFromProductId(initialProductId),
  );
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "direct">(
    "stripe",
  );
  const [lessonDurationMin, setLessonDurationMin] =
    useState<ChildLessonDuration>(audience === "child" ? 30 : 45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productId = useMemo(
    () =>
      audience
        ? buildProductId(
            lessonFormat,
            lessonKind,
            lessonKind === "bundle" ? bundleSize : 5,
          )
        : "zoom",
    [audience, lessonFormat, lessonKind, bundleSize],
  );

  const product = useMemo(() => {
    if (!audience) return null;
    return getProduct(audience, productId);
  }, [audience, productId]);

  if (!audience) {
    return (
      <div className="border-pastel rounded-xl border bg-white p-6 text-center">
        <p className="font-medium">{t.book.audienceRequired}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/book?audience=regular" className="btn-primary min-w-[11rem] justify-center">
            {t.pricing.ctaRegular}
          </Link>
          <Link
            href="/book?audience=child"
            className="border-forest text-forest hover:bg-pastel-light/60 inline-flex min-h-12 min-w-[11rem] items-center justify-center rounded-full border-2 px-6 font-semibold"
          >
            {t.pricing.ctaChild}
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const selectedProduct = product;

  const showChildDuration =
    audience === "child" && productHasFlexibleDuration(selectedProduct);
  const durationLabel = showChildDuration
    ? formatProductDuration(locale, selectedProduct, lessonDurationMin)
    : formatProductDuration(locale, selectedProduct);
  const displayName = productName(locale, selectedProduct.nameDe, selectedProduct.nameEn);
  const otherAudience = audience === "regular" ? "child" : "regular";

  function selectKind(kind: LessonKind) {
    setLessonKind(kind);
    const id = buildProductId(
      lessonFormat,
      kind,
      kind === "bundle" ? bundleSize : 5,
    );
    const p = getProduct(audience!, id);
    if (!productHasFlexibleDuration(p)) {
      setLessonDurationMin(p.durationMin as ChildLessonDuration);
    }
  }

  function selectFormat(format: LessonFormat) {
    setLessonFormat(format);
    const id = buildProductId(
      format,
      lessonKind,
      lessonKind === "bundle" ? bundleSize : 5,
    );
    const p = getProduct(audience!, id);
    if (!productHasFlexibleDuration(p)) {
      setLessonDurationMin(p.durationMin as ChildLessonDuration);
    }
  }

  function selectBundleSize(size: BundleSize) {
    setBundleSize(size);
    const id = buildProductId(lessonFormat, "bundle", size);
    const p = getProduct(audience!, id);
    if (!productHasFlexibleDuration(p)) {
      setLessonDurationMin(p.durationMin as ChildLessonDuration);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      audience,
      productId,
      paymentMethod,
      contactName: String(fd.get("contactName")),
      email: String(fd.get("email")),
      phone: String(fd.get("phone")),
      note: String(fd.get("note") || ""),
      childName: String(fd.get("childName") || ""),
      childAge: fd.get("childAge") ? Number(fd.get("childAge")) : undefined,
      address: String(fd.get("address") || ""),
      preferredArea: String(fd.get("preferredArea") || ""),
      travelConfirmed: fd.get("travelConfirmed") === "on",
      parentConsent: fd.get("parentConsent") === "on",
      legalAccepted: fd.get("legalAccepted") === "on",
      lessonDurationMin:
        audience === "child" && productHasFlexibleDuration(selectedProduct)
          ? lessonDurationMin
          : selectedProduct.durationMin,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t.book.errorGeneric);
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      router.push(`/success?booking=${data.bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.book.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <ContactHint variant="boxed" />

      <p className="text-forest/70 text-sm">
        {t.book.wrongAgeGroup}{" "}
        <Link
          href={`/book?audience=${otherAudience}`}
          className="text-forest font-medium underline"
        >
          {otherAudience === "regular" ? t.book.regular : t.book.child}
        </Link>
      </p>

      <fieldset>
        <legend className={fieldLegend}>{t.book.lessonKind}</legend>
        <div className={choiceGridTwo}>
          <KindOption
            selected={lessonKind === "trial"}
            title={t.book.trialLesson}
            hint={t.book.trialHint}
            onSelect={() => selectKind("trial")}
          />
          <KindOption
            selected={lessonKind === "bundle"}
            title={t.book.bundle}
            hint={t.book.bundleHint}
            onSelect={() => selectKind("bundle")}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className={fieldLegend}>{t.book.chooseFormat}</legend>
        <div className={choiceGridThree}>
          {lessonFormats.map((format) => {
            const p = getProduct(
              audience,
              buildProductId(
                format,
                lessonKind,
                lessonKind === "bundle" ? bundleSize : 5,
              ),
            );
            const duration = formatProductDuration(locale, p);
            return (
              <FormatOption
                key={format}
                selected={lessonFormat === format}
                title={formatTitle(locale, t, format)}
                subtitle={duration}
                onSelect={() => selectFormat(format)}
              />
            );
          })}
        </div>
      </fieldset>

      {lessonKind === "bundle" && (
        <fieldset>
          <legend className={fieldLegend}>{t.book.bundleSize}</legend>
          <div className={choiceGridTwo}>
            {([5, 10] as const).map((size) => {
              const p = getProduct(audience, buildProductId(lessonFormat, "bundle", size));
              const perLesson =
                p.perLessonChf != null && p.bundleLessons != null
                  ? t.pricing.bundleLine
                      .replace("{count}", String(p.bundleLessons))
                      .replace("{price}", String(p.perLessonChf))
                  : null;
              return (
                <BundleSizeOption
                  key={size}
                  selected={bundleSize === size}
                  title={size === 5 ? t.book.bundle5 : t.book.bundle10}
                  subtitle={
                    perLesson
                      ? `${perLesson} · ${t.book.bundleTotal.replace("{amount}", String(p.lessonValueChf))}`
                      : undefined
                  }
                  onSelect={() => selectBundleSize(size)}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="border-pastel rounded-xl border bg-pastel-light/30 px-4 py-3">
        <p className="text-sm font-medium">{t.book.selectionSummary}</p>
        <p className="text-forest/80 mt-1 text-sm">
          {displayName}
          {(showChildDuration || !selectedProduct.isBundle) && ` · ${durationLabel}`}
        </p>
      </div>

      <fieldset>
        <legend className={fieldLegend}>{t.book.payment}</legend>
        <p className="text-forest/70 mt-2 text-sm">{t.book.paymentHint}</p>
        <div className="mt-3 grid gap-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-pastel bg-white p-4">
            <input
              type="radio"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            />
            <span>
              {t.book.payOnline}, <strong>{selectedProduct.stripePriceChf} CHF</strong>
              <span className="text-forest/60 block text-xs">
                {t.book.inclFee}
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-pastel bg-white p-4">
            <input
              type="radio"
              checked={paymentMethod === "direct"}
              onChange={() => setPaymentMethod("direct")}
            />
            <span>
              {t.book.payDirect}, <strong>{selectedProduct.lessonValueChf} CHF</strong>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium">{t.book.fullName}</span>
          <input name="contactName" required className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">{t.book.email}</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">{t.book.phone}</span>
          <input name="phone" type="tel" required className={inputClass} />
        </label>

        {audience === "child" && (
          <>
            <label className="block">
              <span className="text-sm font-medium">{t.book.childName}</span>
              <input name="childName" required className={inputClass} />
            </label>
            <label className="block">
              <span className="text-sm font-medium">{t.book.childAge}</span>
              <input
                name="childAge"
                type="number"
                min={1}
                max={childMaxAge}
                required
                className={inputClass}
              />
            </label>
            {showChildDuration && (
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-medium">{t.book.lessonDuration}</legend>
                <p className="text-forest/60 mt-1 text-xs">
                  {t.pricing.childDurationNote}
                </p>
                <div className={choiceGridTwo}>
                  {childLessonDurations.map((mins) => (
                    <label
                      key={mins}
                      className={`${choiceCardClass(lessonDurationMin === mins)} flex items-center gap-3`}
                    >
                      <input
                        type="radio"
                        name="lessonDurationMin"
                        value={mins}
                        checked={lessonDurationMin === mins}
                        onChange={() => setLessonDurationMin(mins)}
                        required
                      />
                      <span>
                        {mins === 30 ? t.book.duration30 : t.book.duration45}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <label className="flex items-start gap-2 sm:col-span-2">
              <input name="parentConsent" type="checkbox" required className="mt-1" />
              <span className="text-sm">{t.book.parentConsent}</span>
            </label>
          </>
        )}

        {selectedProduct.format === "neutral" && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium">{t.book.area}</span>
            <input name="preferredArea" className={inputClass} />
          </label>
        )}

        {selectedProduct.format === "home" && (
          <>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">{t.book.address}</span>
              <input name="address" required className={inputClass} />
            </label>
            <label className="flex items-start gap-2 sm:col-span-2">
              <input name="travelConfirmed" type="checkbox" required className="mt-1" />
              <span className="text-sm">{t.book.travelConfirm}</span>
            </label>
          </>
        )}

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium">{t.book.note}</span>
          <textarea name="note" rows={3} className={inputClass} />
        </label>
      </div>

      <label className="flex items-start gap-2">
        <input name="legalAccepted" type="checkbox" required className="mt-1" />
        <span className="text-sm">
          {locale === "de" ? (
            <>
              Ich akzeptiere die{" "}
              <a href="/privacy" className="underline">
                {t.book.privacy}
              </a>{" "}
              und die{" "}
              <a href="/terms" className="underline">
                {t.book.terms}
              </a>
              .
            </>
          ) : (
            <>
              I accept the{" "}
              <a href="/privacy" className="underline">
                {t.book.privacy}
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline">
                {t.book.terms}
              </a>
              .
            </>
          )}
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-forest hover:bg-forest/90 min-h-12 w-full rounded-full px-6 py-3 text-base font-semibold text-cream disabled:opacity-60 sm:w-auto"
      >
        {loading
          ? t.book.wait
          : paymentMethod === "stripe"
            ? t.book.submitPay
            : t.book.submitBook}
      </button>
    </form>
  );
}

function formatTitle(
  locale: "de" | "en",
  t: ReturnType<typeof import("@/lib/i18n/translations").getTranslations>,
  format: LessonFormat,
) {
  const key = { zoom: "zoomTitle", neutral: "neutralTitle", home: "homeTitle" }[
    format
  ] as "zoomTitle" | "neutralTitle" | "homeTitle";
  return t.pricing[key];
}

function KindOption({
  selected,
  title,
  hint,
  onSelect,
}: {
  selected: boolean;
  title: string;
  hint: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={choiceCardClass(selected)}
    >
      <span className="block font-medium">{title}</span>
      <span className="text-forest/70 mt-1 block text-sm">{hint}</span>
    </button>
  );
}

function FormatOption({
  selected,
  title,
  subtitle,
  onSelect,
}: {
  selected: boolean;
  title: string;
  subtitle: string;
  onSelect: () => void;
}) {
  return (
    <label className={choiceCardClass(selected)}>
      <input
        type="radio"
        name="lessonFormat"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <span className="block font-medium">{title}</span>
      <span className="text-forest/70 mt-1 block text-sm">{subtitle}</span>
    </label>
  );
}

function BundleSizeOption({
  selected,
  title,
  subtitle,
  onSelect,
}: {
  selected: boolean;
  title: string;
  subtitle?: string;
  onSelect: () => void;
}) {
  return (
    <label className={choiceCardClass(selected)}>
      <input
        type="radio"
        name="bundleSize"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <span className="block font-medium">{title}</span>
      {subtitle && (
        <span className="text-forest/70 mt-1 block text-sm">{subtitle}</span>
      )}
    </label>
  );
}
