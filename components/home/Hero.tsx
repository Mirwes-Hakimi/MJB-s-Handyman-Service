// SERVER COMPONENT: static hero section; no state or interactivity needed
import Link from "next/link";

const PHONE_HREF = "tel:+17077273258";
const PHONE_NUMBER = "(707) 727-3258";

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden">

      {/* Background video — muted+autoPlay required by browsers to autoplay */}
      <video
        src="/2127.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay so text stays readable over any video content */}
      <div className="absolute inset-0 bg-brand-charcoal/75" />

      {/* Diagonal geometric accents on top of the overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-full bg-brand-green pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green pointer-events-none" />

      {/* Main content — z-10 lifts it above the video and overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">

          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-4">
            Santa Rosa, CA · Sonoma County
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            MJB&apos;s{" "}
            <span className="block text-brand-green">Handyman Service</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            Need help? A call today can be all it takes to get started!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-brand-green text-brand-charcoal font-bold px-8 py-4 rounded hover:brightness-110 transition-all duration-200 text-lg"
            >
              <span aria-hidden="true">📞</span>
              Call {PHONE_NUMBER}
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded hover:bg-brand-green hover:text-brand-charcoal transition-all duration-200 text-lg"
            >
              Get a Free Quote
            </Link>
          </div>

        </div>
      </div>

      {/* Diagonal bottom edge transition into the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-brand-white"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}
