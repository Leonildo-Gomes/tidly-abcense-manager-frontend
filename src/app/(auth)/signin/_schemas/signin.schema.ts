import z from "zod";

export const schema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
});

export type FormData = z.infer<typeof schema>;