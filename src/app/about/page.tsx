import type { Metadata } from "next";
import { Shield, Leaf, Compass, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DeepBlue Diving — our story, team, values, and commitment to safe and sustainable diving.",
};

const team = [
  {
    name: "Captain Alex Rivera",
    role: "Founder & Lead Dive Master",
    bio: "With over 5,000 logged dives across 40 countries, Alex founded DeepBlue to share his lifelong passion for the ocean with divers of every level.",
  },
  {
    name: "Dr. Maya Chen",
    role: "Marine Biologist",
    bio: "Maya holds a PhD in marine ecology and leads our conservation partnerships. She brings every reef to life with her deep knowledge of ocean ecosystems.",
  },
  {
    name: "Jorge Santos",
    role: "Operations Director",
    bio: "Jorge ensures every trip runs seamlessly, from liveaboard logistics to equipment maintenance. He's the reason our operations feel effortless.",
  },
  {
    name: "Lena Eriksen",
    role: "Head Dive Instructor",
    bio: "A PADI Course Director with 15 years of teaching experience, Lena has certified over 2,000 divers and specializes in building confidence underwater.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Rigorous equipment checks, detailed briefings, and emergency protocols on every single trip. Your safety is non-negotiable.",
  },
  {
    icon: Leaf,
    title: "Ocean Conservation",
    description:
      "We partner with marine conservation organizations and follow strict no-touch, no-trace diving practices to protect the ecosystems we love.",
  },
  {
    icon: Compass,
    title: "Authentic Adventure",
    description:
      "We go beyond tourist routes to deliver genuinely extraordinary underwater experiences that you'll remember for a lifetime.",
  },
];

const stats = [
  { value: "500+", label: "Dives Led" },
  { value: "50+", label: "Destinations" },
  { value: "10+", label: "Years Experience" },
  { value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-800 to-deep-800 py-24">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            About DeepBlue Diving
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ocean-200">
            Passionate divers helping you explore the world beneath the waves.
          </p>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Our Story" centered={false} />
          <div className="space-y-4 text-lg leading-relaxed text-ocean-700">
            <p>
              DeepBlue Diving was born from a simple belief: the ocean&apos;s
              most incredible experiences should be accessible to everyone, not
              just seasoned divers with thousands of logged hours.
            </p>
            <p>
              Founded in 2015 by Captain Alex Rivera after two decades of
              professional diving, DeepBlue started with a single boat and a
              handful of trips to the Great Barrier Reef. Today, we operate dive
              expeditions across six continents, but our philosophy hasn&apos;t
              changed — small groups, expert guides, and an unwavering commitment
              to safety and sustainability.
            </p>
            <p>
              Every trip is designed by divers who have explored these sites
              hundreds of times and know exactly where to find the magic — the
              hidden cleaning station where mantas gather, the overhang where the
              pygmy seahorse hides, the precise time of day when the light show
              in the cenote is most spectacular.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-ocean-600 py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-ocean-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ocean-100">
                  <value.icon className="h-7 w-7 text-ocean-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ocean-900">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-ocean-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-ocean-50 py-20">
        <Container>
          <SectionHeading
            title="Meet the Team"
            subtitle="The people who make your underwater dreams come true"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-deep-500 text-2xl font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-bold text-ocean-900">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-ocean-500">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-ocean-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
