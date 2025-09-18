"use client";

import { SelectHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function SelectField({
  label,
  options,
  error,
  ...props
}: SelectFieldProps) {
  const t = useTranslations("form");

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300">
        {t(label)}
      </label>
      <select
        className={`w-full rounded-xl border px-3 py-2 text-gray-900 dark:text-gray-100
          shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.value)}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
