"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck } from "lucide-react";
import OtpInput from "@/app/components/OtpInput";
import { OTP_LENGTH, validateOtp } from "@/app/utils/validation";

const RESEND_COOLDOWN_SECONDS = 30;
const emptyCode = () => Array<string>(OTP_LENGTH).fill("");

// Reads ?email= set by the register page. useSearchParams needs a Suspense boundary with Cache Components.
function SentToEmail() {
  const email = useSearchParams().get("email");
  return email ? <span className="font-medium text-light">{email}</span> : <>your email</>;
}

export default function VerifyEmailPage() {
  const [code, setCode] = useState<string[]>(emptyCode);
  const [error, setError] = useState<string>();
  // Starts counting down right away, since the code was just sent on sign-up
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleCodeChange = (next: string[]) => {
    setCode(next);
    setError(undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateOtp(code.join(""));
    setError(validationError);
    if (validationError) return;

    // TODO: call the verify email API
    console.log("Verify with code", code.join(""));
  };

  const handleResend = () => {
    // TODO: call the resend code API
    console.log("Resend code clicked");
    setCode(emptyCode());
    setError(undefined);
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <>
      {/* metadata can't be exported from a client component, so set the title here */}
      <title>Verify email | Blog</title>

      <div className="mb-8">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-light">
          <MailCheck size={22} />
        </div>
        <h1 className="text-4xl font-medium text-light">Verify your email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We sent a {OTP_LENGTH}-digit code to{" "}
          <Suspense fallback="your email">
            <SentToEmail />
          </Suspense>
          . Enter it below to activate your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1">
        <OtpInput label="Verification code" value={code} onChange={handleCodeChange} error={error} />

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary cursor-pointer py-3 text-sm font-medium text-light transition hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Verify email
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-2 text-sm text-muted">
        <p>
          Didn&apos;t get the code?{" "}
          {cooldown > 0 ? (
            <span>Resend in 0:{String(cooldown).padStart(2, "0")}</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="cursor-pointer text-light underline underline-offset-2 hover:text-muted"
            >
              Resend code
            </button>
          )}
        </p>
        <p>
          Wrong email?{" "}
          <Link
            href="/verify-email/send-code"
            className="text-light underline underline-offset-2 hover:text-muted"
          >
            Use a different email
          </Link>
        </p>
      </div>
    </>
  );
}
