import DestinationCard from "@/components/destinations/DestinationCard";
import type { Destination } from "@/lib/types";

export default function DestinationsList({
  destinations,
}: {
  destinations: Destination[];
}) {
  if (destinations.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard key={destination.slug} destination={destination} />
      ))}
    </div>
  );
}
