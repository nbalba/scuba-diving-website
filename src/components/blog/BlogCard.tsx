import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-ocean-400 to-deep-600 flex items-center justify-center text-sm text-white/40">
        {post.title}
      </div>

      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 text-lg font-bold text-ocean-900 transition-colors group-hover:text-ocean-600">
          {post.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-ocean-600">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-ocean-500">
          <span>{post.author}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
