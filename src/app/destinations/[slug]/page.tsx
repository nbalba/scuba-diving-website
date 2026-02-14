import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Thermometer, Eye, ArrowDown, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import TripCard from "@/components/trips/TripCard";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getTripsByDestination } from "@/data/trips";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: destination.name,
    description: destination.description,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const trips = getTripsByDestination(slug);

  const stats = [
    { icon: Calendar, label: "Best Season", value: destination.bestSeason },
    { icon: Thermometer, label: "Water Temp", value: destination.waterTemp },
    { icon: Eye, label: "Visibility", value: destination.visibility },
    { icon: ArrowDown, label: "Max Depth", value: destination.maxDepth },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-700 via-ocean-600 to-deep-700 py-32">
        {destination.imagePath && (
          <Image
            src={destination.imagePath}
            alt={destination.name}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
        )}
        <Container className="relative z-10 text-center">
          <Badge variant={destination.difficulty} className="mb-4">
            {destination.difficulty}
          </Badge>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-2 text-xl text-ocean-200">
            {destination.country} &middot; {destination.region}
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="-mt-8 relative z-20">
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-5 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-ocean-500" />
                <p className="text-sm text-ocean-500">{stat.label}</p>
                <p className="mt-1 font-bold text-ocean-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Description */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ocean-700">
            {destination.longDescription}
          </p>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-ocean-900">
              Highlights
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {destination.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2 text-ocean-700"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-deep-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Associated Trips */}
      {trips.length > 0 && (
        <section className="bg-ocean-50 py-20">
          <Container>
            <SectionHeading
              title={`Trips in ${destination.name}`}
              subtitle="Choose an experience that suits your level"
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
