import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowDown, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { trips, getTripBySlug } from "@/data/trips";
import { getDestinationBySlug } from "@/data/destinations";
import { formatPrice, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return {
    title: trip.title,
    description: trip.description,
  };
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const destination = getDestinationBySlug(trip.destinationSlug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep-700 via-ocean-700 to-ocean-800 py-24">
        {trip.imagePath && (
          <Image
            src={trip.imagePath}
            alt={trip.title}
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        )}
        <Container className="relative z-10">
          <div className="max-w-3xl">
            {destination && (
              <Link
                href={`/destinations/${destination.slug}`}
                className="mb-3 inline-block text-sm font-medium text-deep-300 hover:text-white"
              >
                &larr; {destination.name}, {destination.country}
              </Link>
            )}
            <Badge variant={trip.difficulty} className="mb-4">
              {trip.difficulty}
            </Badge>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {trip.title}
            </h1>
            <p className="mt-4 text-lg text-ocean-200">{trip.description}</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative mb-10 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-ocean-500 to-deep-600">
                {trip.imagePath && (
                  <Image
                    src={trip.imagePath}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                )}
              </div>

              {/* Description */}
              <h2 className="mb-4 text-2xl font-bold text-ocean-900">
                About This Trip
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-ocean-700">
                {trip.longDescription}
              </p>

              {/* Schedule */}
              <h2 className="mb-6 text-2xl font-bold text-ocean-900">
                Day-by-Day Schedule
              </h2>
              <div className="mb-10 space-y-6">
                {trip.schedule.map((day) => (
                  <div
                    key={day.day}
                    className="rounded-xl border border-ocean-100 p-6"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
                        {day.day}
                      </span>
                      <h3 className="text-lg font-bold text-ocean-900">
                        {day.title}
                      </h3>
                    </div>
                    <p className="ml-11 text-ocean-600">{day.description}</p>
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <h2 className="mb-4 text-2xl font-bold text-ocean-900">
                What&apos;s Included
              </h2>
              <ul className="space-y-3">
                {trip.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ocean-700"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-deep-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-ocean-100 bg-white p-6 shadow-lg">
                {/* Price */}
                <div className="mb-6 text-center">
                  {trip.originalPrice && (
                    <span className="mr-2 text-lg text-ocean-400 line-through">
                      {formatPrice(trip.originalPrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-ocean-900">
                    {formatPrice(trip.price)}
                  </span>
                  <span className="text-ocean-500"> / person</span>
                </div>

                {/* Quick Info */}
                <div className="mb-6 space-y-3 border-y border-ocean-100 py-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ocean-500">
                      <Clock className="h-4 w-4" /> Duration
                    </span>
                    <span className="font-medium text-ocean-900">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ocean-500">
                      <Users className="h-4 w-4" /> Group Size
                    </span>
                    <span className="font-medium text-ocean-900">
                      {trip.groupSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ocean-500">
                      <ArrowDown className="h-4 w-4" /> Difficulty
                    </span>
                    <Badge variant={trip.difficulty}>{trip.difficulty}</Badge>
                  </div>
                </div>

                {/* Available Dates */}
                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold text-ocean-900">
                    Available Dates
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trip.availableDates.map((date) => (
                      <span
                        key={date}
                        className="rounded-md bg-ocean-50 px-2.5 py-1 text-xs font-medium text-ocean-700"
                      >
                        {formatDate(date)}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  href={`/booking?trip=${trip.slug}`}
                  className="w-full"
                  variant="coral"
                  size="lg"
                >
                  Book This Trip
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
