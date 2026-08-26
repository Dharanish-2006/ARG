import SEO from "../components/SEO";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for could not be found." />
      <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center text-center py-24">
        <p className="eyebrow text-brass-600">404</p>
        <h1 className="mt-3 font-display text-3xl text-content">This listing has moved on.</h1>
        <p className="mt-3 max-w-sm text-content-muted">
          The page you're looking for isn't here anymore — but there are plenty of others to see.
        </p>
        <Button to="/properties" variant="primary" className="mt-8">
          Browse properties
        </Button>
      </div>
    </>
  );
}
