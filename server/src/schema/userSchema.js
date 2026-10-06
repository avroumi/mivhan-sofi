import z from "zod";

export const ValidCreateUser = z.object({
  username: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(["arena_user", "general_user", "admin"]),
  assignedArea: z.enum(["North", "South", "Center", "All"]),
});

export const ValidUserId = z.object({
  id: z.string(),
});
