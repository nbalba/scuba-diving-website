import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/destinations/DestinationCard";
import { getFeaturedDestinations } from "@/data/destinations";

export default function FeaturedDestinations() {
  const destinations = getFeaturedDestinations();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Popular Destinations"
          subtitle="Explore our hand-picked diving destinations around the world"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </Container>
    </section>
  );
}
