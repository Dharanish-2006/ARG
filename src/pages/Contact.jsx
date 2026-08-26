import SEO from "../components/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import EnquiryForm from "../components/forms/EnquiryForm";
import Reveal from "../components/motion/Reveal";

const OFFICES = [
  { city: "Sacramento (Headquarters)", address: "980 9th Street, Suite 1600, Sacramento, CA 95814", phone: "(916) 470-0909" },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Avatar Realty Group. Send an enquiry, call our Sacramento office, or reach broker Sam Tami directly."
        path="/contact"
      />

      <section className="bg-ink text-paper">
        <div className="container-wide py-16 md:py-20">
          <p className="eyebrow text-brass-400 mb-3">Contact</p>
          <h1 className="max-w-xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            Let's talk about your next move.
          </h1>
          <p className="mt-5 max-w-lg text-paper/70">
            Whether you're ready to tour homes this weekend or just testing the market, reach out —
            a licensed agent responds personally, not a call center.
          </p>
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading eyebrow="Reach Us Directly" title="Offices &amp; details" />

            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-edge bg-surface-alt p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,var(--color-emerald-700),var(--color-emerald-950)_75%)] font-display text-lg text-brass-300">
                ST
              </div>
              <div>
                <p className="font-display text-lg text-content">Sam Tami</p>
                <p className="eyebrow text-brass-600">Founding Broker · CA DRE# 01454398</p>
                <a href="tel:+19164700909" className="mt-1 block text-sm text-emerald-700 hover:text-emerald-900">
                  (916) 470-0909
                </a>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {OFFICES.map((o) => (
                <div key={o.city} className="border-l-2 border-brass-500 pl-5">
                  <h3 className="font-display text-lg text-content">{o.city}</h3>
                  <p className="mt-1.5 text-sm text-content-muted">{o.address}</p>
                  <a href={`tel:${o.phone.replace(/[^0-9+]/g, "")}`} className="mt-1 block text-sm text-emerald-700 hover:text-emerald-900">
                    {o.phone}
                  </a>
                </div>
              ))}
              <div className="border-l-2 border-brass-500 pl-5">
                <h3 className="font-display text-lg text-content">General enquiries</h3>
                <a href="mailto:sam@avatarrealtygroup.com" className="mt-1.5 block text-sm text-emerald-700 hover:text-emerald-900">
                  sam@avatarrealtygroup.com
                </a>
                <p className="mt-3 text-sm text-content-muted">Mon–Fri 8:30am–6:30pm · Sat 10am–3pm</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bezel-shell">
            <div className="bezel-core p-6 sm:p-8">
              <EnquiryForm
                title="Send us a message"
                description="Share a few details and the right agent for your area will follow up within one business day."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
