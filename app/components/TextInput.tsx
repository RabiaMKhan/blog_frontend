"use client";

import { useId, useState } from "react";
import type { TextInputProps } from "@/app/utils/types";
import { Eye, EyeOff } from "lucide-react";

export default function TextInput({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...inputProps
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    // pb-5 reserves room for the absolutely positioned error so the layout doesn't shift
    <div className="relative flex flex-col gap-1.5 pb-5">
      <label htmlFor={inputId} className="text-xs font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-md border bg-field! px-4 py-3 text-sm text-light outline-none transition placeholder:text-light/60 ${
            isPassword ? "pr-11" : ""
          } ${
            error ? "border-danger" : "border-field-border hover:border-light/50 focus:border-light/80"
          } ${className}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-light/70 transition hover:text-light"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="absolute bottom-0 left-0 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
