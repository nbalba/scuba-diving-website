import Link from "next/link";
import { Waves, Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const quickLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/booking", label: "Book a Dive" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const destinations = [
  { href: "/destinations/great-barrier-reef", label: "Great Barrier Reef" },
  { href: "/destinations/blue-hole-belize", label: "Blue Hole, Belize" },
  { href: "/destinations/red-sea-egypt", label: "Red Sea, Egypt" },
  { href: "/destinations/cenotes-mexico", label: "Cenotes, Mexico" },
  { href: "/destinations/maldives", label: "Maldives" },
  { href: "/destinations/raja-ampat", label: "Raja Ampat" },
];

export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-ocean-200">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <Waves className="h-6 w-6 text-deep-400" />
              <span className="text-lg font-bold">DeepBlue Diving</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ocean-300">
              Your gateway to the world&apos;s most extraordinary underwater
              experiences. Expert-led dive trips for all skill levels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ocean-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Destinations
            </h3>
            <ul className="space-y-2.5">
              {destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ocean-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-ocean-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-deep-400" />
                123 Coral Way, Marina Bay, FL 33101
              </li>
              <li className="flex items-center gap-2 text-sm text-ocean-300">
                <Phone className="h-4 w-4 shrink-0 text-deep-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-ocean-300">
                <Mail className="h-4 w-4 shrink-0 text-deep-400" />
                info@deepbluediving.com
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-ocean-800">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-ocean-400">
            &copy; {new Date().getFullYear()} DeepBlue Diving. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-ocean-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-ocean-400 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
