"use client";

import { useId, useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import type { OtpInputProps } from "@/app/utils/types";

export default function OtpInput({ label, value, onChange, error }: OtpInputProps) {
  const length = value.length;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const labelId = useId();
  const errorId = `${labelId}-error`;

  const focusBox = (index: number) => {
    inputsRef.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  };

  // Writes digits starting at `start`, then focuses the box after the last one written
  const fillFrom = (start: number, digits: string) => {
    const next = [...value];
    digits
      .slice(0, length - start)
      .split("")
      .forEach((digit, i) => (next[start + i] = digit));
    onChange(next);
    focusBox(start + digits.length);
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");

    // The browser's one-time-code autofill drops the whole code into one box
    if (digits.length === length) {
      fillFrom(0, digits);
      return;
    }

    const next = [...value];
    // Typing over a filled box gives two characters; keep the newest
    next[index] = digits.slice(-1);
    onChange(next);
    if (next[index]) focusBox(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      e.preventDefault();
      const next = [...value];
      next[index - 1] = "";
      onChange(next);
      focusBox(index - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(index + 1);
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    e.preventDefault();
    fillFrom(index, digits);
  };

  return (
    // pb-5 reserves room for the absolutely positioned error so the layout doesn't shift
    <div className="relative flex flex-col gap-1.5 pb-5">
      <span id={labelId} className="text-xs font-medium text-muted">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        className="flex justify-between gap-2"
      >
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={index === 0 ? length : 2}
            aria-label={`Digit ${index + 1}`}
            aria-invalid={!!error}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => e.target.select()}
            className={`h-12 w-full min-w-0 max-w-12 rounded-md border bg-field text-center text-lg font-medium text-light outline-none transition sm:h-14 sm:max-w-14 ${
              error ? "border-danger" : "border-field-border hover:border-light/50 focus:border-light/80"
            }`}
          />
        ))}
      </div>
      {error && (
        <p id={errorId} className="absolute bottom-0 left-0 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
