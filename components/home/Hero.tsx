// SERVER COMPONENT : static hero section; no state or interactivity needed
import Link from "next/link";

const PHONE_HREF = "tel:+17077273258";
const PHONE_NUMBER = "(707) 727-3258";

export default function Hero() {
  return (
    // overflow-hidden clips the diagonal accent that extends beyond the section bounds
    <section className="relative bg-brand-charcoal text-white overflow-hidden">

      {/* ── Diagonal geometric accents (mirrors the business card's angular style) ── */}
      {/* Large rotated rectangle : the bold slash of brand-green in the background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 -skew-x-12 translate-x-20 pointer-events-none" />
      {/* Thin solid green bar along the right edge */}
      <div className="absolute top-0 right-0 w-2 h-full bg-brand-green pointer-events-none" />
      {/* Short horizontal green bar under the headline for emphasis */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">

          {/* Eyebrow label : small text above the headline to orient the visitor */}
          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-4">
            Santa Rosa, CA · Sonoma County
          </p>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            MJB&apos;s{" "}
            {/* Line break keeps "Handyman Service" together on narrow screens */}
            <span className="block text-brand-green">Handyman Service</span>
          </h1>

          {/* Client's exact tagline */}
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            Need help? A call today can be all it takes to get started!
          </p>

          {/* CTA buttons : stacked on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary CTA: tap-to-call (most important action on a handyman site) */}
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-brand-green text-brand-charcoal font-bold px-8 py-4 rounded hover:brightness-110 transition-all duration-200 text-lg"
            >
              {/* Phone icon using a simple Unicode character */}
              <span aria-hidden="true">📞</span>
              Call {PHONE_NUMBER}
            </a>

            {/* Secondary CTA: link to contact form for visitors who prefer not to call */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded hover:bg-brand-green hover:text-brand-charcoal transition-all duration-200 text-lg"
            >
              Get a Free Quote
            </Link>
          </div>

        </div>
      </div>

      {/* Diagonal bottom edge : creates a dynamic transition into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-brand-white"
           style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
    </section>
  );
}
