import z from "zod";

export const ValidRegister = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(["arena_user", "general_user", "admin"]),
  assignedArea: z.enum(["North", "South", "Center", "All"]),
});

export const ValidUserId = z.object({
  id: z.string(),
});

export const ValidLogin = z.object({
  password: z.string(),
  email: z.email(),
});
