"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Ship,
  FileText,
  Star,
  CalendarCheck,
  Mail,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/salesforce/AuthContext";
import { USE_SALESFORCE } from "@/lib/salesforce/config";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/destinations", label: "Destinations", icon: Map },
  { href: "/admin/trips", label: "Trips", icon: Ship },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, login } = useAuth();
  const pathname = usePathname();

  if (USE_SALESFORCE) {
    if (isLoading) {
      return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ocean-900">
              Admin Access Required
            </h1>
            <p className="mt-2 text-ocean-600">
              Please sign in to access the admin dashboard.
            </p>
            <button
              onClick={login}
              className="mt-4 rounded-lg bg-ocean-600 px-6 py-3 font-semibold text-white hover:bg-ocean-700"
            >
              Sign In
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-ocean-50">
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <nav className="space-y-1">
            <h2 className="mb-4 text-lg font-bold text-ocean-900">
              Admin Panel
            </h2>
            {adminLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-ocean-600 text-white"
                      : "text-ocean-700 hover:bg-ocean-100"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Content */}
          <main className="min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
