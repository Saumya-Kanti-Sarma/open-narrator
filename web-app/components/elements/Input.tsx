/**
 * Purpose: Reusable form input element
 * Used in: BetaSection form
 * Dependencies: None
 */

import React from "react";

/**
 * Component: Input
 * Description: Renders a styled text/email input
 * Props:
 * - id: string → input id
 * - name: string → input name
 * - type: string → input type (default "text")
 * - placeholder: string → placeholder text
 * - value: string → controlled value
 * - onChange: handler → change handler
 * - required: boolean → required field
 * - label: string → visible label text
 */

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
}

export default function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  label,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#d4d4d4]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-[#2a2a29] border border-[#3f3f46] text-white placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
        style={{ fontFamily: "var(--font-sans)" }}
      />
    </div>
  );
}
