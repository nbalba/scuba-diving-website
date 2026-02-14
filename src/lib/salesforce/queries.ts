import type { Destination, Trip, BlogPost, Testimonial } from "@/lib/types";
import { sfQuery } from "./client";
import {
  mapDestination,
  mapTrip,
  mapBlogPost,
  mapTestimonial,
} from "./mappers";

// ---------------------------------------------------------------------------
// Destinations
// ---------------------------------------------------------------------------

const DESTINATION_FIELDS = `
  Id, Slug__c, Name, Country__c, Region__c, Description__c,
  Long_Description__c, Image_Path__c, Highlights__c, Best_Season__c,
  Water_Temp__c, Visibility__c, Max_Depth__c, Difficulty__c, Featured__c
`;

export async function fetchDestinations(
  accessToken: string,
  instanceUrl: string
): Promise<Destination[]> {
  const result = await sfQuery(
    `SELECT ${DESTINATION_FIELDS} FROM Destination__c ORDER BY Name`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapDestination);
}

export async function fetchDestinationBySlug(
  slug: string,
  accessToken: string,
  instanceUrl: string
): Promise<Destination | undefined> {
  const result = await sfQuery(
    `SELECT ${DESTINATION_FIELDS} FROM Destination__c WHERE Slug__c = '${slug}' LIMIT 1`,
    accessToken,
    instanceUrl
  );
  return result.records[0] ? mapDestination(result.records[0]) : undefined;
}

export async function fetchFeaturedDestinations(
  accessToken: string,
  instanceUrl: string
): Promise<Destination[]> {
  const result = await sfQuery(
    `SELECT ${DESTINATION_FIELDS} FROM Destination__c WHERE Featured__c = true ORDER BY Name`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapDestination);
}

// ---------------------------------------------------------------------------
// Trips
// ---------------------------------------------------------------------------

const TRIP_FIELDS = `
  Id, Slug__c, Name, Destination__c, Destination__r.Slug__c,
  Description__c, Long_Description__c, Image_Path__c, Duration__c,
  Group_Size__c, Price__c, Original_Price__c, Difficulty__c,
  Includes__c, Schedule__c, Featured__c, Available_Dates__c
`;

export async function fetchTrips(
  accessToken: string,
  instanceUrl: string
): Promise<Trip[]> {
  const result = await sfQuery(
    `SELECT ${TRIP_FIELDS} FROM Trip__c ORDER BY Name`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapTrip);
}

export async function fetchTripBySlug(
  slug: string,
  accessToken: string,
  instanceUrl: string
): Promise<Trip | undefined> {
  const result = await sfQuery(
    `SELECT ${TRIP_FIELDS} FROM Trip__c WHERE Slug__c = '${slug}' LIMIT 1`,
    accessToken,
    instanceUrl
  );
  return result.records[0] ? mapTrip(result.records[0]) : undefined;
}

export async function fetchTripsByDestination(
  destinationSlug: string,
  accessToken: string,
  instanceUrl: string
): Promise<Trip[]> {
  const result = await sfQuery(
    `SELECT ${TRIP_FIELDS} FROM Trip__c WHERE Destination__r.Slug__c = '${destinationSlug}' ORDER BY Name`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapTrip);
}

export async function fetchFeaturedTrips(
  accessToken: string,
  instanceUrl: string
): Promise<Trip[]> {
  const result = await sfQuery(
    `SELECT ${TRIP_FIELDS} FROM Trip__c WHERE Featured__c = true ORDER BY Name`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapTrip);
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

const BLOG_POST_FIELDS = `
  Id, Slug__c, Name, Excerpt__c, Content__c, Image_Path__c,
  Author__c, Published_At__c, Tags__c
`;

export async function fetchBlogPosts(
  accessToken: string,
  instanceUrl: string
): Promise<BlogPost[]> {
  const result = await sfQuery(
    `SELECT ${BLOG_POST_FIELDS} FROM Blog_Post__c ORDER BY Published_At__c DESC`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapBlogPost);
}

export async function fetchBlogPostBySlug(
  slug: string,
  accessToken: string,
  instanceUrl: string
): Promise<BlogPost | undefined> {
  const result = await sfQuery(
    `SELECT ${BLOG_POST_FIELDS} FROM Blog_Post__c WHERE Slug__c = '${slug}' LIMIT 1`,
    accessToken,
    instanceUrl
  );
  return result.records[0] ? mapBlogPost(result.records[0]) : undefined;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

const TESTIMONIAL_FIELDS = `
  Id, Name, Location__c, Quote__c, Rating__c,
  Trip__c, Trip__r.Slug__c
`;

export async function fetchTestimonials(
  accessToken: string,
  instanceUrl: string
): Promise<Testimonial[]> {
  const result = await sfQuery(
    `SELECT ${TESTIMONIAL_FIELDS} FROM Testimonial__c ORDER BY CreatedDate DESC`,
    accessToken,
    instanceUrl
  );
  return result.records.map(mapTestimonial);
}
