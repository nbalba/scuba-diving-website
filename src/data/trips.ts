import type { Trip } from "@/lib/types";

export const trips: Trip[] = [
  // --- Great Barrier Reef ---
  {
    slug: "reef-discovery-intro",
    title: "Reef Discovery: Intro to the Barrier Reef",
    destinationSlug: "great-barrier-reef",
    description:
      "A two-day beginner-friendly introduction to the outer Great Barrier Reef with guided dives and marine biology briefings.",
    longDescription:
      "Perfect for newly certified divers, this trip takes you to the outer reef aboard a purpose-built dive vessel. You'll explore coral gardens teeming with clownfish, parrotfish, and giant clams, and visit sections known for regular sea turtle sightings. Marine biologist briefings between dives bring the reef ecosystem to life.",
    imagePath: "/images/trips/reef-discovery-intro.jpg",
    duration: "2 days / 4 dives",
    groupSize: "Max 8 divers",
    price: 499,
    originalPrice: 599,
    difficulty: "beginner",
    includes: [
      "4 guided boat dives on the outer reef",
      "All dive equipment and tanks",
      "Lunch and refreshments on board",
      "Marine biologist briefing",
      "Underwater photos of your dives",
    ],
    schedule: [
      {
        day: 1,
        title: "Outer Reef Introduction",
        description:
          "Depart Cairns marina at 7:30 AM. Two guided dives at Norman Reef with a surface interval on the sundeck. Return by 4:00 PM.",
      },
      {
        day: 2,
        title: "Coral Gardens & Turtle Encounter",
        description:
          "Head to Saxon Reef for two morning dives through coral gardens frequented by green sea turtles. Afternoon return with certificate.",
      },
    ],
    featured: true,
    availableDates: ["2026-06-15", "2026-07-20", "2026-08-10", "2026-09-05"],
  },
  {
    slug: "cod-hole-expedition",
    title: "Cod Hole & Ribbon Reefs Expedition",
    destinationSlug: "great-barrier-reef",
    description:
      "A five-day liveaboard to the legendary Cod Hole and Ribbon Reefs, featuring wall dives, night dives, and giant potato cod encounters.",
    longDescription:
      "This premium liveaboard expedition takes you to the remote northern Great Barrier Reef. The Ribbon Reefs offer pristine wall diving with dramatic drop-offs, while the Cod Hole delivers face-to-face encounters with giant potato cod weighing over 100 kilograms. Night dives reveal cuttlefish, Spanish dancers, and bioluminescent plankton.",
    imagePath: "/images/trips/cod-hole-expedition.jpg",
    duration: "5 days / 12 dives",
    groupSize: "Max 12 divers",
    price: 2299,
    difficulty: "intermediate",
    includes: [
      "12 guided dives including 2 night dives",
      "5 nights on a luxury liveaboard vessel",
      "All meals and non-alcoholic beverages",
      "Full dive equipment and nitrox",
      "Dive briefings and marine life ID sessions",
    ],
    schedule: [
      {
        day: 1,
        title: "Departure & Warm-up Dives",
        description:
          "Board the vessel in Cairns. Afternoon check-out dives on Hastings Reef to calibrate equipment and review skills.",
      },
      {
        day: 2,
        title: "Ribbon Reef Wall Dives",
        description:
          "Three dives along Ribbon Reef No. 9 and No. 10, featuring sheer walls, overhangs, and pelagic action.",
      },
      {
        day: 3,
        title: "The Cod Hole",
        description:
          "Two morning dives at the iconic Cod Hole followed by an afternoon dive at Pixie Pinnacle, a coral tower surrounded by glassfish.",
      },
      {
        day: 4,
        title: "Osprey Reef & Night Dive",
        description:
          "Full day at Osprey Reef with a dramatic shark-feed wall dive and an unforgettable night dive on the reef flat.",
      },
    ],
    featured: true,
    availableDates: ["2026-06-01", "2026-07-15", "2026-08-20"],
  },

  // --- Blue Hole, Belize ---
  {
    slug: "blue-hole-deep-dive",
    title: "Blue Hole Deep Dive Experience",
    destinationSlug: "blue-hole-belize",
    description:
      "Descend into the Great Blue Hole on this full-day advanced excursion, reaching stalactite formations at 40 meters alongside Caribbean reef sharks.",
    longDescription:
      "This is the dive that tops every advanced diver's wish list. A fast boat whisks you from Ambergris Caye to Lighthouse Reef, where you descend into the Great Blue Hole alongside Caribbean reef sharks. At 40 meters, ancient stalactites reveal themselves in your torch beam. Two additional dives on the surrounding atoll round out an extraordinary day.",
    imagePath: "/images/trips/blue-hole-deep-dive.jpg",
    duration: "1 day / 3 dives",
    groupSize: "Max 8 divers",
    price: 399,
    originalPrice: 475,
    difficulty: "advanced",
    includes: [
      "1 deep dive inside the Blue Hole (40m)",
      "2 reef dives on Lighthouse Reef atoll",
      "Fast boat transfers from Ambergris Caye",
      "Light breakfast and packed lunch",
    ],
    schedule: [
      {
        day: 1,
        title: "Blue Hole & Lighthouse Reef",
        description:
          "5:30 AM departure. Arrive at the Blue Hole for a 40-meter descent among stalactites and sharks. Two additional dives at Half Moon Caye Wall before returning by sunset.",
      },
    ],
    featured: true,
    availableDates: ["2026-04-10", "2026-05-08", "2026-06-12"],
  },
  {
    slug: "belize-reef-safari",
    title: "Belize Barrier Reef Safari",
    destinationSlug: "blue-hole-belize",
    description:
      "A three-day tour of the Belize Barrier Reef with wall dives, drift dives, and a mangrove snorkel session.",
    longDescription:
      "Explore the western hemisphere's largest barrier reef over three unforgettable days. Dive the dramatic walls of Turneffe Atoll, drift through channels with eagle rays and nurse sharks, and snorkel mangrove nurseries where baby barracuda and seahorses hide among the roots. Evenings are spent at a boutique island lodge.",
    imagePath: "/images/trips/belize-reef-safari.jpg",
    duration: "3 days / 7 dives",
    groupSize: "Max 10 divers",
    price: 899,
    difficulty: "intermediate",
    includes: [
      "7 guided boat dives across three atolls",
      "2 nights accommodation at island lodge",
      "All meals and soft drinks",
      "Mangrove snorkel excursion",
      "Dive equipment and tanks",
    ],
    schedule: [
      {
        day: 1,
        title: "Turneffe Atoll Walls",
        description:
          "Boat transfer from Belize City. Two afternoon wall dives at Turneffe Atoll with eagle rays and turtles.",
      },
      {
        day: 2,
        title: "Drift Dives & Mangroves",
        description:
          "Morning drift dives through the channel. Afternoon mangrove snorkel session with marine biology guide.",
      },
      {
        day: 3,
        title: "South Water Caye",
        description:
          "Three dives at South Water Caye Marine Reserve for staghorn coral and nurse sharks. Return to mainland by 5 PM.",
      },
    ],
    featured: false,
    availableDates: ["2026-04-20", "2026-05-18", "2026-06-22"],
  },

  // --- Red Sea, Egypt ---
  {
    slug: "thistlegorm-wreck-dive",
    title: "SS Thistlegorm Wreck Dive",
    destinationSlug: "red-sea-egypt",
    description:
      "Dive the legendary SS Thistlegorm, a WWII cargo ship resting at 30 meters with motorcycles, trucks, and munitions frozen in time.",
    longDescription:
      "The SS Thistlegorm is widely regarded as one of the top five wreck dives in the world. Sunk in 1941, this 128-meter British vessel still holds its wartime cargo — BSA motorcycles, Bedford trucks, and railway locomotives — all encrusted with coral and swarming with glassfish. This trip includes penetration dives and surrounding reef dives.",
    imagePath: "/images/trips/thistlegorm-wreck-dive.jpg",
    duration: "2 days / 5 dives",
    groupSize: "Max 8 divers",
    price: 549,
    difficulty: "intermediate",
    includes: [
      "3 dives on the SS Thistlegorm",
      "2 reef dives at Ras Mohammed",
      "Overnight on a day boat with cabin",
      "All meals on board",
    ],
    schedule: [
      {
        day: 1,
        title: "SS Thistlegorm – Exterior & Holds",
        description:
          "Depart Sharm el-Sheikh at dawn. Two dives exploring the exterior and main cargo holds. Overnight anchored at the wreck site.",
      },
      {
        day: 2,
        title: "Penetration Dive & Ras Mohammed",
        description:
          "Early morning penetration dive into the engine room. Afternoon dives at Shark Reef and Yolanda Reef before returning to port.",
      },
    ],
    featured: true,
    availableDates: [
      "2026-03-15",
      "2026-04-22",
      "2026-09-10",
      "2026-10-18",
    ],
  },
  {
    slug: "red-sea-dolphin-reef",
    title: "Dolphins & Reefs of the Red Sea",
    destinationSlug: "red-sea-egypt",
    description:
      "A beginner-friendly three-day Red Sea adventure combining easy reef dives with a dolphin encounter at Sha'ab El Erg.",
    longDescription:
      "Designed for newly certified divers, this trip features gentle currents and warm, clear water. The resident pod of spinner dolphins at Sha'ab El Erg provides encounters you'll never forget, while reef dives at the Straits of Tiran deliver walls of soft coral and clouds of anthias.",
    imagePath: "/images/trips/red-sea-dolphin-reef.jpg",
    duration: "3 days / 6 dives",
    groupSize: "Max 10 divers",
    price: 399,
    originalPrice: 499,
    difficulty: "beginner",
    includes: [
      "6 guided boat dives",
      "Dolphin house snorkel session",
      "All dive equipment and tanks",
      "Daily lunch and refreshments",
    ],
    schedule: [
      {
        day: 1,
        title: "Tiran Strait Reefs",
        description:
          "Two gentle dives at Jackson Reef and Gordon Reef in the Straits of Tiran. Soft corals and schooling fish in calm conditions.",
      },
      {
        day: 2,
        title: "Dolphin Encounter",
        description:
          "Morning snorkel with spinner dolphins at Sha'ab El Erg, followed by two reef dives at Giftun Island.",
      },
      {
        day: 3,
        title: "South Coast Gems",
        description:
          "Two dives at Erg Sabina and Abu Ramada, known for moray eels, octopuses, and beautiful table corals.",
      },
    ],
    featured: false,
    availableDates: ["2026-03-20", "2026-05-05", "2026-10-01"],
  },

  // --- Cenotes, Mexico ---
  {
    slug: "cenote-cavern-explorer",
    title: "Cenote Cavern Explorer",
    destinationSlug: "cenotes-mexico",
    description:
      "Dive three of the Yucatán's most spectacular cenotes in two days, gliding through sunlit caverns and ancient stalactite galleries.",
    longDescription:
      "Over two days you'll explore Dos Ojos with its crystal-clear twin pools, Cenote Angelita with its eerie underwater hydrogen sulfide river, and Gran Cenote where beams of light cut through jungle canopy into turquoise pools. All dives stay within the cavern zone with natural light visible at all times.",
    imagePath: "/images/trips/cenote-cavern-explorer.jpg",
    duration: "2 days / 5 dives",
    groupSize: "Max 6 divers",
    price: 599,
    difficulty: "intermediate",
    includes: [
      "5 guided cavern dives across 3 cenotes",
      "All tanks, weights, and torches",
      "Cenote entrance fees",
      "Hotel pickup in Tulum",
      "Lunch and snacks both days",
    ],
    schedule: [
      {
        day: 1,
        title: "Dos Ojos & Cenote Angelita",
        description:
          "Morning dives in both lines of Dos Ojos. Afternoon dive at Cenote Angelita to witness the surreal halocline cloud.",
      },
      {
        day: 2,
        title: "Gran Cenote & The Pit",
        description:
          "Two morning dives: the light-show caverns of Gran Cenote followed by a deeper dive at The Pit, one of the Yucatán's most dramatic sinkholes.",
      },
    ],
    featured: true,
    availableDates: ["2026-01-12", "2026-02-09", "2026-11-16", "2026-12-14"],
  },
  {
    slug: "cenote-snorkel-intro",
    title: "Cenotes Snorkel & Intro Dive",
    destinationSlug: "cenotes-mexico",
    description:
      "A gentle half-day introduction to cenote diving, perfect for beginners, combining snorkeling with a shallow discover-scuba dive.",
    longDescription:
      "Start with a guided snorkel through the sunlit shallows of Gran Cenote, spotting turtles among the lily pads. Then descend on a discover-scuba dive to 10 meters inside the cavern, where stalactites glow in your torch beam and the halocline shimmers like an underwater mirage.",
    imagePath: "/images/trips/cenote-snorkel-intro.jpg",
    duration: "Half day / 1 dive + snorkel",
    groupSize: "Max 4 divers",
    price: 199,
    difficulty: "beginner",
    includes: [
      "1 guided snorkel session",
      "1 discover-scuba cavern dive (10m max)",
      "All equipment including wetsuit and torch",
      "Cenote entrance fees",
    ],
    schedule: [
      {
        day: 1,
        title: "Gran Cenote Experience",
        description:
          "Pickup from Tulum at 8 AM. Snorkel session followed by a safety briefing and guided discover-scuba dive. Return by 1 PM.",
      },
    ],
    featured: false,
    availableDates: ["2026-01-10", "2026-02-07", "2026-11-14", "2026-12-12"],
  },

  // --- Maldives ---
  {
    slug: "maldives-manta-voyage",
    title: "Maldives Manta Ray Voyage",
    destinationSlug: "maldives",
    description:
      "A four-day liveaboard through the central atolls focused on manta ray encounters, whale shark snorkels, and pristine coral reefs.",
    longDescription:
      "Timed to coincide with the plankton bloom, this liveaboard takes you to cleaning stations where manta rays gather in large numbers. Dive alongside these gentle giants at Hanifaru Bay, explore thilas buzzing with reef life, and snorkel with whale sharks in the South Ari Atoll. Star-filled evenings on deck complete the experience.",
    imagePath: "/images/trips/maldives-manta-voyage.jpg",
    duration: "4 days / 10 dives",
    groupSize: "Max 12 divers",
    price: 1999,
    originalPrice: 2499,
    difficulty: "beginner",
    includes: [
      "10 guided dives and 2 snorkel sessions",
      "4 nights on a liveaboard dhoni",
      "All meals and non-alcoholic beverages",
      "Whale shark snorkel excursion",
      "Full dive equipment and nitrox",
    ],
    schedule: [
      {
        day: 1,
        title: "South Malé Atoll",
        description:
          "Board the vessel in Malé. Afternoon check-out dives on Vaavu Atoll house reef.",
      },
      {
        day: 2,
        title: "Manta Cleaning Stations",
        description:
          "Three dives at known manta cleaning stations. Patient waiting at depth is rewarded with fly-bys of rays with 4-meter wingspans.",
      },
      {
        day: 3,
        title: "Whale Sharks & Thilas",
        description:
          "Morning snorkel search for whale sharks in South Ari Atoll. Afternoon thila dives with napoleon wrasse and whitetip reef sharks.",
      },
      {
        day: 4,
        title: "North Malé Highlights",
        description:
          "Final dives at Banana Reef and HP Reef before returning to Malé by noon.",
      },
    ],
    featured: true,
    availableDates: ["2026-01-20", "2026-02-17", "2026-03-21"],
  },
  {
    slug: "maldives-house-reef-retreat",
    title: "Maldives House Reef Retreat",
    destinationSlug: "maldives",
    description:
      "A relaxed five-day resort package with unlimited house reef diving, two guided boat dives, and a sunset dolphin cruise.",
    longDescription:
      "For divers who prefer comfort and flexibility, this resort-based package offers unlimited house reef diving just steps from your overwater bungalow, guided boat dives to channels with grey reef sharks, and a sunset dolphin cruise. Designed for relaxation as much as for underwater adventure.",
    imagePath: "/images/trips/maldives-house-reef-retreat.jpg",
    duration: "5 days / unlimited + 2 boat dives",
    groupSize: "Max 8 divers",
    price: 1699,
    difficulty: "beginner",
    includes: [
      "Unlimited house reef diving",
      "2 guided boat dives to channel sites",
      "Sunset dolphin cruise",
      "5 nights in overwater bungalow with breakfast",
    ],
    schedule: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description:
          "Seaplane transfer to the resort. Orientation dive on the house reef with the resident dive guide.",
      },
      {
        day: 2,
        title: "Channel Boat Dive",
        description:
          "Morning boat dive for grey reef sharks and eagle rays. Afternoon free for house reef diving.",
      },
      {
        day: 3,
        title: "Free Diving Day & Dolphin Cruise",
        description:
          "Explore the house reef at your own pace. Late afternoon sunset dolphin cruise through the atoll lagoon.",
      },
    ],
    featured: false,
    availableDates: ["2026-01-15", "2026-02-12", "2026-03-19", "2026-04-16"],
  },

  // --- Raja Ampat ---
  {
    slug: "raja-ampat-biodiversity-cruise",
    title: "Raja Ampat Biodiversity Cruise",
    destinationSlug: "raja-ampat",
    description:
      "A seven-day liveaboard through Raja Ampat, visiting Cape Kri, Manta Sandy, and the Dampier Strait for unrivaled marine biodiversity.",
    longDescription:
      "Over seven days aboard a traditional Indonesian phinisi schooner, you'll dive sites that hold world records for fish species counts. Cape Kri, where 374 species were recorded on a single dive, is the crown jewel. Strong currents reward experienced divers with non-stop pelagic action, from schools of barracuda to patrolling blacktip sharks.",
    imagePath: "/images/trips/raja-ampat-biodiversity-cruise.jpg",
    duration: "7 days / 18 dives",
    groupSize: "Max 10 divers",
    price: 2499,
    difficulty: "advanced",
    includes: [
      "18 guided dives including night dives",
      "7 nights on a traditional phinisi liveaboard",
      "All meals, snacks, and soft drinks",
      "Full dive equipment, nitrox, and torches",
      "Raja Ampat marine park entry permit",
    ],
    schedule: [
      {
        day: 1,
        title: "Sorong to Dampier Strait",
        description:
          "Board the vessel in Sorong. Transit to the Dampier Strait with an afternoon check-out dive.",
      },
      {
        day: 2,
        title: "Cape Kri & Sardine Reef",
        description:
          "Three dives at Cape Kri and Sardine Reef. An overwhelming parade of reef fish, trevally, and barracuda.",
      },
      {
        day: 3,
        title: "Manta Sandy & Arborek",
        description:
          "Morning dives at Manta Sandy for reef manta encounters. Afternoon macro dive at Arborek jetty for pygmy seahorses.",
      },
      {
        day: 4,
        title: "Misool & Fiabacet",
        description:
          "Full day exploring southern reaches: soft coral wonderlands at Fiabacet and the dramatic boulders of Boo Windows.",
      },
    ],
    featured: false,
    availableDates: ["2026-10-15", "2026-11-12", "2026-12-10"],
  },
  {
    slug: "raja-ampat-macro-photography",
    title: "Raja Ampat Macro Photography Workshop",
    destinationSlug: "raja-ampat",
    description:
      "A five-day photography-focused trip with a professional underwater photographer, targeting pygmy seahorses, nudibranchs, and the walking shark.",
    longDescription:
      "Designed for divers with cameras, this workshop pairs you with an award-winning underwater photographer for five days of targeted macro diving. Learn advanced lighting, composition in current, and post-processing while diving the richest macro sites on the planet. Night dives for the endemic walking shark are a highlight.",
    imagePath: "/images/trips/raja-ampat-macro-photography.jpg",
    duration: "5 days / 14 dives",
    groupSize: "Max 6 divers",
    price: 1899,
    originalPrice: 2199,
    difficulty: "advanced",
    includes: [
      "14 guided dives including 3 night dives",
      "5 nights on a liveaboard vessel",
      "All meals and beverages",
      "Daily photo review and editing sessions",
      "Professional photographer guide",
    ],
    schedule: [
      {
        day: 1,
        title: "Gear Setup & Test Dives",
        description:
          "Board in Sorong. Camera setup workshop and two test dives to dial in strobe positioning.",
      },
      {
        day: 2,
        title: "Pygmy Seahorse Hunt",
        description:
          "Three dives targeting sea-fan habitats of pygmy seahorses. Evening photo review session.",
      },
      {
        day: 3,
        title: "Muck & Night Dives",
        description:
          "Daytime muck dives for frogfish and blue-ringed octopus. Night dive to spot the endemic walking shark.",
      },
      {
        day: 4,
        title: "Nudibranch Alley & Wide Angle",
        description:
          "Morning macro dives on nudibranch-rich slopes. Afternoon switch to wide-angle for schooling fish at Cape Kri.",
      },
    ],
    featured: true,
    availableDates: ["2026-10-22", "2026-11-19", "2026-12-17"],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getTripsByDestination(destinationSlug: string): Trip[] {
  return trips.filter((t) => t.destinationSlug === destinationSlug);
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter((t) => t.featured);
}
