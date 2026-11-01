import { z } from "zod";
import type { LoginFormErrors, LoginFormValues } from "./types";

const PASSWORD_MIN_LENGTH = 8;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
});

// Returns the first error message for each invalid field, or {} when the form is valid.
export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  const { fieldErrors } = z.flattenError(result.error);
  return {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };
}
