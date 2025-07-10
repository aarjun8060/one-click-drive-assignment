"use server";
import { LS_KEY } from "@/constants";
import { cookies } from "next/headers";

export type PaginatedResponse<T> = {
  status?: string;
  message?: string;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  status?: string;
};

const baseUrl = "http:localhost:3000/api/admin";

export const fetchCarList = async (params?: PaginationParams) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(LS_KEY.auth_token)?.value;

    // pagiantion
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.pageSize) queryParams.append("pageSize", params.pageSize.toString());
    if (params?.status) queryParams.append("status", params.status.toString());

    const response = await fetch(
      `${baseUrl}/car${queryParams.toString() ? "?" + queryParams.toString() : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60, //
        },
      }
    );
    if (!response) {
      throw new Error("Failed to fetch car list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching car list:", error);
    return [];
  }
};

export const fetchAuditLogs = async (params?: PaginationParams) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(LS_KEY.auth_token)?.value;

    // pagiantion
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.pageSize) queryParams.append("pageSize", params.pageSize.toString());

    const response = await fetch(
      `${baseUrl}/audit-logs${queryParams.toString() ? "?" + queryParams.toString() : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (!response) {
      throw new Error("Failed to fetch car list");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching car list:", error);
    return [];
  }
};

export const updateCarStatus = async (body: { carId: string; status: string }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(LS_KEY.auth_token)?.value;
    const response = await fetch(`${baseUrl}/car`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body }),
    });
    if (!response) {
      throw new Error("Failed to update car status");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating car status:", error);
  }
};
