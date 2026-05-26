export function LegalSection({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs: string[];
}) {
  return (
    <section className="space-y-2">
      {heading && <h2 className="text-forest text-base font-semibold">{heading}</h2>}
      {paragraphs.map((p, i) => (
        <p key={i} className="text-forest/80 leading-relaxed">
          {p}
        </p>
      ))}
    </section>
  );
}
