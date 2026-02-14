"use client";

import { Waves } from "lucide-react";
import Container from "@/components/ui/Container";
import { SF_CONFIG } from "@/lib/salesforce/config";
import { useAuth } from "@/lib/salesforce/AuthContext";

export default function SignupPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const communitySignupUrl = SF_CONFIG.communityUrl
    ? `${SF_CONFIG.communityUrl}/SelfRegister`
    : "#";

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-ocean-50 to-deep-50">
      <Container className="max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <Waves className="mx-auto mb-3 h-10 w-10 text-ocean-500" />
            <h1 className="text-2xl font-bold text-ocean-900">
              Create an Account
            </h1>
            <p className="mt-1 text-ocean-600">
              Join DeepBlue Diving to book trips and track your dive adventures.
            </p>
          </div>

          <a
            href={communitySignupUrl}
            className="block w-full rounded-lg bg-ocean-600 px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
          >
            Sign up with Salesforce
          </a>

          <p className="mt-6 text-center text-sm text-ocean-500">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-ocean-700 hover:text-ocean-900"
            >
              Sign in
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
