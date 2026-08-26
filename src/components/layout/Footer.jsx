import { Link } from "react-router-dom";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-wide py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
              <rect width="64" height="64" rx="10" fill="#f4f1e6" />
              <path
                d="M32 14 L48 46 H40.5 L37.2 39 H26.8 L23.5 46 H16 Z M32 24.5 L27.6 33.5 H36.4 Z"
                fill="#12211d"
              />
            </svg>
            <span className="font-display text-lg">Avatar Realty Group</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paper/60 max-w-xs">
            A boutique brokerage representing buyers, sellers, and investors across the Sacramento
            region with precision, patience, and a straight answer every time.
          </p>
          <div className="mt-6 flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="eyebrow text-paper/60 hover:text-brass-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-brass-400 mb-4">Navigate</p>
          <ul className="space-y-3 text-sm text-paper/75">
            <li><Link to="/" className="hover:text-paper">Home</Link></li>
            <li><Link to="/properties" className="hover:text-paper">Properties</Link></li>
            <li><Link to="/about" className="hover:text-paper">About</Link></li>
            <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-brass-400 mb-4">Services</p>
          <ul className="space-y-3 text-sm text-paper/75">
            <li>Buyer Representation</li>
            <li>Listing &amp; Selling</li>
            <li>Investment Advisory</li>
            <li>Relocation Support</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-brass-400 mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-paper/75">
            <li>Sam Tami, Founding Broker</li>
            <li>
              <a href="tel:+19164700909" className="hover:text-paper">(916) 470-0909</a>
            </li>
            <li>
              <a href="mailto:sam@avatarrealtygroup.com" className="hover:text-paper">
                sam@avatarrealtygroup.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} Avatar Realty Group. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/admin/login" className="hover:text-paper/80">Agent &amp; Admin Login</Link>
            <span>CA DRE# 01454398</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
