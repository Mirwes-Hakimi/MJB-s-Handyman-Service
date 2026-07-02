"use client";
// CLIENT COMPONENT: needs useState for field values and submit status,
// and onSubmit/onChange event handlers — none of which work in Server Components

import { useState } from "react";

// Mirrors exactly what the API route expects to receive
type FormData = {
  name: string;
  phone: string;
  email: string;
  jobDescription: string;
  preferredContactTime: string;
};

// The four possible states the form can be in at any moment
type Status = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  jobDescription: "",
  preferredContactTime: "",
};

const CONTACT_TIME_OPTIONS = [
  "Morning (8am - 12pm)",
  "Afternoon (12pm - 5pm)",
  "Evening (5pm - 8pm)",
  "Anytime",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Single handler for all text inputs and select — reads name + value from the element
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    // Spread existing fields, then overwrite only the one that changed
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Stops the browser's default full-page form submit
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // API returned a non-2xx status; show a friendly error
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(INITIAL_FORM); // Clear fields after success
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // Shared Tailwind classes for every text input and textarea to keep them consistent
  const inputClass =
    "w-full border border-gray-300 rounded px-4 py-3 text-sm text-brand-charcoal placeholder-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors duration-200";

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8">

      {/* Success state: replaces the form after a successful submit */}
      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4" aria-hidden="true">✅</div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thanks for reaching out. Mark will get back to you soon.
          </p>
          {/* Let the visitor submit another request without reloading the page */}
          <button
            onClick={() => setStatus("idle")}
            className="text-brand-green font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* noValidate: disables browser's default validation bubbles so we control the UX */}

          <h2 className="text-2xl font-bold text-brand-charcoal mb-6">Request a Quote</h2>

          {/* Error banner */}
          {status === "error" && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded px-4 py-3 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="space-y-5">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-brand-charcoal mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Smith"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Phone + Email side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-brand-charcoal mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(707) 555-0100"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-brand-charcoal mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Job description */}
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-semibold text-brand-charcoal mb-1">
                Describe the Job <span className="text-red-500">*</span>
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                required
                rows={4}
                placeholder="Tell us what needs to be done, where you are located, and any other details that would help..."
                value={formData.jobDescription}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Preferred contact time */}
            <div>
              <label htmlFor="preferredContactTime" className="block text-sm font-semibold text-brand-charcoal mb-1">
                Best Time to Reach You
              </label>
              <select
                id="preferredContactTime"
                name="preferredContactTime"
                value={formData.preferredContactTime}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a time...</option>
                {CONTACT_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 w-full bg-brand-green text-brand-charcoal font-bold py-4 rounded hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          <p className="mt-3 text-xs text-gray-400 text-center">
            Fields marked <span className="text-red-500">*</span> are required.
          </p>
        </form>
      )}
    </div>
  );
}
