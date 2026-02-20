import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/types";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
