import { site } from "@/lib/site";

export default function ImpressumPage() {
  return (
    <article className="prose-forest mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Impressum</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          <strong>{site.teacher}</strong>
          <br />
          {site.address}
          <br />
          Switzerland
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          <br />
          Phone:{" "}
          <a href={`tel:${site.phoneTel}`} className="underline">
            {site.phone}
          </a>
        </p>
        <p className="text-forest/70 text-xs">
          Placeholder impressum, please review with a Swiss legal advisor before
          going live.
        </p>
      </div>
    </article>
  );
}
