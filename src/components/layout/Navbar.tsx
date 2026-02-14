"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Waves, LogOut, User } from "lucide-react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/salesforce/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full bg-ocean-950/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <Waves className="h-7 w-7 text-deep-400" />
            <span className="text-xl font-bold tracking-tight">
              DeepBlue Diving
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ocean-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="rounded-lg bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
            >
              Book Now
            </Link>

            {/* Auth buttons */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-ocean-200 transition-colors hover:text-white"
                    >
                      Admin
                    </Link>
                    <span className="flex items-center gap-1.5 text-sm text-ocean-300">
                      <User className="h-4 w-4" />
                      {user?.name || "Account"}
                    </span>
                    <button
                      onClick={logout}
                      className="flex items-center gap-1 text-sm text-ocean-400 transition-colors hover:text-white"
                      aria-label="Log out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={login}
                      className="text-sm font-medium text-ocean-200 transition-colors hover:text-white"
                    >
                      Log In
                    </button>
                    <Link
                      href="/auth/signup"
                      className="rounded-lg border border-ocean-400 px-4 py-2 text-sm font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-ocean-800 bg-ocean-950 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-2 block rounded-lg bg-coral-500 px-3 py-2.5 text-center text-base font-semibold text-white transition-colors hover:bg-coral-600"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>

            {/* Mobile auth */}
            {!isLoading && (
              <div className="border-t border-ocean-800 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/admin"
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                    >
                      Log Out ({user?.name})
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                    >
                      Log In
                    </button>
                    <Link
                      href="/auth/signup"
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-ocean-200 transition-colors hover:bg-ocean-900 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
