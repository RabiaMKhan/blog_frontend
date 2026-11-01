import type { ComponentProps } from "react";
import type { z } from "zod";
import type { loginSchema } from "./validation";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export interface TextInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}
