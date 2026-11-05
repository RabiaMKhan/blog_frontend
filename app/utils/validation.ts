import { z } from "zod";
import type {
  LoginFormErrors,
  LoginFormValues,
  RegisterFormErrors,
  RegisterFormValues,
} from "./types";

const PASSWORD_MIN_LENGTH = 8;
const NAME_MAX_LENGTH = 50;

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address"));

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);

const nameSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(NAME_MAX_LENGTH, `${label} must be at most ${NAME_MAX_LENGTH} characters`);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  password: passwordSchema,
});

// Returns the first error message for each invalid field, or {} when the values are valid.
function getFieldErrors<T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  values: T,
): Partial<Record<keyof T, string>> {
  const result = schema.safeParse(values);
  if (result.success) return {};

  const errors: Partial<Record<keyof T, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof T;
    errors[field] ??= issue.message;
  }
  return errors;
}

export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  return getFieldErrors(loginSchema, values);
}

export function validateRegisterForm(values: RegisterFormValues): RegisterFormErrors {
  return getFieldErrors(registerSchema, values);
}
