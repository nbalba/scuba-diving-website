"use client";

import { useEffect } from "react";
import { Waves } from "lucide-react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/salesforce/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-ocean-50 to-deep-50">
      <Container className="max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <Waves className="mx-auto mb-3 h-10 w-10 text-ocean-500" />
            <h1 className="text-2xl font-bold text-ocean-900">
              Welcome Back
            </h1>
            <p className="mt-1 text-ocean-600">
              Sign in to manage your bookings and access exclusive content.
            </p>
          </div>

          <button
            onClick={login}
            className="w-full rounded-lg bg-ocean-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
          >
            Sign in with Salesforce
          </button>

          <p className="mt-6 text-center text-sm text-ocean-500">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-ocean-700 hover:text-ocean-900"
            >
              Sign up
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
