"use client";

import type { Trip } from "@/lib/types";
import AdminTable from "@/components/admin/AdminTable";
import { trips as staticTrips } from "@/data/trips";
import { fetchTrips } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";
import { formatPrice } from "@/lib/utils";

const columns = [
  { key: "title", label: "Title" },
  { key: "destinationSlug", label: "Destination" },
  {
    key: "price",
    label: "Price",
    render: (t: Trip) => formatPrice(t.price),
  },
  { key: "duration", label: "Duration" },
  {
    key: "difficulty",
    label: "Difficulty",
    render: (t: Trip) => (
      <span className="rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium capitalize text-ocean-700">
        {t.difficulty}
      </span>
    ),
  },
  {
    key: "featured",
    label: "Featured",
    render: (t: Trip) => (t.featured ? "Yes" : "No"),
  },
];

export default function AdminTrips() {
  const { data: trips, loading } = useSalesforceQuery(fetchTrips, staticTrips);

  return (
    <AdminTable
      title="Trips"
      columns={columns}
      data={trips || []}
      getKey={(t) => t.slug}
      loading={loading}
    />
  );
}
