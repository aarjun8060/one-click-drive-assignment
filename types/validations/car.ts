import z from "zod";

export type CarTypeStatus = "REJECTED" | "PENDING" | "APPROVED";
export interface CarDetailsType {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  status: CarTypeStatus;
  createdAt: string;
  updatedAt: string;
}

export const carDetailsSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  location: z.string().min(2).max(100),
  make: z.string().min(2).max(100),
  model: z.string().min(2).max(100),
  year: z.number().min(1886).max(new Date().getFullYear()),
  imageUrl: z.string().url(),
  status: z.enum(["REJECTED", "PENDING", "APPROVED"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});
