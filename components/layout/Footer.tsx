// SERVER COMPONENT: purely static; same content on every page
const CLIENT_INFO = {
  businessName: "MJB's Handyman Service",
  ownerName:    "Mark J. Brommage",
  phone:        "(707) 727-3258",
  phoneHref:    "tel:+17077273258",
  email:        "Marbroman321@gmail.com",
  serviceArea:  "Sonoma County, CA",
};

export default function Footer() {
  // Auto-updates every year without a code change
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 3 columns on sm+, stacks to 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <p className="text-brand-green font-bold text-lg">{CLIENT_INFO.businessName}</p>
            <p className="mt-1 text-gray-400 text-sm">{CLIENT_INFO.ownerName}</p>
            <p className="mt-3 text-sm leading-relaxed">
              Residential &amp; commercial repairs and remodeling in {CLIENT_INFO.serviceArea}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Contact</p>
            <a href={CLIENT_INFO.phoneHref} className="block text-sm hover:text-brand-green transition-colors duration-200">
              {CLIENT_INFO.phone}
            </a>
            <a href={`mailto:${CLIENT_INFO.email}`} className="block mt-1 text-sm hover:text-brand-green transition-colors duration-200">
              {CLIENT_INFO.email}
            </a>
          </div>

          {/* Service area */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Service Area</p>
            <p className="text-sm">{CLIENT_INFO.serviceArea}</p>
            <p className="mt-2 text-sm text-gray-400">
              Santa Rosa · Petaluma · Rohnert Park · Windsor · Healdsburg · Sebastopol
            </p>
          </div>

        </div>

        {/* Copyright + builder credit */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center space-y-1">
          <p className="text-xs text-gray-500">
            &copy; {year} {CLIENT_INFO.businessName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built by{" "}
            <a
              href="https://www.kblwebsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-green transition-colors duration-200"
            >
              KBL Web Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
