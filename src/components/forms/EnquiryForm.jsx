import { useState } from "react";
import Button from "../ui/Button";
import { api, ApiError } from "../../lib/api";

const fieldClasses =
  "w-full border border-edge bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 focus:border-emerald-700 focus:outline-none transition-colors";

export default function EnquiryForm({
  title = "Send an enquiry",
  description = "Tell us a little about what you're looking for and an agent will follow up within one business day.",
  context,
  propertyId,
  compact = false,
}) {
  const [status, setStatus] = useState("idle"); // idle | submitting | submitted | error
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: context || "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("submitting");
    setError("");
    try {
      await api.post("/enquiries", { ...form, propertyId });
      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "submitted") {
    return (
      <div className="border border-emerald-700/30 bg-emerald-100 px-6 py-8 text-center">
        <p className="font-display text-xl text-emerald-900">Thank you, {form.name.split(" ")[0]}.</p>
        <p className="mt-2 text-sm text-content-muted">
          Your enquiry has been received. A member of the Avatar Realty team will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      {!compact && (
        <div className="mb-1">
          <h3 className="font-display text-xl text-content">{title}</h3>
          <p className="mt-1 text-sm text-content-muted">{description}</p>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-content-muted">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jordan Ashworth"
            value={form.name}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-content-muted">
            Phone <span className="normal-case text-content-muted/70">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(916) 555-0100"
            value={form.phone}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-content-muted">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={fieldClasses}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-content-muted">
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={handleChange}
          className={fieldClasses}
        />
      </div>
      {status === "error" && <p className="text-sm text-[#c0453a]">{error}</p>}
      <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
