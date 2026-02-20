import "server-only";

import type { Destination, Trip, BlogPost, Testimonial } from "@/lib/types";

const SITE_URL = process.env.SF_SITE_URL || "";

/**
 * Fetch from the Experience Site's Apex REST API (guest/public access, no auth).
 */
async function guestFetch<T>(path: string): Promise<T> {
  if (!SITE_URL) {
    throw new Error("SF_SITE_URL is not configured");
  }

  const url = `${SITE_URL}/services/apexrest/deepblue/${path}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Guest API error (${res.status}): ${url}`);
  }

  return res.json();
}

// ---- Destinations ----

export async function fetchDestinations(): Promise<Destination[]> {
  return guestFetch<Destination[]>("destinations");
}

export async function fetchFeaturedDestinations(): Promise<Destination[]> {
  return guestFetch<Destination[]>("destinations/featured");
}

export async function fetchDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  return guestFetch<Destination | null>(`destinations/${encodeURIComponent(slug)}`);
}

// ---- Trips ----

export async function fetchTrips(): Promise<Trip[]> {
  return guestFetch<Trip[]>("trips");
}

export async function fetchFeaturedTrips(): Promise<Trip[]> {
  return guestFetch<Trip[]>("trips/featured");
}

export async function fetchTripBySlug(slug: string): Promise<Trip | null> {
  return guestFetch<Trip | null>(`trips/${encodeURIComponent(slug)}`);
}

export async function fetchTripsByDestination(
  destinationSlug: string
): Promise<Trip[]> {
  return guestFetch<Trip[]>(
    `trips?destination=${encodeURIComponent(destinationSlug)}`
  );
}

// ---- Blog Posts ----

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return guestFetch<BlogPost[]>("blog-posts");
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return guestFetch<BlogPost | null>(
    `blog-posts/${encodeURIComponent(slug)}`
  );
}

// ---- Testimonials ----

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return guestFetch<Testimonial[]>("testimonials");
}
