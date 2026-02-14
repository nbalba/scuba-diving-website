"use client";

import DestinationCard from "@/components/destinations/DestinationCard";
import { destinations as staticDestinations } from "@/data/destinations";
import { fetchDestinations } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";

export default function DestinationsList() {
  const { data: destinations, loading } = useSalesforceQuery(
    fetchDestinations,
    staticDestinations
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
      </div>
    );
  }

  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard key={destination.slug} destination={destination} />
      ))}
    </div>
  );
}
