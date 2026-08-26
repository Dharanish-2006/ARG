import SEO from "../components/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import AbstractPanel from "../components/ui/AbstractPanel";
import Reveal, { RevealGroup, revealItem } from "../components/motion/Reveal";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Sam Tami",
    role: "Founding Broker · CA DRE# 01454398",
    bio: "Leads Avatar Realty Group's Sacramento-region transactions with a hands-on, one-agent-per-file approach.",
  },
];

const VALUES = [
  { t: "Represent, don't just transact", d: "Every recommendation is made as if we were the ones buying or selling." },
  { t: "Say the hard thing early", d: "We'd rather tell you a home is overpriced today than let you find out after close." },
  { t: "Small by design", d: "We cap our active files per agent so response times stay fast and personal." },
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Avatar Realty Group, a Sacramento-region brokerage led by broker Sam Tami, and the values behind how we represent clients."
        path="/about"
      />

      <section className="bg-ink text-paper">
        <div className="container-wide py-16 md:py-20">
          <p className="eyebrow text-brass-400 mb-3">About Avatar Realty Group</p>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            An agent should be your avatar in the room you're not in.
          </h1>
          <p className="mt-6 max-w-xl text-paper/70 leading-relaxed">
            That's the idea broker Sam Tami built the firm around, and it still shapes how every
            file gets handled today — from a first-time buyer's condo to a multi-property portfolio.
          </p>
        </div>
      </section>

      <section className="container-wide py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="bezel-shell">
              <div className="bezel-core">
                <AbstractPanel variant="plan" tone="surface" className="h-[320px] sm:h-[420px]" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our Story" title="One broker, one clear thesis" />
            <p className="mt-6 leading-relaxed text-content-muted">
              Avatar Realty Group is built around a simple frustration with how the industry usually
              works: too many brokerages optimize for closing volume over client outcomes. Sam Tami
              built the opposite — a firm where every agent carries a limited number of active
              clients, has direct access to broker-level pricing data, and is measured on client
              satisfaction as much as transaction count.
            </p>
            <p className="mt-4 leading-relaxed text-content-muted">
              That discipline is still the whole strategy today. The team has grown to cover buyer
              representation, listings, and investment advisory — but the client-to-agent ratio
              hasn't changed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="container-wide py-20 md:py-24">
          <SectionHeading eyebrow="What We Believe" title="The values behind every file" />
          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-3">
            {VALUES.map((v) => (
              <motion.div key={v.t} variants={revealItem} className="border-l-2 border-brass-500 pl-5">
                <h3 className="font-display text-lg text-content">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">{v.d}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="container-wide py-20 md:py-24">
        <SectionHeading eyebrow="Our Team" title="The agent you'll actually work with" align="left" />
        <RevealGroup className="mt-12 max-w-sm">
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={revealItem} className="bezel-shell">
              <div className="bezel-core p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,var(--color-emerald-700),var(--color-emerald-950)_75%)] font-display text-lg text-brass-300">
                  {initials(member.name)}
                </div>
                <h3 className="mt-5 font-display text-lg text-content">{member.name}</h3>
                <p className="eyebrow mt-1 text-brass-600">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-content-muted">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-ink text-paper">
        <div className="container-wide py-16 md:py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-xl text-balance font-display text-3xl sm:text-4xl">
              Ready to work with an agent who represents you, not just the transaction?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" variant="brass" size="lg">Contact Our Team</Button>
              <Button to="/properties" variant="outlineLight" size="lg">Browse Properties</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
