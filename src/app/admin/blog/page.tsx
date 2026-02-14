"use client";

import type { BlogPost } from "@/lib/types";
import AdminTable from "@/components/admin/AdminTable";
import { blogPosts as staticPosts } from "@/data/blog-posts";
import { fetchBlogPosts } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";
import { formatDate } from "@/lib/utils";

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  {
    key: "publishedAt",
    label: "Published",
    render: (p: BlogPost) => formatDate(p.publishedAt),
  },
  {
    key: "tags",
    label: "Tags",
    render: (p: BlogPost) => p.tags.join(", "),
  },
];

export default function AdminBlog() {
  const { data: posts, loading } = useSalesforceQuery(
    fetchBlogPosts,
    staticPosts
  );

  return (
    <AdminTable
      title="Blog Posts"
      columns={columns}
      data={posts || []}
      getKey={(p) => p.slug}
      loading={loading}
    />
  );
}
