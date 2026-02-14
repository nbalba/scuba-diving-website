"use client";

import type { Testimonial } from "@/lib/types";
import AdminTable from "@/components/admin/AdminTable";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { fetchTestimonials } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";

const columns = [
  { key: "name", label: "Name" },
  { key: "location", label: "Location" },
  {
    key: "quote",
    label: "Quote",
    render: (t: Testimonial) =>
      t.quote.length > 80 ? t.quote.slice(0, 80) + "..." : t.quote,
  },
  { key: "rating", label: "Rating" },
  {
    key: "tripSlug",
    label: "Trip",
    render: (t: Testimonial) => t.tripSlug || "—",
  },
];

export default function AdminTestimonials() {
  const { data: testimonials, loading } = useSalesforceQuery(
    fetchTestimonials,
    staticTestimonials
  );

  return (
    <AdminTable
      title="Testimonials"
      columns={columns}
      data={testimonials || []}
      getKey={(t) => t.name}
      loading={loading}
    />
  );
}
