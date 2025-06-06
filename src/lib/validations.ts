import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email address",
      })
      .trim(),
    password: z
      .string()
      .min(3, {
        message: "Password must be at least 3 characters long",
      })
      .regex(/[A-Za-z]/, {
        message: "Password must contain at least one letter",
      })
      .max(10, {
        message: "Password must be less than 10 characters long",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .trim(),
  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    })
    .regex(/[A-Za-z]/, {
      message: "Password must contain at least one letter",
    })
    .max(10, {
      message: "Password must be less than 10 characters long",
    })
    .trim(),
});

export const BlogSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(50, {
      message: "Title must be less than 50 characters long",
    })
    .trim(),
  content: z
    .string()
    .min(3, {
      message: "Content must be at least 3 characters long",
    })
    .trim(),
});
