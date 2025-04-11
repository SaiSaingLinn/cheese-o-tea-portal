import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^(099|99)\d{7,9}$/, "Please enter a valid phone number starting with 099 or 99"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => val === "007007", { message: "Wrong OTP" }),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export type CategorySchema = z.infer<typeof categorySchema>;

export const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category ID is required"),
  imageUrl: z.string().optional(),
});
export type MenuSchema = z.infer<typeof menuSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
