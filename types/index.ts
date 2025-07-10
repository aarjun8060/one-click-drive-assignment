export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

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

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
