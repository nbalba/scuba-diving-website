import type { Destination } from "@/lib/types";

export const destinations: Destination[] = [
  {
    slug: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    region: "Oceania",
    description:
      "The world's largest coral reef system, stretching over 2,300 kilometers with an incredible diversity of marine life.",
    longDescription:
      "The Great Barrier Reef is a UNESCO World Heritage Site and one of the seven natural wonders of the world. Home to over 1,500 species of fish, 400 types of coral, and countless turtles, dolphins, and reef sharks, it offers diving experiences from shallow coral gardens to dramatic outer reef walls. Water conditions are warm and inviting year-round, making it perfect for divers of all levels.",
    imagePath: "/images/destinations/great-barrier-reef.jpg",
    highlights: [
      "1,500+ species of fish",
      "Sea turtle encounters",
      "Vibrant coral gardens",
      "Warm water year-round",
      "Whale season (June–September)",
    ],
    bestSeason: "June – October",
    waterTemp: "24–28°C",
    visibility: "15–30m",
    maxDepth: "40m",
    difficulty: "beginner",
    featured: true,
  },
  {
    slug: "blue-hole-belize",
    name: "Blue Hole",
    country: "Belize",
    region: "Central America",
    description:
      "A giant marine sinkhole off the coast of Belize, famous for its perfectly circular shape and ancient stalactite formations at depth.",
    longDescription:
      "The Great Blue Hole is a bucket-list dive for advanced divers worldwide. This 300-meter-wide, 124-meter-deep sinkhole was formed during ice ages when sea levels were much lower. At 40 meters, massive stalactites hang from the cavern ceiling — proof of its terrestrial origins. Caribbean reef sharks circle the blue abyss, and the surrounding Lighthouse Reef atoll offers exceptional wall diving.",
    imagePath: "/images/destinations/blue-hole-belize.jpg",
    highlights: [
      "Ancient stalactite formations",
      "Caribbean reef sharks",
      "Lighthouse Reef atoll",
      "Wall diving",
      "UNESCO World Heritage Site",
    ],
    bestSeason: "April – June",
    waterTemp: "26–29°C",
    visibility: "30–60m",
    maxDepth: "40m+",
    difficulty: "advanced",
    featured: true,
  },
  {
    slug: "red-sea-egypt",
    name: "Red Sea",
    country: "Egypt",
    region: "Middle East",
    description:
      "Crystal-clear waters, world-class wrecks, and vibrant reefs make the Red Sea one of the top diving destinations on the planet.",
    longDescription:
      "The Red Sea offers an extraordinary combination of pristine coral reefs, legendary shipwrecks, and warm, gin-clear water with visibility often exceeding 30 meters. The SS Thistlegorm wreck is consistently rated among the world's top five wreck dives, while the Straits of Tiran and Ras Mohammed National Park deliver walls of soft coral alive with anthias, barracuda, and reef sharks. Resident spinner dolphin pods add unforgettable encounters.",
    imagePath: "/images/destinations/red-sea-egypt.jpg",
    highlights: [
      "SS Thistlegorm wreck",
      "Spinner dolphin encounters",
      "Ras Mohammed National Park",
      "Exceptional visibility",
      "Warm water year-round",
    ],
    bestSeason: "March – May, September – November",
    waterTemp: "22–28°C",
    visibility: "20–40m",
    maxDepth: "40m",
    difficulty: "intermediate",
    featured: true,
  },
  {
    slug: "cenotes-mexico",
    name: "Cenotes",
    country: "Mexico",
    region: "Central America",
    description:
      "Mystical freshwater sinkholes in the Yucatán Peninsula, where sunlight beams pierce crystal-clear caverns filled with ancient stalactites.",
    longDescription:
      "The cenotes of Mexico's Yucatán Peninsula are natural sinkholes formed by the collapse of limestone bedrock, revealing a vast underground river system. Diving here is unlike anything else on earth — light beams slice through jungle canopy into turquoise pools, halocline layers shimmer like underwater mirages, and ancient stalactite galleries stretch into the darkness. From the famous Dos Ojos to the mystical Cenote Angelita with its underwater hydrogen sulfide river, every cenote tells a different geological story.",
    imagePath: "/images/destinations/cenotes-mexico.jpg",
    highlights: [
      "Crystal-clear freshwater",
      "Stunning light effects",
      "Ancient stalactite formations",
      "Halocline phenomenon",
      "Unique cave ecosystems",
    ],
    bestSeason: "November – March",
    waterTemp: "24–25°C",
    visibility: "50–100m",
    maxDepth: "30m (cavern zone)",
    difficulty: "intermediate",
    featured: true,
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    description:
      "Pristine atolls in the Indian Ocean offering manta ray encounters, whale shark snorkels, and vibrant reef diving from luxurious liveaboards.",
    longDescription:
      "The Maldives archipelago of 1,192 coral islands is a diver's paradise. Channel dives bring thrilling encounters with grey reef sharks and eagle rays, while cleaning stations attract massive gatherings of manta rays during the plankton bloom. The South Ari Atoll is one of the best places on Earth for whale shark encounters. Whether you choose a liveaboard adventure or a resort-based dive package, the warm Indian Ocean waters and extraordinary marine life never disappoint.",
    imagePath: "/images/destinations/maldives.jpg",
    highlights: [
      "Manta ray aggregations",
      "Whale shark encounters",
      "Channel drift dives",
      "Overwater resort luxury",
      "Year-round diving",
    ],
    bestSeason: "January – April",
    waterTemp: "27–30°C",
    visibility: "20–40m",
    maxDepth: "30m",
    difficulty: "beginner",
    featured: false,
  },
  {
    slug: "raja-ampat",
    name: "Raja Ampat",
    country: "Indonesia",
    region: "Southeast Asia",
    description:
      "The crown jewel of marine biodiversity, holding the world record for fish species counted on a single dive at legendary Cape Kri.",
    longDescription:
      "Raja Ampat sits at the heart of the Coral Triangle, the most biodiverse marine region on Earth. With over 1,500 species of fish and 600 species of coral documented, it makes every other destination feel sparse by comparison. Cape Kri holds the world record of 374 fish species counted on a single dive. Strong currents deliver nutrients that fuel an explosion of life, from pygmy seahorses on gorgonian fans to massive schools of barracuda sweeping through the blue. A phinisi liveaboard is the best way to explore this remote paradise.",
    imagePath: "/images/destinations/raja-ampat.jpg",
    highlights: [
      "World-record biodiversity",
      "Pygmy seahorses",
      "Manta ray encounters",
      "Pristine coral reefs",
      "Walking shark night dives",
    ],
    bestSeason: "October – April",
    waterTemp: "27–30°C",
    visibility: "15–30m",
    maxDepth: "40m",
    difficulty: "advanced",
    featured: false,
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured);
}
