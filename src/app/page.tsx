import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import {
  getFeaturedDestinations,
  getFeaturedTrips,
  getTestimonials,
} from "@/lib/salesforce/server-queries";

export default async function Home() {
  const [destinations, trips, testimonials] = await Promise.all([
    getFeaturedDestinations(),
    getFeaturedTrips(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedDestinations destinations={destinations} />
      <WhyChooseUs />
      <FeaturedTrips trips={trips} />
      <Testimonials testimonials={testimonials} />
      <CTABanner />
    </>
  );
}
