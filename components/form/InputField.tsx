"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const MotionInput = motion.input;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => {
    const t = useTranslations("form");

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300">
          {t(label)}
        </label>
        <MotionInput
          whileFocus={{ scale: 1.02 }}
          className={`w-full rounded-xl border px-3 py-2 text-gray-900 dark:text-gray-100
            placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2
            focus:ring-emerald-500 focus:border-emerald-500
            ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
          `}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
