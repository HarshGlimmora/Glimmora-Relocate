import { z } from "zod";

// Step 1: identity
export const identitySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That looks a bit long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Include a country code and number")
    .max(20, "That number looks too long")
    .regex(/^[+\d\s()-]+$/, "Digits, spaces, dashes, parentheses, and a leading + only"),
});

// Step 2: credentials
export const credentialsSchema = z
  .object({
    password: z
      .string()
      .min(10, "At least 10 characters")
      .max(128, "Under 128 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().default(false),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;
export type CredentialsFormValues = z.infer<typeof credentialsSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

// Resume upload metadata (the File itself lives in ephemeral state, not the
// persisted store — we just record the filename + size for the UI).
export interface ResumeMeta {
  name: string;
  sizeBytes: number;
  type: string;
  uploadedAt: string;
}
