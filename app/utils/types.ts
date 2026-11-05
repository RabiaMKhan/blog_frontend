import type { ComponentProps } from "react";
import type { z } from "zod";
import type { loginSchema, registerSchema } from "./validation";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

export interface SocialAuthButtonsProps {
  dividerText: string;
  onGoogleClick: () => void;
  onAppleClick: () => void;
}

export interface TextInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}
