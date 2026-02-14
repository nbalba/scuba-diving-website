import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationsList from "@/components/destinations/DestinationsList";

export const metadata: Metadata = {
  title: "Dive Destinations",
  description:
    "Explore world-class scuba diving destinations from the Great Barrier Reef to the cenotes of Mexico.",
};

export default function DestinationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-800 to-deep-800 py-24">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Dive Destinations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ocean-200">
            From vibrant tropical reefs to mysterious underwater caves, discover
            the world&apos;s most extraordinary places to dive.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="All Destinations"
            subtitle="Choose your next underwater adventure"
          />
          <DestinationsList />
        </Container>
      </section>
    </>
  );
}
