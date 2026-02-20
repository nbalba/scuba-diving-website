import "server-only";

import { USE_SALESFORCE } from "./config";
import * as guestApi from "./guest-api";
import {
  destinations as staticDestinations,
  getDestinationBySlug as staticGetDestinationBySlug,
  getFeaturedDestinations as staticGetFeaturedDestinations,
} from "@/data/destinations";
import {
  trips as staticTrips,
  getTripBySlug as staticGetTripBySlug,
  getTripsByDestination as staticGetTripsByDestination,
  getFeaturedTrips as staticGetFeaturedTrips,
} from "@/data/trips";
import {
  blogPosts as staticBlogPosts,
  getBlogPostBySlug as staticGetBlogPostBySlug,
} from "@/data/blog-posts";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import type { Destination, Trip, BlogPost, Testimonial } from "@/lib/types";

/**
 * Try the guest API; on any failure fall back to static data.
 */
async function withFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!USE_SALESFORCE) return fallback;

  try {
    return await fetcher();
  } catch (error) {
    console.error("[SF Server] Falling back to static data:", error);
    return fallback;
  }
}

// ---- Destinations ----

export async function getDestinations(): Promise<Destination[]> {
  return withFallback(() => guestApi.fetchDestinations(), staticDestinations);
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | undefined> {
  return withFallback(
    async () => (await guestApi.fetchDestinationBySlug(slug)) ?? undefined,
    staticGetDestinationBySlug(slug)
  );
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  return withFallback(
    () => guestApi.fetchFeaturedDestinations(),
    staticGetFeaturedDestinations()
  );
}

// ---- Trips ----

export async function getTrips(): Promise<Trip[]> {
  return withFallback(() => guestApi.fetchTrips(), staticTrips);
}

export async function getTripBySlug(
  slug: string
): Promise<Trip | undefined> {
  return withFallback(
    async () => (await guestApi.fetchTripBySlug(slug)) ?? undefined,
    staticGetTripBySlug(slug)
  );
}

export async function getTripsByDestination(
  destinationSlug: string
): Promise<Trip[]> {
  return withFallback(
    () => guestApi.fetchTripsByDestination(destinationSlug),
    staticGetTripsByDestination(destinationSlug)
  );
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  return withFallback(
    () => guestApi.fetchFeaturedTrips(),
    staticGetFeaturedTrips()
  );
}

// ---- Blog Posts ----

export async function getBlogPosts(): Promise<BlogPost[]> {
  return withFallback(() => guestApi.fetchBlogPosts(), staticBlogPosts);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  return withFallback(
    async () => (await guestApi.fetchBlogPostBySlug(slug)) ?? undefined,
    staticGetBlogPostBySlug(slug)
  );
}

// ---- Testimonials ----

export async function getTestimonials(): Promise<Testimonial[]> {
  return withFallback(
    () => guestApi.fetchTestimonials(),
    staticTestimonials
  );
}
