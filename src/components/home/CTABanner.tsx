import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-ocean-700 to-deep-700 py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Dive In?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ocean-200">
          Whether you&apos;re a first-time diver or a seasoned explorer, we have
          the perfect underwater adventure waiting for you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/booking" variant="coral" size="lg">
            Book Your Adventure
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
