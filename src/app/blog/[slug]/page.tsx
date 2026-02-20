import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import {
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/salesforce/server-queries";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-800 to-deep-800 py-24">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-deep-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-ocean-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-ocean-300">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="relative mb-10 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-ocean-400 to-deep-600">
            {post.imagePath && (
              <Image
                src={post.imagePath}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            )}
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-ocean-900 prose-p:text-ocean-700 prose-a:text-ocean-600 prose-strong:text-ocean-900 prose-li:text-ocean-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-ocean-50 py-20">
          <Container>
            <h2 className="mb-8 text-center text-2xl font-bold text-ocean-900">
              Related Posts
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
