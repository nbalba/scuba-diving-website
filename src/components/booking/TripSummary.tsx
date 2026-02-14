"use client";

import { useSearchParams } from "next/navigation";
import { Clock, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getTripBySlug } from "@/data/trips";
import { getDestinationBySlug } from "@/data/destinations";
import { formatPrice } from "@/lib/utils";

export default function TripSummary() {
  const searchParams = useSearchParams();
  const tripSlug = searchParams.get("trip");

  if (!tripSlug) {
    return (
      <div className="rounded-xl border border-ocean-100 bg-ocean-50 p-6 text-center">
        <p className="text-ocean-500">
          Select a trip from the form to see its details here.
        </p>
      </div>
    );
  }

  const trip = getTripBySlug(tripSlug);
  if (!trip) {
    return (
      <div className="rounded-xl border border-ocean-100 bg-ocean-50 p-6 text-center">
        <p className="text-ocean-500">Trip not found.</p>
      </div>
    );
  }

  const destination = getDestinationBySlug(trip.destinationSlug);

  return (
    <div className="rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
      {/* Image placeholder */}
      <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-ocean-500 to-deep-600 text-sm text-white/40">
        {trip.title}
      </div>

      <Badge variant={trip.difficulty} className="mb-2">
        {trip.difficulty}
      </Badge>
      <h3 className="text-lg font-bold text-ocean-900">{trip.title}</h3>
      {destination && (
        <p className="text-sm text-ocean-500">
          {destination.name}, {destination.country}
        </p>
      )}

      <div className="mt-4 space-y-2 border-t border-ocean-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-ocean-600">
          <Clock className="h-4 w-4" />
          {trip.duration}
        </div>
        <div className="flex items-center gap-2 text-sm text-ocean-600">
          <Users className="h-4 w-4" />
          {trip.groupSize}
        </div>
      </div>

      <div className="mt-4 border-t border-ocean-100 pt-4 text-center">
        {trip.originalPrice && (
          <span className="mr-2 text-sm text-ocean-400 line-through">
            {formatPrice(trip.originalPrice)}
          </span>
        )}
        <span className="text-2xl font-bold text-ocean-900">
          {formatPrice(trip.price)}
        </span>
        <span className="text-sm text-ocean-500"> / person</span>
      </div>
    </div>
  );
}
