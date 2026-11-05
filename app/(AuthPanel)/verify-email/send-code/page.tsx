"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import TextInput from "@/app/components/TextInput";
import type { SendCodeFormErrors, SendCodeFormValues } from "@/app/utils/types";
import { OTP_LENGTH, validateSendCodeForm } from "@/app/utils/validation";

const initialValues: SendCodeFormValues = { email: "" };

export default function SendCodePage() {
  const [values, setValues] = useState<SendCodeFormValues>(initialValues);
  const [errors, setErrors] = useState<SendCodeFormErrors>({});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user edits it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateSendCodeForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // TODO: call the send verification code API, then redirect only if it succeeds
    console.log("Send code to", values.email);
    router.push(`/verify-email?email=${encodeURIComponent(values.email.trim())}`);
  };

  return (
    <>
      {/* metadata can't be exported from a client component, so set the title here */}
      <title>Send verification code | Blog</title>

      <div className="mb-8">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-light">
          <Mail size={22} />
        </div>
        <h1 className="text-4xl font-medium text-light">Verify your email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Enter the email you signed up with and we&apos;ll send you a {OTP_LENGTH}-digit
          verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1">
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary cursor-pointer py-3 text-sm font-medium text-light transition hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Send code
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already verified?{" "}
        <Link href="/login" className="text-light underline underline-offset-2 hover:text-muted">
          Back to log in
        </Link>
      </p>
    </>
  );
}
