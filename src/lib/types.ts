export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  longDescription: string;
  imagePath: string;
  highlights: string[];
  bestSeason: string;
  waterTemp: string;
  visibility: string;
  maxDepth: string;
  difficulty: DifficultyLevel;
  featured: boolean;
}

export interface ScheduleDay {
  day: number;
  title: string;
  description: string;
}

export interface Trip {
  slug: string;
  title: string;
  destinationSlug: string;
  description: string;
  longDescription: string;
  imagePath: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  difficulty: DifficultyLevel;
  includes: string[];
  schedule: ScheduleDay[];
  featured: boolean;
  availableDates: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imagePath: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  tripSlug?: string;
}

export interface BookingFormData {
  tripSlug: string;
  preferredDate: string;
  numberOfDivers: number;
  certificationLevel: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
