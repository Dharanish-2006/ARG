import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, formatLocation } from "../../data/properties";
import StatusTag from "../ui/StatusTag";
import { useFavorite } from "../../lib/useFavorite";

function referenceCode(id) {
  return `REF-${String(id).replace(/-/g, "").slice(-6).toUpperCase()}`;
}

export default function PropertyCard({ property, index = 0 }) {
  const { isFavorite, toggle } = useFavorite(property.id);
  const hasImage = Boolean(property.images?.[0]);

  const specRows = [
    property.beds != null && { label: "Beds", value: property.beds },
    property.baths != null && { label: "Baths", value: property.baths },
    property.areaSqft != null && { label: "Sq. Ft.", value: property.areaSqft.toLocaleString() },
    property.yearBuilt != null && { label: "Built", value: property.yearBuilt },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="group h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface-raised shadow-card transition-shadow duration-300 hover:shadow-card-hover">
        <Link to={`/properties/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
          {hasImage ? (
            <img
              src={property.images[0]}
              alt={`${property.title} in ${formatLocation(property)}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-alt text-content-muted">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <StatusTag status={property.status} />
            {property.featured && (
              <span className="eyebrow bg-surface/90 text-content px-2.5 py-1">Featured</span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle();
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            aria-pressed={isFavorite}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-content shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFavorite ? "var(--color-brass-500)" : "none"}
              stroke={isFavorite ? "var(--color-brass-500)" : "currentColor"}
              strokeWidth="1.8"
            >
              <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.6 4.5 6 4.2c2-.2 3.7 1 4.5 2.5C11.3 5.2 13 4 15 4.2c3.4.3 5.5 3.6 4 7-2.5 4.7-10 9.3-10 9.3Z" />
            </svg>
          </button>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="eyebrow text-brass-600">{referenceCode(property.id)}</span>
            <span className="eyebrow text-content-muted">{property.type}</span>
          </div>

          <Link to={`/properties/${property.slug}`}>
            <h3 className="mt-2 font-display text-lg leading-snug text-content transition-colors group-hover:text-emerald-700">
              {property.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-content-muted">
            {formatLocation(property) || "Location on request"}
          </p>

          {specRows.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-edge py-4 sm:grid-cols-4">
              {specRows.map((row) => (
                <div key={row.label}>
                  <p className="eyebrow text-content-muted">{row.label}</p>
                  <p className="mt-0.5 font-mono text-sm text-content">{row.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <p className="eyebrow text-content-muted">{property.priceUnit === "lease" ? "Lease" : "Price"}</p>
              <p className="font-mono text-xl text-content">{formatPrice(property)}</p>
            </div>
            <Link
              to={`/properties/${property.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-900 px-4 py-2.5 text-xs font-semibold tracking-wide text-paper transition-colors duration-200 hover:bg-emerald-700 active:scale-[0.97]"
            >
              View Details
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
