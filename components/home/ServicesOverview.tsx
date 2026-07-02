// SERVER COMPONENT : static data rendered into cards; no interactivity
import Link from "next/link";

// Each service card: icon is a simple emoji placeholder (swap for SVG icons later)
const SERVICES = [
  {
    icon: "🪵",
    title: "Carpentry",
    description: "Custom woodwork, framing, trim, shelving, and structural repairs.",
  },
  {
    icon: "🪟",
    title: "Windows",
    description: "Installation, replacement, repair, and weatherproofing.",
  },
  {
    icon: "🖌️",
    title: "Painting",
    description: "Interior and exterior painting with clean, lasting finishes.",
  },
  {
    icon: "🏠",
    title: "Plaster Finishes",
    description: "Smooth plaster, texture matching, and decorative wall finishes.",
  },
  {
    icon: "🍳",
    title: "Kitchen Renovations",
    description: "Custom kitchen remodels : cabinets, countertops, layout, and more.",
  },
  {
    icon: "🚿",
    title: "Bathroom Renovations",
    description: "Full bathroom remodels including tiling, fixtures, and vanities.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-brand-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-2">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Our Services
          </h2>
          {/* Decorative green underline below the heading */}
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4" />
        </div>

        {/* Responsive grid: 1 col → 2 col → 3 col as screen widens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-brand-green transition-all duration-200 group"
            >
              {/* Icon */}
              <span className="text-4xl" role="img" aria-label={service.title}>
                {service.icon}
              </span>

              {/* Title : green on hover via group-hover (parent has className="group") */}
              <h3 className="mt-4 text-lg font-bold text-brand-charcoal group-hover:text-brand-green transition-colors duration-200">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Link to the full Services page */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-brand-charcoal text-white font-bold px-8 py-3 rounded hover:bg-brand-green hover:text-brand-charcoal transition-all duration-200"
          >
            View All Services
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
