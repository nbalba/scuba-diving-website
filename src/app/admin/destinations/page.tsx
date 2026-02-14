"use client";

import type { Destination } from "@/lib/types";
import AdminTable from "@/components/admin/AdminTable";
import { destinations as staticDestinations } from "@/data/destinations";
import { fetchDestinations } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";

const columns = [
  { key: "name", label: "Name" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  {
    key: "difficulty",
    label: "Difficulty",
    render: (d: Destination) => (
      <span className="rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium capitalize text-ocean-700">
        {d.difficulty}
      </span>
    ),
  },
  {
    key: "featured",
    label: "Featured",
    render: (d: Destination) => (d.featured ? "Yes" : "No"),
  },
];

export default function AdminDestinations() {
  const { data: destinations, loading } = useSalesforceQuery(
    fetchDestinations,
    staticDestinations
  );

  return (
    <AdminTable
      title="Destinations"
      columns={columns}
      data={destinations || []}
      getKey={(d) => d.slug}
      loading={loading}
    />
  );
}
