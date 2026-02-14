import Link from "next/link";
import { Clock, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Trip } from "@/lib/types";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-deep-500 to-ocean-700">
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/50">
          {trip.title}
        </div>
        {trip.originalPrice && (
          <div className="absolute right-3 top-3 rounded-full bg-coral-500 px-3 py-1 text-xs font-bold text-white">
            Save {formatPrice(trip.originalPrice - trip.price)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <Badge variant={trip.difficulty}>{trip.difficulty}</Badge>
        </div>
        <h3 className="mb-1 text-lg font-bold text-ocean-900 transition-colors group-hover:text-ocean-600">
          {trip.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-ocean-600">
          {trip.description}
        </p>

        <div className="mb-4 flex items-center gap-4 text-sm text-ocean-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {trip.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {trip.groupSize}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-ocean-100 pt-4">
          <div>
            {trip.originalPrice && (
              <span className="mr-2 text-sm text-ocean-400 line-through">
                {formatPrice(trip.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-ocean-900">
              {formatPrice(trip.price)}
            </span>
            <span className="text-sm text-ocean-500"> / person</span>
          </div>
          <span className="text-sm font-medium text-ocean-500 transition-colors group-hover:text-ocean-700">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
