import type { ComponentProps } from "react";
import type { z } from "zod";
import type { loginSchema, registerSchema, sendCodeSchema } from "./validation";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

export type SendCodeFormValues = z.infer<typeof sendCodeSchema>;

export type SendCodeFormErrors = Partial<Record<keyof SendCodeFormValues, string>>;

export interface SocialAuthButtonsProps {
  dividerText: string;
  onGoogleClick: () => void;
  onAppleClick: () => void;
}

export interface TextInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

export interface OtpInputProps {
  label: string;
  // One entry per box; "" for an empty box
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}
