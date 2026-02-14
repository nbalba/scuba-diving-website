import type {
  Destination,
  Trip,
  BlogPost,
  Testimonial,
  DifficultyLevel,
} from "@/lib/types";
import type { SfRecord } from "./client";

// ---------------------------------------------------------------------------
// Salesforce → App type mappers
// ---------------------------------------------------------------------------

function parseDifficulty(value: unknown): DifficultyLevel {
  const v = String(value).toLowerCase();
  if (v === "beginner" || v === "intermediate" || v === "advanced") return v;
  return "beginner";
}

function parseJsonArray<T = string>(value: unknown): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as T[];
  try {
    return JSON.parse(String(value));
  } catch {
    return [];
  }
}

function getRelField(record: SfRecord, relation: string, field: string): string {
  const rel = record[relation] as Record<string, unknown> | undefined;
  return rel ? String(rel[field] || "") : "";
}

export function mapDestination(r: SfRecord): Destination {
  return {
    slug: String(r.Slug__c || ""),
    name: String(r.Name || ""),
    country: String(r.Country__c || ""),
    region: String(r.Region__c || ""),
    description: String(r.Description__c || ""),
    longDescription: String(r.Long_Description__c || ""),
    imagePath: String(r.Image_Path__c || ""),
    highlights: parseJsonArray(r.Highlights__c),
    bestSeason: String(r.Best_Season__c || ""),
    waterTemp: String(r.Water_Temp__c || ""),
    visibility: String(r.Visibility__c || ""),
    maxDepth: String(r.Max_Depth__c || ""),
    difficulty: parseDifficulty(r.Difficulty__c),
    featured: Boolean(r.Featured__c),
  };
}

export function mapTrip(r: SfRecord): Trip {
  return {
    slug: String(r.Slug__c || ""),
    title: String(r.Name || ""),
    destinationSlug: String(r.Destination_Slug__c || getRelField(r, "Destination__r", "Slug__c") || ""),
    description: String(r.Description__c || ""),
    longDescription: String(r.Long_Description__c || ""),
    imagePath: String(r.Image_Path__c || ""),
    duration: String(r.Duration__c || ""),
    groupSize: String(r.Group_Size__c || ""),
    price: Number(r.Price__c) || 0,
    originalPrice: r.Original_Price__c ? Number(r.Original_Price__c) : undefined,
    difficulty: parseDifficulty(r.Difficulty__c),
    includes: parseJsonArray(r.Includes__c),
    schedule: parseJsonArray(r.Schedule__c),
    featured: Boolean(r.Featured__c),
    availableDates: parseJsonArray(r.Available_Dates__c),
  };
}

export function mapBlogPost(r: SfRecord): BlogPost {
  return {
    slug: String(r.Slug__c || ""),
    title: String(r.Name || ""),
    excerpt: String(r.Excerpt__c || ""),
    content: String(r.Content__c || ""),
    imagePath: String(r.Image_Path__c || ""),
    author: String(r.Author__c || ""),
    publishedAt: String(r.Published_At__c || ""),
    tags: parseJsonArray(r.Tags__c),
  };
}

export function mapTestimonial(r: SfRecord): Testimonial {
  return {
    name: String(r.Name || ""),
    location: String(r.Location__c || ""),
    quote: String(r.Quote__c || ""),
    rating: Number(r.Rating__c) || 5,
    tripSlug: r.Trip_Slug__c ? String(r.Trip_Slug__c) : getRelField(r, "Trip__r", "Slug__c") || undefined,
  };
}

// ---------------------------------------------------------------------------
// App type → Salesforce field maps (for create / update)
// ---------------------------------------------------------------------------

export function toSfDestination(d: Partial<Destination>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (d.slug !== undefined) fields.Slug__c = d.slug;
  if (d.name !== undefined) fields.Name = d.name;
  if (d.country !== undefined) fields.Country__c = d.country;
  if (d.region !== undefined) fields.Region__c = d.region;
  if (d.description !== undefined) fields.Description__c = d.description;
  if (d.longDescription !== undefined) fields.Long_Description__c = d.longDescription;
  if (d.imagePath !== undefined) fields.Image_Path__c = d.imagePath;
  if (d.highlights !== undefined) fields.Highlights__c = JSON.stringify(d.highlights);
  if (d.bestSeason !== undefined) fields.Best_Season__c = d.bestSeason;
  if (d.waterTemp !== undefined) fields.Water_Temp__c = d.waterTemp;
  if (d.visibility !== undefined) fields.Visibility__c = d.visibility;
  if (d.maxDepth !== undefined) fields.Max_Depth__c = d.maxDepth;
  if (d.difficulty !== undefined) fields.Difficulty__c = d.difficulty;
  if (d.featured !== undefined) fields.Featured__c = d.featured;
  return fields;
}

export function toSfTrip(t: Partial<Trip> & { destinationId?: string }): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (t.slug !== undefined) fields.Slug__c = t.slug;
  if (t.title !== undefined) fields.Name = t.title;
  if (t.destinationId !== undefined) fields.Destination__c = t.destinationId;
  if (t.description !== undefined) fields.Description__c = t.description;
  if (t.longDescription !== undefined) fields.Long_Description__c = t.longDescription;
  if (t.imagePath !== undefined) fields.Image_Path__c = t.imagePath;
  if (t.duration !== undefined) fields.Duration__c = t.duration;
  if (t.groupSize !== undefined) fields.Group_Size__c = t.groupSize;
  if (t.price !== undefined) fields.Price__c = t.price;
  if (t.originalPrice !== undefined) fields.Original_Price__c = t.originalPrice;
  if (t.difficulty !== undefined) fields.Difficulty__c = t.difficulty;
  if (t.includes !== undefined) fields.Includes__c = JSON.stringify(t.includes);
  if (t.schedule !== undefined) fields.Schedule__c = JSON.stringify(t.schedule);
  if (t.featured !== undefined) fields.Featured__c = t.featured;
  if (t.availableDates !== undefined) fields.Available_Dates__c = JSON.stringify(t.availableDates);
  return fields;
}

export function toSfBlogPost(p: Partial<BlogPost>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (p.slug !== undefined) fields.Slug__c = p.slug;
  if (p.title !== undefined) fields.Name = p.title;
  if (p.excerpt !== undefined) fields.Excerpt__c = p.excerpt;
  if (p.content !== undefined) fields.Content__c = p.content;
  if (p.imagePath !== undefined) fields.Image_Path__c = p.imagePath;
  if (p.author !== undefined) fields.Author__c = p.author;
  if (p.publishedAt !== undefined) fields.Published_At__c = p.publishedAt;
  if (p.tags !== undefined) fields.Tags__c = JSON.stringify(p.tags);
  return fields;
}

export function toSfTestimonial(t: Partial<Testimonial> & { tripId?: string }): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (t.name !== undefined) fields.Name = t.name;
  if (t.location !== undefined) fields.Location__c = t.location;
  if (t.quote !== undefined) fields.Quote__c = t.quote;
  if (t.rating !== undefined) fields.Rating__c = t.rating;
  if (t.tripId !== undefined) fields.Trip__c = t.tripId;
  return fields;
}

export function toSfBooking(b: {
  tripId?: string;
  preferredDate?: string;
  numberOfDivers?: number;
  certificationLevel?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
}): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (b.tripId !== undefined) fields.Trip__c = b.tripId;
  if (b.preferredDate !== undefined) fields.Preferred_Date__c = b.preferredDate;
  if (b.numberOfDivers !== undefined) fields.Number_of_Divers__c = b.numberOfDivers;
  if (b.certificationLevel !== undefined) fields.Certification_Level__c = b.certificationLevel;
  if (b.firstName !== undefined) fields.First_Name__c = b.firstName;
  if (b.lastName !== undefined) fields.Last_Name__c = b.lastName;
  if (b.email !== undefined) fields.Email__c = b.email;
  if (b.phone !== undefined) fields.Phone__c = b.phone;
  if (b.specialRequests !== undefined) fields.Special_Requests__c = b.specialRequests;
  fields.Status__c = "New";
  return fields;
}

export function toSfContactSubmission(c: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (c.name !== undefined) fields.Name = c.name;
  if (c.email !== undefined) fields.Email__c = c.email;
  if (c.subject !== undefined) fields.Subject__c = c.subject;
  if (c.message !== undefined) fields.Message__c = c.message;
  fields.Status__c = "New";
  return fields;
}
