import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="text-8xl font-extrabold text-ocean-200">404</p>
        <h1 className="mt-4 text-3xl font-bold text-ocean-900">
          Page Not Found
        </h1>
        <p className="mt-2 text-lg text-ocean-600">
          Looks like this page has drifted into deeper waters.
        </p>
        <div className="mt-8">
          <Button href="/">Back to Surface</Button>
        </div>
      </Container>
    </section>
  );
}
