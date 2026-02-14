"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/salesforce/AuthContext";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const { handleCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    const errorDesc = searchParams.get("error_description");

    if (errorParam) {
      setError(errorDesc || errorParam);
      return;
    }

    if (!code) {
      setError("No authorization code received.");
      return;
    }

    handleCallback(code)
      .then(() => {
        const returnUrl =
          sessionStorage.getItem("sf_return_url") || "/";
        sessionStorage.removeItem("sf_return_url");
        window.location.href = returnUrl;
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Authentication failed");
      });
  }, [searchParams, handleCallback]);

  if (error) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Container className="max-w-md text-center">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral-100 text-3xl text-coral-600">
              &#10007;
            </div>
            <h1 className="text-xl font-bold text-ocean-900">
              Authentication Failed
            </h1>
            <p className="mt-2 text-ocean-600">{error}</p>
            <a
              href="/auth/login"
              className="mt-6 inline-block rounded-lg bg-ocean-600 px-6 py-3 font-semibold text-white hover:bg-ocean-700"
            >
              Try Again
            </a>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Container className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
        <p className="mt-4 text-ocean-600">Completing sign in&hellip;</p>
      </Container>
    </section>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Container className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
            <p className="mt-4 text-ocean-600">Loading&hellip;</p>
          </Container>
        </section>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
