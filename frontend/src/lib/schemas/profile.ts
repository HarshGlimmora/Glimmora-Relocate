import { z } from "zod";

export const moneySchema = z.object({
  amount: z.number().nonnegative(),
  currency: z.string().length(3),
});

export const profileSchema = z.object({
  currentCountry: z.string().min(2, "Select your current country"),
  currentCity: z.string().trim().max(80).optional().default(""),
  targetCountries: z
    .array(z.string())
    .min(0)
    .max(5, "Up to five destinations"),
  targetCity: z.string().trim().max(80).optional().default(""),
  undecided: z.boolean().default(false),
  role: z.string().min(2, "Your current role helps us match roles abroad"),
  yearsExperience: z.coerce
    .number()
    .int()
    .min(0)
    .max(60, "Please enter a realistic number of years"),
  currentSalary: moneySchema,
  targetSalary: moneySchema.optional(),
  workPreference: z.enum(["onsite", "hybrid", "remote", "any"]),
  familyStatus: z.enum(["single", "couple", "family_with_kids", "extended"]),
  childrenCount: z.coerce.number().int().min(0).max(10).optional(),
  urgency: z.enum(["immediate", "3m", "6m", "12m+"]),
  visaStatus: z.string().optional().default(""),
  budgetCeiling: moneySchema.optional(),
  priority: z.enum(["salary", "lifestyle", "stability", "speed"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const refinementSchema = z.object({
  movingWithFamily: z.boolean().optional(),
  sponsorshipRequired: z.boolean().optional(),
  prioritizing: z.enum(["cost", "job_quality", "lifestyle"]).optional(),
  openToMultiple: z.boolean().optional(),
  hardConstraints: z.string().optional(),
});

export type RefinementFormValues = z.infer<typeof refinementSchema>;
