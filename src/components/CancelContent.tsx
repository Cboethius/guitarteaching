"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";

function CancelContentInner() {
  const { t } = useLocale();
  const params = useSearchParams();
  const audience = params.get("audience");
  const product = params.get("product");
  const backHref =
    audience === "regular" || audience === "child"
      ? `/book?audience=${audience}${product ? `&product=${product}` : ""}`
      : "/#pricing";

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-semibold">{t.cancel.title}</h1>
      <p className="text-forest/80 mt-4">{t.cancel.body}</p>
      <Link href={backHref} className="text-forest mt-6 inline-block underline">
        {t.cancel.back}
      </Link>
    </div>
  );
}

export function CancelContent() {
  return (
    <Suspense fallback={null}>
      <CancelContentInner />
    </Suspense>
  );
}
