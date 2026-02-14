import { Shield, Users, Award, Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Award,
    title: "Expert Guides",
    description:
      "All our dive leaders are PADI-certified professionals with years of experience in their local waters.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "We keep group sizes small to ensure personalized attention and a more intimate diving experience.",
  },
  {
    icon: Compass,
    title: "All Skill Levels",
    description:
      "From first-time snorkelers to advanced technical divers, we have trips tailored to every level.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our top priority with rigorous equipment checks, emergency protocols, and comprehensive briefings.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-ocean-50 py-20">
      <Container>
        <SectionHeading
          title="Why Choose DeepBlue"
          subtitle="We're committed to making every dive unforgettable"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ocean-100">
                <feature.icon className="h-7 w-7 text-ocean-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-ocean-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-ocean-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
