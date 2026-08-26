import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import PropertyCard from "../components/property/PropertyCard";
import PropertyCarousel from "../components/property/PropertyCarousel";
import EnquiryForm from "../components/forms/EnquiryForm";
import AbstractPanel from "../components/ui/AbstractPanel";
import InteractiveField from "../components/motion/InteractiveField";
import HeroCarousel from "../components/motion/HeroCarousel";
import Reveal, { RevealGroup, revealItem } from "../components/motion/Reveal";
import { useProperties } from "../context/PropertyContext";

const HERO_SLIDES = [
  { variant: "skyline", tone: "emerald", eyebrow: "Represented With Care", caption: "Every listing, one agent" },
  { variant: "plan", tone: "brass", eyebrow: "Precision, Not Guesswork", caption: "Priced against real comps" },
  { variant: "keys", tone: "surface", eyebrow: "Ready For Your Keys", caption: "From offer to closing table" },
];

const SERVICES = [
  {
    title: "Buyer Representation",
    copy: "We narrow a wide market down to the handful of homes worth your Saturday, then negotiate the terms that protect you.",
  },
  {
    title: "Listing & Selling",
    copy: "Pricing strategy, staging direction, and a marketing plan built around how today's buyers actually search.",
  },
  {
    title: "Investment Advisory",
    copy: "Rental yield, resale trajectory, and neighborhood trend data before you commit capital — not after.",
  },
  {
    title: "Relocation Support",
    copy: "Moving from out of state or overseas? We coordinate timelines, virtual tours, and closing logistics end to end.",
  },
];

const TRUST_POINTS = [
  { stat: "412", label: "Homes closed since 2016" },
  { stat: "19 days", label: "Median days on market" },
  { stat: "98%", label: "List-to-sale price ratio" },
  { stat: "4.9/5", label: "Average client rating" },
];

const LOCATIONS = [
  { name: "Sacramento", copy: "Downtown lofts to midtown bungalows", variant: "skyline", tone: "emerald" },
  { name: "Roseville", copy: "Family-focused suburban neighborhoods", variant: "plan", tone: "surface" },
  { name: "Folsom", copy: "Lakeside and master-planned living", variant: "keys", tone: "brass" },
  { name: "Elk Grove", copy: "Acreage, land, and new builds", variant: "plan", tone: "emerald" },
];

const NEW_DEVELOPMENT_POINTS = ["Vetted Builders", "High-Growth Corridors", "Direct Developer Access"];

export default function Home() {
  const { properties, loading } = useProperties();
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const spotlight = (featured.length ? featured : properties).slice(0, 6);

  return (
    <>
      <SEO
        title="Boutique Real Estate Brokerage in the Sacramento Region"
        description="Avatar Realty Group helps buyers, sellers, and investors move with confidence across the Sacramento region. Browse curated listings and work with agents who represent your interests."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <InteractiveField className="opacity-90" />
        <div className="container-wide relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="eyebrow mb-5 text-brass-400"
            >
              Sacramento · Roseville · Folsom · Elk Grove
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-balance font-display text-[2.6rem] leading-[1.08] sm:text-6xl md:text-[3.6rem]"
            >
              Every property has a story.
              <span className="block text-brass-300">We make sure it's told well.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-paper/70"
            >
              Avatar Realty Group represents buyers, sellers, and investors across the Sacramento
              region —
              pairing hands-on local expertise with a marketing standard built for how homes are
              actually discovered today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button to="/properties" variant="brass" size="lg">
                View Properties
              </Button>
              <Button to="/contact" variant="outlineLight" size="lg">
                Talk to an Agent
              </Button>
            </motion.div>
            <RevealGroup className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {TRUST_POINTS.map((t) => (
                <motion.div key={t.label} variants={revealItem}>
                  <p className="font-mono text-2xl text-brass-300">{t.stat}</p>
                  <p className="mt-1 text-xs leading-snug text-paper/55">{t.label}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="bezel-shell border-paper/10">
              <div className="bezel-core">
                <HeroCarousel slides={HERO_SLIDES} className="h-[420px] sm:h-[540px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="container-wide py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Current Listings"
            title="Featured properties"
            description="A rotating selection of the homes we're most excited to show right now."
          />
          <Button to="/properties" variant="outline" size="md">
            View all properties
          </Button>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bezel-shell animate-pulse">
                <div className="bezel-core">
                  <div className="aspect-[4/3] bg-surface-alt" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 rounded bg-surface-alt" />
                    <div className="h-3 w-1/2 rounded bg-surface-alt" />
                    <div className="h-4 w-full rounded bg-surface-alt" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : spotlight.length === 0 ? (
          <EmptyListingsNotice />
        ) : (
          <div className="mt-12">
            <PropertyCarousel>
              {spotlight.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </PropertyCarousel>
          </div>
        )}
      </section>

      {/* Sellers & Buyers — how we work with each side of a transaction */}
      <section className="bg-surface-alt">
        <div className="container-wide grid gap-10 py-20 md:py-24 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-edge bg-surface-raised p-8 sm:p-10">
            <span className="eyebrow text-brass-600">Sellers</span>
            <h3 className="mt-3 font-display text-2xl text-content">Selling your home</h3>
            <p className="mt-4 leading-relaxed text-content-muted">
              We help you sell while positioning your home to attract serious, qualified buyers —
              not just traffic. That means a pricing strategy grounded in real comps, staging
              guidance that photographs well, and an agent who screens offers so you're not fielding
              lowball inquiries alone. We coordinate the paperwork, inspections, and title work end
              to end, so your exit is smooth and priced to reflect what the home is actually worth.
            </p>
            <Button to="/contact" variant="outline" className="mt-6">
              Talk about selling
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-edge bg-surface-raised p-8 sm:p-10">
            <span className="eyebrow text-brass-600">Buyers</span>
            <h3 className="mt-3 font-display text-2xl text-content">Finding your next property</h3>
            <p className="mt-4 leading-relaxed text-content-muted">
              We narrow a broad market down to the homes that actually fit — location, price range,
              financing position, and timeline — instead of sending you a mailing-list-sized feed of
              listings. If anything about how we work could serve you better, tell us directly; we're
              always refining the process for the buyers and sellers we represent.
            </p>
            <Button to="/properties" variant="outline" className="mt-6">
              Start browsing
            </Button>
          </Reveal>
        </div>
      </section>

      {/* New Developments */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="New Developments"
              title="Explore pre-construction & builder opportunities"
              description="From townhome communities to custom hilltop lots, we track new developments across the Sacramento region so you see opportunities before they're widely listed."
            />
            <ul className="mt-6 flex flex-wrap gap-3">
              {NEW_DEVELOPMENT_POINTS.map((point) => (
                <li key={point} className="eyebrow rounded-full border border-brass-500/40 bg-brass-200/40 px-4 py-2 text-brass-600">
                  {point}
                </li>
              ))}
            </ul>
            <Button to="/contact" variant="primary" className="mt-8">
              Ask about new builds
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-edge">
            <AbstractPanel variant="plan" tone="brass" className="h-[320px] rounded-2xl sm:h-[380px]" />
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="bg-ink text-paper">
        <div className="container-wide grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="bezel-shell border-paper/10">
              <div className="bezel-core">
                <AbstractPanel variant="plan" tone="surface" className="h-[320px] sm:h-[420px]" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="About Avatar Realty Group"
              title="Representation, in the fullest sense of the word."
              light
            />
            <p className="mt-6 max-w-xl leading-relaxed text-paper/70">
              Founded in 2016, Avatar Realty Group was built on a simple idea: a real estate agent
              should act as your avatar in the transaction — presenting your interests, your
              timeline, and your budget as if they were their own. Today our small team of agents
              works across the Sacramento region, split evenly between buyer and seller representation, and
              deliberately kept small enough that every client speaks directly with the agent
              handling their file.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about" variant="brass">
                Meet the team
              </Button>
              <Button to="/contact" variant="outlineLight">
                Start a conversation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services — asymmetric bento, not a flat 4-up grid */}
      <section className="container-wide py-20 md:py-28">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-service representation, from search to signature"
          align="left"
        />
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={revealItem}
              className={`bezel-shell transition-transform duration-300 hover:-translate-y-1 ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="bezel-core p-8">
                <span className="eyebrow text-brass-600">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-content">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-content-muted">{s.copy}</p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* Why choose us */}
      <section className="bg-surface-alt">
        <div className="container-wide py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A brokerage built around one client at a time"
              description="No call centers, no rotating agents, no listings passed between teams. The person you meet at the first showing is the person who negotiates your closing."
            />
            <RevealGroup className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  t: "Local, not regional",
                  d: "Every agent lives and works in the neighborhoods they represent — not a franchise territory.",
                },
                {
                  t: "Transparent pricing data",
                  d: "You'll see the same comps and market analysis we use internally, before you make an offer.",
                },
                {
                  t: "Responsive by default",
                  d: "A same-day response standard on calls, texts, and showing requests — evenings included.",
                },
                {
                  t: "Licensed & accountable",
                  d: "California-licensed brokers held to fiduciary standards, with every file reviewed before closing.",
                },
              ].map((item) => (
                <motion.div key={item.t} variants={revealItem} className="border-l-2 border-brass-500 pl-5">
                  <h3 className="font-display text-base text-content">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted">{item.d}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="container-wide py-20 md:py-28">
        <SectionHeading eyebrow="Where We Work" title="Property categories & locations we know best" />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc) => (
            <motion.div key={loc.name} variants={revealItem}>
              <Link
                to={`/properties?city=${encodeURIComponent(loc.name)}`}
                className="corner-frame group relative block overflow-hidden rounded-2xl"
              >
                <AbstractPanel variant={loc.variant} tone={loc.tone} animated={false} className="h-64" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-300 group-hover:from-ink/95" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-xl text-paper">{loc.name}</h3>
                  <p className="mt-1 text-xs text-paper/70">{loc.copy}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* Contact / enquiry */}
      <section className="bg-ink text-paper">
        <div className="container-wide grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Have a property in mind, or just starting to look?"
              description="Tell us what you're after — a neighborhood, a budget, a timeline — and we'll follow up with homes that actually fit, not a mailing list."
              light
            />
          </Reveal>
          <Reveal delay={0.1} className="bezel-shell border-paper/10">
            <div className="bezel-core p-6 sm:p-8">
              <EnquiryForm compact />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function EmptyListingsNotice() {
  return (
    <div className="mt-12 border border-dashed border-edge bg-surface-alt/60 px-8 py-16 text-center">
      <p className="font-display text-xl text-content">No listings published yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-content-muted">
        Once properties are added through the admin panel, they'll appear here automatically.
      </p>
    </div>
  );
}
