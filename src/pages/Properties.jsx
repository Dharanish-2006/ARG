import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import PropertyCard from "../components/property/PropertyCard";
import Button from "../components/ui/Button";
import { useProperties } from "../context/PropertyContext";

const PAGE_SIZE = 6;
const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Properties() {
  const { properties, loading, error, refresh } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const status = searchParams.get("status") || "";
  const city = searchParams.get("city") || "";
  const sort = searchParams.get("sort") || "newest";

  useEffect(() => setVisibleCount(PAGE_SIZE), [q, type, status, city, sort]);

  const cities = useMemo(
    () => [...new Set(properties.map((p) => p.location?.city).filter(Boolean))].sort(),
    [properties]
  );
  const types = useMemo(
    () => [...new Set(properties.map((p) => p.type).filter(Boolean))].sort(),
    [properties]
  );
  const statuses = useMemo(
    () => [...new Set(properties.map((p) => p.status).filter(Boolean))].sort(),
    [properties]
  );

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      const haystack = `${p.title} ${p.location?.city} ${p.location?.neighborhood}`.toLowerCase();
      if (q && !haystack.includes(q.toLowerCase())) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      if (city && p.location?.city !== city) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "price-desc") list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    else list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [properties, q, type, status, city, sort]);

  const visible = filtered.slice(0, visibleCount);
  const inputClasses =
    "w-full border border-edge bg-surface px-3.5 py-2.5 text-sm text-content focus:border-emerald-700 focus:outline-none";

  return (
    <>
      <SEO
        title="Properties for Sale & Lease"
        description="Browse current Avatar Realty Group listings across the Sacramento region, with filters for property type, status, city, and price."
        path="/properties"
      />

      <section className="bg-ink text-paper">
        <div className="container-wide py-14 md:py-16">
          <p className="eyebrow text-brass-400 mb-3">Listings</p>
          <h1 className="font-display text-3xl sm:text-4xl">Find your next property</h1>
          <p className="mt-3 max-w-xl text-paper/65">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} currently available
            to view.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div>
              <label htmlFor="search" className="mb-2 block text-xs font-medium uppercase tracking-wide text-content-muted">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Title or neighborhood…"
                value={q}
                onChange={(e) => updateParam("q", e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="type" className="mb-2 block text-xs font-medium uppercase tracking-wide text-content-muted">
                Property type
              </label>
              <select id="type" value={type} onChange={(e) => updateParam("type", e.target.value)} className={inputClasses}>
                <option value="">All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="mb-2 block text-xs font-medium uppercase tracking-wide text-content-muted">
                Status
              </label>
              <select id="status" value={status} onChange={(e) => updateParam("status", e.target.value)} className={inputClasses}>
                <option value="">Any status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-xs font-medium uppercase tracking-wide text-content-muted">
                City
              </label>
              <select id="city" value={city} onChange={(e) => updateParam("city", e.target.value)} className={inputClasses}>
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="mb-2 block text-xs font-medium uppercase tracking-wide text-content-muted">
                Sort by
              </label>
              <select id="sort" value={sort} onChange={(e) => updateParam("sort", e.target.value)} className={inputClasses}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {(q || type || status || city) && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="text-sm text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Results */}
          <div>
            {loading ? (
              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
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
            ) : error ? (
              <div className="border border-[#c0453a]/30 bg-[#c0453a]/5 px-8 py-16 text-center">
                <p className="font-display text-xl text-content">Couldn't load properties</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-content-muted">{error}</p>
                <Button variant="outline" size="sm" onClick={refresh} className="mt-6">
                  Try again
                </Button>
              </div>
            ) : visible.length === 0 ? (
              <div className="border border-dashed border-edge bg-surface-alt/60 px-8 py-16 text-center">
                <p className="font-display text-xl text-content">
                  {properties.length === 0 ? "No listings published yet" : "No properties match those filters"}
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-content-muted">
                  {properties.length === 0
                    ? "Once properties are added through the admin panel, they'll appear here automatically."
                    : "Try widening your search, or clear filters to see everything we currently represent."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((property, i) => (
                    <PropertyCard key={property.id} property={property} index={i} />
                  ))}
                </div>
                {visibleCount < filtered.length && (
                  <div className="mt-12 flex justify-center">
                    <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                      Load more properties
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
