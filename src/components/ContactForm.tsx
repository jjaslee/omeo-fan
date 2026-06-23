"use client";

import { useState } from "react";

interface ContactFormProps {
  agentName: string;
  defaultInterest?: string;
}

const interestOptions = [
  { value: "buying", label: "Buying a home" },
  { value: "selling", label: "Selling a home" },
  { value: "valuation", label: "Home valuation" },
  { value: "relocation", label: "Relocation guidance" },
  { value: "both", label: "Buying & selling" },
  { value: "other", label: "Other inquiry" },
];

export function ContactForm({
  agentName,
  defaultInterest = "",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // CLIENT: Connect form to email service or CRM (e.g. Resend, Formspree, HubSpot)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-sky/30 px-8 py-12 text-center">
        <p className="font-serif text-2xl text-navy">Thank You</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          Your consultation request has been received. {agentName} will be in
          touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-navy md:text-3xl">
          Request a Consultation
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          Share a few details and {agentName} will follow up to discuss your
          Oʻahu real estate goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
            />
          </Field>
          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Phone"
            htmlFor="phone"
            hint="Optional — for faster follow-up"
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(808) 555-0100"
              className={inputClass}
            />
          </Field>
          <Field label="I'm interested in" htmlFor="interest" required>
            <select
              id="interest"
              name="interest"
              required
              defaultValue={defaultInterest}
              className={inputClass}
            >
              <option value="" disabled>
                Select a topic...
              </option>
              {interestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Message"
          htmlFor="message"
          hint="Tell us about your timeline, preferred areas, or any questions"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="How can we help you with Oʻahu real estate?"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <label className="flex items-start gap-3 rounded-sm border border-sand bg-sky/20 px-4 py-4 text-xs leading-relaxed text-foreground/60">
          <input type="checkbox" required className="mt-0.5 shrink-0" />
          <span>
            I agree to be contacted by {agentName} via call, email, and text
            regarding real estate services. Message and data rates may apply.
          </span>
        </label>

        <button type="submit" className="btn-primary w-full py-4 sm:w-auto">
          Send Consultation Request
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full border border-sand bg-white px-4 py-3.5 text-sm text-navy placeholder:text-foreground/30 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium tracking-wider text-navy/70 uppercase"
      >
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-foreground/45">{hint}</p>}
    </div>
  );
}
