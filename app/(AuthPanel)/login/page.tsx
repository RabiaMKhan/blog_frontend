"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import AppleIcon from "@/app/assets/icons/AppleIcon";
import GoogleIcon from "@/app/assets/icons/GoogleIcon";
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
          <button
            type="button"
            onClick={handleForgotPassword}
            className="self-end text-xs text-muted cursor-pointer transition hover:text-light"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary cursor-pointer py-3 text-sm font-medium text-light transition hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Log in
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-field-border" />
        Or login with
        <span className="h-px flex-1 bg-field-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center cursor-pointer gap-2 rounded-md border border-muted/50 py-2.5 text-sm text-light transition hover:bg-light/10"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={handleAppleLogin}
          className="flex items-center justify-center cursor-pointer gap-2 rounded-md border border-muted/50 py-2.5 text-sm text-light transition hover:bg-light/10"
        >
          <AppleIcon />
          Apple
        </button>
      </div>
    </>
  );
}
