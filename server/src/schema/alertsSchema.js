import z from "zod";

export const ValidCreateALert = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  arena: z.enum(["North", "South", "Center"]),
  status: z.enum(["Active", "Handled"]),
  lon: z.number().min(-80).max(80),
  lat: z.number().min(-160).max(160),
});

export const ValidUpdateAlert = ValidCreateALert.partial();

export const ValidId = z.object({
  id: z.string(),
});
