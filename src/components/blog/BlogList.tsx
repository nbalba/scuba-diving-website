"use client";

import BlogCard from "@/components/blog/BlogCard";
import { blogPosts as staticPosts } from "@/data/blog-posts";
import { fetchBlogPosts } from "@/lib/salesforce/queries";
import { useSalesforceQuery } from "@/hooks/useSalesforceQuery";

export default function BlogList() {
  const { data: posts, loading } = useSalesforceQuery(
    fetchBlogPosts,
    staticPosts
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
