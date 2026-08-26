import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import PropertyGallery from "../components/property/PropertyGallery";
import PropertyCard from "../components/property/PropertyCard";
import EnquiryForm from "../components/forms/EnquiryForm";
import StatusTag from "../components/ui/StatusTag";
import Button from "../components/ui/Button";
import Reveal from "../components/motion/Reveal";
import { formatPrice, formatLocation } from "../data/properties";
import { useProperties } from "../context/PropertyContext";

export default function PropertyDetail() {
  const { slug } = useParams();
  const { properties, loading } = useProperties();
  const property = properties.find((p) => p.slug === slug);

  const related = useMemo(() => {
    if (!property) return [];
    return properties
      .filter((p) => p.id !== property.id && (p.type === property.type || p.location?.city === property.location?.city))
      .slice(0, 3);
  }, [properties, property]);

  if (!property) {
    if (loading) {
      return (
        <div className="container-wide py-24">
          <div className="mx-auto h-[420px] max-w-4xl animate-pulse bg-surface-alt" />
        </div>
      );
    }
    return <Navigate to="/properties" replace />;
  }

  const hasAgent = Boolean(property.agent?.name || property.agent?.phone || property.agent?.email);

  const specs = [
    { label: "Bedrooms", value: property.beds ?? "—" },
    { label: "Bathrooms", value: property.baths ?? "—" },
    { label: "Living Area", value: property.areaSqft ? `${property.areaSqft.toLocaleString()} sqft` : "—" },
    { label: "Lot Size", value: property.lotSqft ? `${property.lotSqft.toLocaleString()} sqft` : "—" },
    { label: "Year Built", value: property.yearBuilt ?? "—" },
    { label: "Property Type", value: property.type },
  ];

  return (
    <>
      <SEO
        title={`${property.title} — ${formatLocation(property)}`}
        description={property.description?.slice(0, 155)}
        path={`/properties/${property.slug}`}
      />

      <div className="container-wide pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-content-muted">
          <Link to="/" className="hover:text-content">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-content">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-content">{property.title}</span>
        </nav>
      </div>

      <section className="container-wide py-8 md:py-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusTag status={property.status} />
              {property.featured && (
                <span className="eyebrow bg-surface-alt px-2.5 py-1 text-content-muted">Featured Listing</span>
              )}
            </div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-content sm:text-4xl">{property.title}</h1>
            <p className="mt-2 text-content-muted">{formatLocation(property) || "Location on request"}</p>
            <p className="mt-3 font-mono text-2xl text-content">{formatPrice(property)}</p>

            <div className="mt-8">
              <PropertyGallery images={property.images} title={property.title} />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-edge py-8 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label}>
                  <p className="eyebrow text-content-muted">{s.label}</p>
                  <p className="mt-1.5 font-display text-lg text-content">{s.value}</p>
                </div>
              ))}
            </div>

            {property.description && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-content">Description</h2>
                <p className="mt-4 leading-relaxed text-content-muted">{property.description}</p>
              </div>
            )}

            {property.features?.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-content">Features &amp; specifications</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-content-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {property.customFields?.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-content">Additional details</h2>
                <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {property.customFields.map((f, i) => (
                    <div key={`${f.key}-${i}`} className="border-b border-edge pb-3">
                      <dt className="eyebrow text-content-muted">{f.key}</dt>
                      <dd className="mt-1 text-sm text-content">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bezel-shell">
              <div className="bezel-core p-6">
                {hasAgent && (
                  <div className="mb-6 flex items-center gap-3 border-b border-edge pb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-900 font-display text-paper">
                      {(property.agent.name || "AR")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-content">{property.agent.name}</p>
                      <p className="text-xs text-content-muted">Listing Agent, Avatar Realty Group</p>
                    </div>
                  </div>
                )}
                <EnquiryForm
                  compact
                  title="Request a showing"
                  propertyId={property.id}
                  context={`I'm interested in ${property.title} (${formatLocation(property)}).`}
                />
                {hasAgent && (
                  <div className="mt-5 space-y-1.5 border-t border-edge pt-5 text-sm">
                    {property.agent.phone && (
                      <a href={`tel:${property.agent.phone}`} className="block text-emerald-700 hover:text-emerald-900">
                        {property.agent.phone}
                      </a>
                    )}
                    {property.agent.email && (
                      <a href={`mailto:${property.agent.email}`} className="block text-emerald-700 hover:text-emerald-900">
                        {property.agent.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Button to="/properties" variant="ghost" className="mt-4 w-full">
              ← Back to all properties
            </Button>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-alt">
          <div className="container-wide py-16 md:py-20">
            <Reveal><h2 className="font-display text-2xl text-content sm:text-3xl">Similar properties</h2></Reveal>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
