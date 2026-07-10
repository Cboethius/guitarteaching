import { primaryMailtoHref, site } from "@/lib/site";

export function ContactEmails({
  className = "flex flex-col gap-1",
  linkClassName = "hover:underline",
  secondaryClassName = "text-forest/70",
}: {
  className?: string;
  linkClassName?: string;
  secondaryClassName?: string;
}) {
  return (
    <div className={className}>
      <a href={primaryMailtoHref()} className={linkClassName}>
        {site.email}
      </a>
      <a
        href={`mailto:${site.emailSecondary}`}
        className={`${linkClassName} ${secondaryClassName}`}
      >
        {site.emailSecondary}
      </a>
    </div>
  );
}
