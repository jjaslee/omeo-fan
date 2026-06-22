"use client";

import { useState } from "react";

interface ContactFormProps {
  agentName: string;
}

export function ContactForm({ agentName }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-sky/30 px-8 py-12 text-center">
        <p className="font-serif text-2xl text-navy">Thank You</p>
        <p className="mt-3 text-sm text-foreground/70">
          Your message has been received. {agentName} will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs tracking-wider text-navy/60 uppercase">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-sand bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs tracking-wider text-navy/60 uppercase">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-sand bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs tracking-wider text-navy/60 uppercase">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full border border-sand bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="interest" className="mb-2 block text-xs tracking-wider text-navy/60 uppercase">
            Interested In
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full border border-sand bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          >
            <option value="">Select...</option>
            <option value="buying">Buying</option>
            <option value="selling">Selling</option>
            <option value="both">Buying & Selling</option>
            <option value="renting">Renting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs tracking-wider text-navy/60 uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none border border-sand bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-foreground/60">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          I agree to be contacted by {agentName} via call, email, and text for
          real estate services. Message and data rates may apply.
        </span>
      </label>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send Message
      </button>
    </form>
  );
}
