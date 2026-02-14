import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/booking/BookingForm";
import TripSummary from "@/components/booking/TripSummary";

export const metadata: Metadata = {
  title: "Book a Dive",
  description:
    "Book your next scuba diving adventure with DeepBlue Diving. Choose from trips worldwide.",
};

export default function BookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-800 to-deep-800 py-24">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Book Your Dive
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ocean-200">
            Fill out the form below and we&apos;ll confirm your booking within
            24 hours.
          </p>
        </Container>
      </section>

      {/* Form */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Suspense>
                <BookingForm />
              </Suspense>
            </div>
            <div>
              <Suspense>
                <TripSummary />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
