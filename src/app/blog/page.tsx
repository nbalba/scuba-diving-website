import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Dive Blog",
  description:
    "Tips, guides, and stories from the underwater world. Your resource for all things scuba diving.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-800 to-deep-800 py-24">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Dive Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ocean-200">
            Tips, guides, and stories from beneath the surface.
          </p>
        </Container>
      </section>

      {/* Posts */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Latest Posts"
            subtitle="Insights and advice for divers of all levels"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
