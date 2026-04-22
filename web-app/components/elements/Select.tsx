/**
 * Purpose: Reusable select/dropdown element
 * Used in: BetaSection form
 * Dependencies: None
 */

import React from "react";

/**
 * Component: Select
 * Description: Renders a styled select dropdown
 * Props:
 * - id: string → select id
 * - name: string → select name
 * - value: string → controlled value
 * - onChange: handler → change handler
 * - options: { value: string; label: string }[] → dropdown options
 * - label: string → visible label
 * - required: boolean → required field
 */

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label: string;
  required?: boolean;
}

export default function Select({
  id,
  name,
  value,
  onChange,
  options,
  label,
  required,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#d4d4d4]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-[#2a2a29] border border-[#3f3f46] text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all appearance-none cursor-pointer"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
