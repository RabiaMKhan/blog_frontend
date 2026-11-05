"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialAuthButtons from "@/app/components/SocialAuthButtons";
import TextInput from "@/app/components/TextInput";
import type { RegisterFormErrors, RegisterFormValues } from "@/app/utils/types";
import { validateRegisterForm } from "@/app/utils/validation";

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user edits it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // TODO: call the register API, then redirect only if it succeeds
    console.log("Register with", values);
    router.push(`/verify-email?email=${encodeURIComponent(values.email.trim())}`);
  };

  const handleGoogleSignUp = () => {
    // TODO: start Google OAuth sign-up
    console.log("Google sign up clicked");
  };

  const handleAppleSignUp = () => {
    // TODO: start Sign in with Apple
    console.log("Apple sign up clicked");
  };

  return (
    <>
      {/* metadata can't be exported from a client component, so set the title here */}
      <title>Create account | Blog</title>

      <div className="mb-8">
        <h1 className="text-4xl font-medium text-light">Create an account</h1>
        <p className="mt-3 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-light underline underline-offset-2 hover:text-muted">
            Log in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1">
        <div className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
          <TextInput
            label="First name"
            name="firstName"
            placeholder="First name"
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <TextInput
            label="Last name"
            name="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>

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

        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary cursor-pointer py-3 text-sm font-medium text-light transition hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Create account
        </button>
      </form>

      <SocialAuthButtons
        dividerText="Or register with"
        onGoogleClick={handleGoogleSignUp}
        onAppleClick={handleAppleSignUp}
      />
    </>
  );
}
