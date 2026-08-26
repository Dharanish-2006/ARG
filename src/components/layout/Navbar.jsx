import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-md border-b border-edge" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="10" fill="#12211d" />
            <path
              d="M32 14 L48 46 H40.5 L37.2 39 H26.8 L23.5 46 H16 Z M32 24.5 L27.6 33.5 H36.4 Z"
              fill="#d3b47c"
            />
          </svg>
          <span className="font-display text-lg leading-tight text-content">
            Avatar Realty
            <span className="block eyebrow text-content-muted -mt-0.5">Group</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative py-1 text-sm tracking-wide transition-colors duration-200 ${
                  isActive ? "text-content font-semibold" : "text-content-muted hover:text-content"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brass-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button to="/contact" variant="outline" size="sm">
            Contact Us
          </Button>
          <Button to="/properties" variant="primary" size="sm">
            View Properties
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-[1.5px] w-5 bg-content transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-content transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-content transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-edge bg-surface md:hidden"
          >
            <div className="container-wide py-6 flex flex-col gap-5">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-base ${isActive ? "text-content font-semibold" : "text-content-muted"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="flex gap-3 pt-2">
                <Button to="/contact" variant="outline" size="sm" className="flex-1">
                  Contact Us
                </Button>
                <Button to="/properties" variant="primary" size="sm" className="flex-1">
                  View Properties
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
