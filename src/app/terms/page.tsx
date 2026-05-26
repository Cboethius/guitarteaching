export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Terms of service</h1>
      <ul className="text-forest/80 mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed">
        <li>Lessons are booked via this website; payment online (Stripe) or direct TWINT/bank.</li>
        <li>Online prices include a small card-processing fee; direct payment uses the lesson price only.</li>
        <li>10-lesson bundles are valid for 12 months from purchase.</li>
        <li>Home lessons only within ~45 minutes of Zurich by public transport.</li>
        <li>Students do not come to the teacher&apos;s home.</li>
        <li>Children under 14: parent/guardian must book. Age 14+ uses regular pricing.</li>
        <li>Cancellation: please give at least 24 hours notice when possible.</li>
        <li>Questions before booking: contact via WhatsApp (no booking required).</li>
        <li>Direct payments: lesson is confirmed once payment is received.</li>
      </ul>
      <p className="text-forest/60 mt-8 text-xs">
        Template only, not legal advice. Review with a Swiss advisor before launch.
      </p>
    </article>
  );
}
