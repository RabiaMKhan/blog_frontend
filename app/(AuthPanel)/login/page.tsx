"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import SocialAuthButtons from "@/app/components/SocialAuthButtons";
import TextInput from "@/app/components/TextInput";
import type { LoginFormErrors, LoginFormValues } from "@/app/utils/types";
import { validateLoginForm } from "@/app/utils/validation";

const initialValues: LoginFormValues = { email: "", password: "" };

export default function LoginPage() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user edits it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // TODO: call the login API
    console.log("Login with", values);
  };

  const handleForgotPassword = () => {
    // TODO: decide what forgot password does (navigate, open modal, etc.)
    console.log("Forgot password clicked");
  };

  const handleGoogleLogin = () => {
    // TODO: start Google OAuth sign-in
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    // TODO: start Sign in with Apple
    console.log("Apple login clicked");
  };

  return (
    <>
      {/* metadata can't be exported from a client component, so set the title here */}
      <title>Login | Blog</title>

      <div className="mb-8">
        <h1 className="text-4xl font-medium text-light">Welcome back</h1>
        <p className="mt-3 text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-light underline underline-offset-2 hover:text-muted">
            Sign up
          </Link>
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

        <div className="flex flex-col">
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="flex justify-between gap-4">
            <Link
              href="/verify-email/send-code"
              className="text-xs text-muted transition hover:text-light"
            >
              Verify email
            </Link>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-muted cursor-pointer transition hover:text-light"
            >
              Forgot password
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary cursor-pointer py-3 text-sm font-medium text-light transition hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Log in
        </button>
      </form>

      <SocialAuthButtons
        dividerText="Or login with"
        onGoogleClick={handleGoogleLogin}
        onAppleClick={handleAppleLogin}
      />
    </>
  );
}
