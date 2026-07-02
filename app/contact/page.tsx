// SERVER COMPONENT: contact route at /contact
// Handles SEO metadata server-side; delegates the interactive form to a Client Component
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | MJB's Handyman Service",
  description:
    "Get in touch with MJB's Handyman Service in Santa Rosa, CA. Request a free quote or schedule a visit.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-charcoal text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Fill out the form below and Mark will get back to you as soon as possible.
            Prefer to call? Reach us directly at{" "}
            <a
              href="tel:+17077273258"
              className="text-brand-green font-semibold hover:underline"
            >
              (707) 727-3258
            </a>
            .
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 bg-brand-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ContactForm is a Client Component — it manages state and handles the POST */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
