import z from "zod";

export const auditLogsSchema = z.object({
  id: z.string(),
  action: z.enum(["CREATE", "UPDATE", "DELETE"]),
  details: z.string(),
  adminId: z.string(),
  carId: z.string(),
  admin: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  car: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  createdAt: z.string(),
});

export type AuditLogType = z.infer<typeof auditLogsSchema>;