/**
 * Purpose: Beta access request form section
 * Used in: app/page.tsx
 * Dependencies: Input element, Select element, Button element, betaSignup service, react-hot-toast
 */

"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdCelebration } from "react-icons/md";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Button from "./elements/Button";
import { submitBetaSignup, getSignupCount } from "@/services/betaSignup.service";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ParticleBackground from "./elements/ParticleBackground";

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
  const [loading, setLoading] = useState(false);
  const [signupCount, setSignupCount] = useState<number | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    getSignupCount().then(setSignupCount);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.occupation || !form.useCase) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await submitBetaSignup({
        name: form.name.trim(),
        email: form.email.trim(),
        occupation: form.occupation,
        useCase: form.useCase,
      });
      toast.success("You are on the list! We will reach out soon.");
      setSubmitted(true);
      setSignupCount((prev) => (prev !== null ? prev + 1 : null));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />
      <section
        id="beta"
        className="relative z-10 py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6"
        aria-labelledby="beta-heading"
      >
        <div ref={sectionRef} className="reveal max-w-xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            {signupCount !== null && signupCount > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/25 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" aria-hidden="true" />
                <span
                  className="text-sm text-[#16A34A] font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {signupCount.toLocaleString()} {signupCount === 1 ? "person has" : "people have"} already signed up
                </span>
              </div>
            )}
            <h2
              id="beta-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Be the First to Experience the Future of AI Voice
            </h2>
            <p className="text-[#a1a1aa]" style={{ fontFamily: "var(--font-body)" }}>
              We are launching soon. Request early access and we will reach out when it is ready.
            </p>
          </div>

          {submitted ? (
            <div
              className="p-8 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-center"
              role="alert"
            >
              <MdCelebration size={40} className="text-[#16A34A] mx-auto mb-4" aria-hidden="true" />
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                You are on the list!
              </h3>
              <p className="text-[#a1a1aa] text-sm" style={{ fontFamily: "var(--font-body)" }}>
                We will reach out to {form.email} when beta access opens.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-[#282828] border border-white/5 space-y-5"
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
                label="occupation"
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
                className="w-full justify-center py-4 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                ariaLabel={loading ? "Submitting..." : "Request beta access"}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-[#1f1f1e] border-t-transparent animate-spin"
                      aria-hidden="true"
                    />
                    Submitting...
                  </span>
                ) : (
                  "Request Beta Access"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
