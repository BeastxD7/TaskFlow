import { string, z } from "zod";

export const userSchema = z.object({
  name: z.string()
  .min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters").regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces (no numbers allowed)"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const TaskInsertSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters long").max(200, "Description cannot exceed 50 characters"),
});
