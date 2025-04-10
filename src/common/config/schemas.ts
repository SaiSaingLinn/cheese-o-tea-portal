import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^0?9\d{7,9}$/, "Please enter a valid Myanmar phone number"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => val === "007007", { message: "Wrong OTP" }),
});
