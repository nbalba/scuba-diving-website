import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-ocean-400 to-deep-600">
        {post.imagePath && (
          <Image
            src={post.imagePath}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
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
