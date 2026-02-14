"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TripCard from "@/components/trips/TripCard";
import { getFeaturedTrips } from "@/data/trips";
import { fetchFeaturedTrips } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";

export default function FeaturedTrips() {
  const { data: trips } = useSalesforceQuery(
    fetchFeaturedTrips,
    getFeaturedTrips()
  );

  if (!trips || trips.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Upcoming Dive Experiences"
          subtitle="Handcrafted trips led by our most experienced dive masters"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.slice(0, 6).map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      </Container>
    </section>
  );
}
