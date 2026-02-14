"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { trips } from "@/data/trips";
import { useAuth } from "@/lib/salesforce/AuthContext";
import { sfCreate } from "@/lib/salesforce/client";
import { toSfBooking } from "@/lib/salesforce/mappers";
import { USE_SALESFORCE } from "@/lib/salesforce/config";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedTrip = searchParams.get("trip") || "";
  const { accessToken, instanceUrl } = useAuth();

  const [form, setForm] = useState({
    tripSlug: preselectedTrip,
    preferredDate: "",
    numberOfDivers: 1,
    certificationLevel: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.tripSlug) errs.tripSlug = "Please select a trip";
    if (!form.preferredDate) errs.preferredDate = "Please select a date";
    if (!form.certificationLevel)
      errs.certificationLevel = "Please select your level";
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (USE_SALESFORCE && accessToken && instanceUrl) {
      setSubmitting(true);
      try {
        await sfCreate(
          "Booking__c",
          toSfBooking({
            preferredDate: form.preferredDate,
            numberOfDivers: form.numberOfDivers,
            certificationLevel: form.certificationLevel,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            specialRequests: form.specialRequests,
          }),
          accessToken,
          instanceUrl
        );
      } catch (err) {
        setErrors({ submit: err instanceof Error ? err.message : "Submission failed. Please try again." });
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    }

    setSubmitted(true);
  }

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-deep-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-deep-500 text-3xl text-white">
          &#10003;
        </div>
        <h3 className="text-2xl font-bold text-ocean-900">
          Booking Request Received!
        </h3>
        <p className="mt-2 text-ocean-600">
          Thank you, {form.firstName}! We&apos;ll confirm your booking within 24
          hours at {form.email}.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-ocean-200 px-4 py-2.5 text-ocean-900 placeholder:text-ocean-400 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none";
  const labelClass = "mb-1 block text-sm font-medium text-ocean-700";
  const errorClass = "mt-1 text-xs text-coral-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trip Selection */}
      <div>
        <label className={labelClass}>Select Trip *</label>
        <select
          value={form.tripSlug}
          onChange={(e) => update("tripSlug", e.target.value)}
          className={inputClass}
        >
          <option value="">Choose a trip...</option>
          {trips.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
            </option>
          ))}
        </select>
        {errors.tripSlug && <p className={errorClass}>{errors.tripSlug}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Preferred Date */}
        <div>
          <label className={labelClass}>Preferred Date *</label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className={inputClass}
          />
          {errors.preferredDate && (
            <p className={errorClass}>{errors.preferredDate}</p>
          )}
        </div>

        {/* Number of Divers */}
        <div>
          <label className={labelClass}>Number of Divers</label>
          <input
            type="number"
            min={1}
            max={12}
            value={form.numberOfDivers}
            onChange={(e) =>
              update("numberOfDivers", parseInt(e.target.value) || 1)
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Certification Level */}
      <div>
        <label className={labelClass}>Certification Level *</label>
        <select
          value={form.certificationLevel}
          onChange={(e) => update("certificationLevel", e.target.value)}
          className={inputClass}
        >
          <option value="">Select your level...</option>
          <option value="none">No certification (Discover Scuba)</option>
          <option value="open-water">Open Water Diver</option>
          <option value="advanced">Advanced Open Water</option>
          <option value="rescue">Rescue Diver</option>
          <option value="divemaster">Divemaster / Instructor</option>
        </select>
        {errors.certificationLevel && (
          <p className={errorClass}>{errors.certificationLevel}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>First Name *</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="John"
            className={inputClass}
          />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Doe"
            className={inputClass}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@example.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={inputClass}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className={labelClass}>Special Requests</label>
        <textarea
          value={form.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          rows={3}
          placeholder="Any dietary requirements, medical conditions, or special requests..."
          className={inputClass}
        />
      </div>

      {errors.submit && (
        <p className="rounded-lg bg-coral-50 p-3 text-sm text-coral-600">
          {errors.submit}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-coral-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Booking Request"}
      </button>
    </form>
  );
}
