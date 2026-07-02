// SERVER COMPONENT: detailed services page at /services
import type { Metadata } from "next";
import Link from "next/link";

// Overrides the root layout title for this page only
export const metadata: Metadata = {
  title: "Services | MJB's Handyman Service",
  description:
    "Carpentry, windows, painting, plaster finishes, and custom kitchen and bathroom renovations in Sonoma County, CA.",
};

const SERVICES = [
  {
    icon: "🪵",
    title: "Carpentry",
    description:
      "From structural repairs to decorative trim, Mark brings precision craftsmanship to every wood project — big or small.",
    bullets: [
      "Framing and structural repairs",
      "Interior trim, baseboards, and crown molding",
      "Custom shelving and built-ins",
      "Door and window framing",
      "Deck repairs and wood replacement",
    ],
  },
  {
    icon: "🪟",
    title: "Windows",
    description:
      "Drafty or damaged windows drive up energy bills and reduce comfort. Mark handles everything from a single cracked pane to a full multi-window replacement.",
    bullets: [
      "Window installation and replacement",
      "Single and double-pane glass repair",
      "Screen replacement and repair",
      "Weatherstripping and sealing",
      "Sash and frame repairs",
    ],
  },
  {
    icon: "🖌️",
    title: "Painting",
    description:
      "A quality paint job starts with proper prep. Mark takes the time to patch, prime, and protect surfaces before a single stroke of paint goes on.",
    bullets: [
      "Interior walls, ceilings, and trim",
      "Exterior siding, fences, and decks",
      "Surface prep, patching, and priming",
      "Texture matching on repaired areas",
      "Cabinet and furniture refinishing",
    ],
  },
  {
    icon: "🏠",
    title: "Plaster Finishes",
    description:
      "Older Sonoma County homes often have original plaster walls that need specialized repair. Mark matches existing textures so patches blend invisibly.",
    bullets: [
      "Plaster crack and hole repair",
      "Texture matching on existing walls",
      "Smooth skim coat finishes",
      "Decorative plaster and stucco work",
      "Water-damage plaster restoration",
    ],
  },
  {
    icon: "🍳",
    title: "Kitchen Renovations",
    description:
      "A custom kitchen remodel that fits your lifestyle and budget. Mark handles the carpentry, installation, and finishing work from start to finish.",
    bullets: [
      "Cabinet installation and custom built-ins",
      "Countertop installation",
      "Backsplash tile work",
      "Under-cabinet lighting rough-in",
      "Layout modifications and wall removal",
    ],
  },
  {
    icon: "🚿",
    title: "Bathroom Renovations",
    description:
      "Whether it is a quick refresh or a full gut renovation, Mark coordinates all the finish work to deliver a bathroom you will enjoy for years.",
    bullets: [
      "Full bathroom remodels",
      "Shower and tub surround tile",
      "Vanity and fixture installation",
      "Flooring installation",
      "Exhaust fan replacement",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-charcoal text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-2">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Residential and commercial repairs and remodeling across Sonoma County.
            Quality workmanship on every job, no matter the size.
          </p>
        </div>
      </section>

      {/* Service sections */}
      <section className="py-20 bg-brand-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                // Alternates the card background on even rows for visual rhythm
                className={`rounded-lg p-8 sm:p-10 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border border-gray-100 shadow-sm`}
              >
                {/* Header row: icon + title + green accent bar */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl" role="img" aria-label={service.title}>
                    {service.icon}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">
                    {service.title}
                  </h2>
                </div>

                {/* Green underline accent below each heading */}
                <div className="w-12 h-1 bg-brand-green mb-6" />

                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
                  {service.description}
                </p>

                {/* Bullet list of specific work items */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-gray-700">
                      {/* Green checkmark prefix on each bullet */}
                      <span className="text-brand-green font-bold mt-0.5" aria-hidden="true">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-brand-charcoal rounded-lg px-8 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Don&apos;t see exactly what you need?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Mark handles a wide range of handyman work. Give us a call or send a message
              and we will let you know if we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17077273258"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-brand-charcoal font-bold px-8 py-3 rounded hover:brightness-110 transition-all duration-200"
              >
                <span aria-hidden="true">📞</span>
                (707) 727-3258
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-brand-green text-brand-green font-bold px-8 py-3 rounded hover:bg-brand-green hover:text-brand-charcoal transition-all duration-200"
              >
                Send a Message
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
