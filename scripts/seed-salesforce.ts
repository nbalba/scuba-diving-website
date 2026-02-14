/**
 * Seed script to populate Salesforce with existing static data.
 *
 * Usage:
 *   npx tsx scripts/seed-salesforce.ts
 *
 * Required environment variables (set in .env.local or export them):
 *   SF_ACCESS_TOKEN  — a valid Salesforce access token
 *   SF_INSTANCE_URL  — e.g. https://your-org.my.salesforce.com
 */

import { destinations } from "../src/data/destinations";
import { trips } from "../src/data/trips";
import { blogPosts } from "../src/data/blog-posts";
import { testimonials } from "../src/data/testimonials";

const SF_ACCESS_TOKEN = process.env.SF_ACCESS_TOKEN;
const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
const API_VERSION = "v60.0";

if (!SF_ACCESS_TOKEN || !SF_INSTANCE_URL) {
  console.error(
    "Missing SF_ACCESS_TOKEN or SF_INSTANCE_URL environment variables."
  );
  process.exit(1);
}

const baseUrl = `${SF_INSTANCE_URL}/services/data/${API_VERSION}`;

async function sfCreate(
  objectName: string,
  data: Record<string, unknown>
): Promise<{ id: string; success: boolean }> {
  const res = await fetch(`${baseUrl}/sobjects/${objectName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SF_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to create ${objectName}: ${res.status} ${body}`);
  }

  return res.json();
}

async function seed() {
  console.log("Seeding Salesforce...\n");

  // 1. Destinations
  const destinationIdMap: Record<string, string> = {};
  console.log(`Creating ${destinations.length} destinations...`);
  for (const d of destinations) {
    const result = await sfCreate("Destination__c", {
      Slug__c: d.slug,
      Name: d.name,
      Country__c: d.country,
      Region__c: d.region,
      Description__c: d.description,
      Long_Description__c: d.longDescription,
      Image_Path__c: d.imagePath,
      Highlights__c: JSON.stringify(d.highlights),
      Best_Season__c: d.bestSeason,
      Water_Temp__c: d.waterTemp,
      Visibility__c: d.visibility,
      Max_Depth__c: d.maxDepth,
      Difficulty__c: d.difficulty,
      Featured__c: d.featured,
    });
    destinationIdMap[d.slug] = result.id;
    console.log(`  ✓ ${d.name} (${result.id})`);
  }

  // 2. Trips
  const tripIdMap: Record<string, string> = {};
  console.log(`\nCreating ${trips.length} trips...`);
  for (const t of trips) {
    const destId = destinationIdMap[t.destinationSlug];
    const result = await sfCreate("Trip__c", {
      Slug__c: t.slug,
      Name: t.title,
      Destination__c: destId,
      Description__c: t.description,
      Long_Description__c: t.longDescription,
      Image_Path__c: t.imagePath,
      Duration__c: t.duration,
      Group_Size__c: t.groupSize,
      Price__c: t.price,
      Original_Price__c: t.originalPrice ?? null,
      Difficulty__c: t.difficulty,
      Includes__c: JSON.stringify(t.includes),
      Schedule__c: JSON.stringify(t.schedule),
      Featured__c: t.featured,
      Available_Dates__c: JSON.stringify(t.availableDates),
    });
    tripIdMap[t.slug] = result.id;
    console.log(`  ✓ ${t.title} (${result.id})`);
  }

  // 3. Blog Posts
  console.log(`\nCreating ${blogPosts.length} blog posts...`);
  for (const p of blogPosts) {
    const result = await sfCreate("Blog_Post__c", {
      Slug__c: p.slug,
      Name: p.title,
      Excerpt__c: p.excerpt,
      Content__c: p.content,
      Image_Path__c: p.imagePath,
      Author__c: p.author,
      Published_At__c: p.publishedAt,
      Tags__c: JSON.stringify(p.tags),
    });
    console.log(`  ✓ ${p.title} (${result.id})`);
  }

  // 4. Testimonials
  console.log(`\nCreating ${testimonials.length} testimonials...`);
  for (const t of testimonials) {
    const tripId = t.tripSlug ? tripIdMap[t.tripSlug] : null;
    const result = await sfCreate("Testimonial__c", {
      Name: t.name,
      Location__c: t.location,
      Quote__c: t.quote,
      Rating__c: t.rating,
      Trip__c: tripId,
    });
    console.log(`  ✓ ${t.name} (${result.id})`);
  }

  console.log("\n✅ Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
