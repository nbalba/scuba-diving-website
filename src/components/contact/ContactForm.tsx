"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.subject) errs.subject = "Please select a subject";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  }

  function update(field: string, value: string) {
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
        <h3 className="text-2xl font-bold text-ocean-900">Message Sent!</h3>
        <p className="mt-2 text-ocean-600">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
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
      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass}>Subject *</label>
        <select
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={inputClass}
        >
          <option value="">Select a subject...</option>
          <option value="general">General Inquiry</option>
          <option value="booking">Booking Question</option>
          <option value="group">Group Booking</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && <p className={errorClass}>{errors.subject}</p>}
      </div>

      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="How can we help you?"
          className={inputClass}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-ocean-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
}
