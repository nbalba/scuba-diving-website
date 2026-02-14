import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Destination } from "@/lib/types";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ocean-500 to-deep-600">
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/50">
          {destination.name}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{destination.name}</h3>
          <p className="text-sm text-ocean-200">{destination.country}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="mb-3 text-sm leading-relaxed text-ocean-600">
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant={destination.difficulty}>
            {destination.difficulty}
          </Badge>
          <span className="text-sm font-medium text-ocean-500 transition-colors group-hover:text-ocean-700">
            Explore &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
