// SERVER COMPONENT : static content about service area
import Link from "next/link";

const CITIES = [
  "Santa Rosa",
  "Petaluma",
  "Rohnert Park",
  "Windsor",
  "Healdsburg",
  "Sebastopol",
  "Cotati",
  "Sonoma",
];

export default function ServiceArea() {
  return (
    // Brand-green background makes this section stand out as a bold callout
    <section className="bg-brand-green py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-brand-charcoal font-semibold text-sm uppercase tracking-widest mb-2">
          Where We Work
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal mb-6">
          Proudly Serving Sonoma County
        </h2>

        {/* Cities list : flex-wrap so it flows naturally on any screen width */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CITIES.map((city) => (
            <span
              key={city}
              className="bg-brand-charcoal text-white text-sm font-medium px-4 py-2 rounded-full"
            >
              {city}
            </span>
          ))}
        </div>

        <p className="text-brand-charcoal text-lg mb-8 max-w-xl mx-auto">
          Not sure if we cover your area? Give us a call and we&apos;ll be happy to help.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+17077273258"
            className="inline-flex items-center justify-center gap-2 bg-brand-charcoal text-white font-bold px-8 py-3 rounded hover:brightness-125 transition-all duration-200"
          >
            <span aria-hidden="true">📞</span>
            (707) 727-3258
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-brand-charcoal text-brand-charcoal font-bold px-8 py-3 rounded hover:bg-brand-charcoal hover:text-white transition-all duration-200"
          >
            Send a Message
          </Link>
        </div>

      </div>
    </section>
  );
}
