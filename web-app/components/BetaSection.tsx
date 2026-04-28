/**
 * Purpose: Beta access request form section
 * Used in: app/page.tsx
 * Dependencies: Input element, Select element, Button element, react-icons
 */

"use client";

import { useState } from "react";
import { MdCelebration } from "react-icons/md";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Button from "./elements/Button";

/**
 * Component: BetaSection
 * Description: Renders the beta signup form with name, occupation, use case, and email fields
 * Props: none
 */

const occupationOptions = [
  { value: "student", label: "Student" },
  { value: "content-creator", label: "Content Creator" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

const useCaseOptions = [
  { value: "content-creation", label: "Content Creation" },
  { value: "services", label: "Services" },
  { value: "audiobooks", label: "Audiobooks" },
];

interface FormState {
  name: string;
  occupation: string;
  useCase: string;
  email: string;
}

export default function BetaSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    occupation: "",
    useCase: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to backend/service
    setSubmitted(true);
  }

  return (
    <section
      id="beta"
      className="py-24 max-w-[1200px] mx-auto px-6"
      aria-labelledby="beta-heading"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="beta-heading"
            className="text-3xl md:text-4xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Be the First to Experience the Future of AI Voice
          </h2>
          <p
            className="text-[#a1a1aa]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We are launching soon. Request early access and we will reach out when it is ready.
          </p>
        </div>

        {submitted ? (
          <div
            className="p-8 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-center"
            role="alert"
          >
            <MdCelebration
              size={40}
              className="text-[#16A34A] mx-auto mb-4"
              aria-hidden="true"
            />
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              You are on the list!
            </h3>
            <p
              className="text-[#a1a1aa] text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We will reach out to {form.email} when beta access opens.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-[#282828] border border-white/5 space-y-5"
            noValidate
          >
            <Input
              id="name"
              name="name"
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Select
              id="occupation"
              name="occupation"
              label="Occupation"
              value={form.occupation}
              onChange={handleChange}
              options={occupationOptions}
              required
            />
            <Select
              id="useCase"
              name="useCase"
              label="Use Case"
              value={form.useCase}
              onChange={handleChange}
              options={useCaseOptions}
              required
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-4 text-base mt-2"
              ariaLabel="Request beta access"
            >
              Request Beta Access
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
