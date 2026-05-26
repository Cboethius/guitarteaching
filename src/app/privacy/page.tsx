export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Privacy Policy (Datenschutz)</h1>
      <div className="text-forest/80 mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          <strong>Controller:</strong> Christian Boethius, Birmensdorferstrasse 430,
          8055 Zürich, Switzerland. Email: Christian@boethius.ch
        </p>
        <p>
          We process personal data when you book lessons: name, email, phone,
          and (for children) child name and age. For home lessons we process
          your address. Payment data is handled by Stripe; we do not store card
          numbers.
        </p>
        <p>
          <strong>Purpose:</strong> booking, scheduling, invoicing, and
          communication about lessons.
        </p>
        <p>
          <strong>Recipients:</strong> hosting (Vercel), email provider, Stripe,
          and WhatsApp if you contact us there.
        </p>
        <p>
          <strong>Retention:</strong> booking records are kept as required for
          accounting and tax (typically several years in Switzerland).
        </p>
        <p>
          <strong>Your rights:</strong> access, correction, deletion, and
          complaint to the Federal Data Protection Commissioner (FDPIC).
        </p>
        <p className="text-forest/60 text-xs">
          Template only, not legal advice. Have this reviewed for revDSG
          compliance before launch.
        </p>
      </div>
    </article>
  );
}
