"use client";

import { Map, Ship, FileText, Star, CalendarCheck, Mail } from "lucide-react";
import { destinations } from "@/data/destinations";
import { trips } from "@/data/trips";
import { blogPosts } from "@/data/blog-posts";
import { testimonials } from "@/data/testimonials";

const stats = [
  {
    label: "Destinations",
    count: destinations.length,
    icon: Map,
    href: "/admin/destinations",
    color: "bg-ocean-500",
  },
  {
    label: "Trips",
    count: trips.length,
    icon: Ship,
    href: "/admin/trips",
    color: "bg-deep-500",
  },
  {
    label: "Blog Posts",
    count: blogPosts.length,
    icon: FileText,
    href: "/admin/blog",
    color: "bg-ocean-700",
  },
  {
    label: "Testimonials",
    count: testimonials.length,
    icon: Star,
    href: "/admin/testimonials",
    color: "bg-sand-500",
  },
  {
    label: "Bookings",
    count: 0,
    icon: CalendarCheck,
    href: "/admin/bookings",
    color: "bg-coral-500",
  },
  {
    label: "Contacts",
    count: 0,
    icon: Mail,
    href: "/admin/contacts",
    color: "bg-deep-700",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ocean-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ocean-900">{stat.count}</p>
              <p className="text-sm text-ocean-500">{stat.label}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
