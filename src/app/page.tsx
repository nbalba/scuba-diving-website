import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <FeaturedTrips />
      <Testimonials />
      <CTABanner />
    </>
  );
}
