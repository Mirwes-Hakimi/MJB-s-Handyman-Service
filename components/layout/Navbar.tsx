// SERVER COMPONENT : static links need no client JS; add 'use client' only if a toggle is needed later
import Link from "next/link";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/services", label: "Services" },
  { href: "/contact",  label: "Contact"  },
];

const PHONE_NUMBER = "(707) 727-3258";
const PHONE_HREF   = "tel:+17077273258";

export default function Navbar() {
  return (
    <nav className="bg-brand-charcoal shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Business name : clicking goes home */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-brand-green font-bold text-xl tracking-tight">
              MJB&apos;s
            </span>
            <span className="text-white font-semibold text-xl tracking-tight">
              Handyman Service
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Nav links hidden on mobile (sm:flex shows them at 640px+) */}
            <div className="hidden sm:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-brand-green transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* tap-to-call on mobile; opens default call app on desktop */}
            <a
              href={PHONE_HREF}
              className="bg-brand-green text-brand-charcoal font-bold text-sm px-4 py-2 rounded hover:brightness-110 transition-all duration-200 whitespace-nowrap"
            >
              {PHONE_NUMBER}
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
