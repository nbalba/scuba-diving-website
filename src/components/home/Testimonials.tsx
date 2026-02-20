import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-ocean-50 py-20">
      <Container>
        <SectionHeading
          title="What Our Divers Say"
          subtitle="Hear from adventurers who've explored the deep with us"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-sand-400 text-sand-400"
                        : "fill-ocean-100 text-ocean-100"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-4 text-ocean-700 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-ocean-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-ocean-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
