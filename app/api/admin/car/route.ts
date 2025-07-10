import { RESPONSE_STATUS, RESPONSE_STATUS_CODE } from "@/constants";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyToken } from "@/utils/auth";

export const GET = async (request: NextRequest) => {
  try {
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, token is missing",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, invalid token",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken?.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "User not found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "10")));
    const skip = (page - 1) * pageSize;
    const statusFilter = searchParams.get("status");
    const whereClause: {
      status?: "APPROVED" | "REJECTED" | "PENDING";
    } = {};
    if (statusFilter && ["APPROVED", "REJECTED", "PENDING"].includes(statusFilter.toUpperCase())) {
      whereClause.status = statusFilter.toUpperCase() as "APPROVED" | "REJECTED" | "PENDING";
    }

    const totalCount = await prisma.carDetails.count({
      where: whereClause,
    });

    const carsData = await prisma.carDetails.findMany({
      skip,
      take: pageSize,
      where: whereClause,
    });

    if (!carsData || carsData.length === 0) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "No car data found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json(
      {
        status: RESPONSE_STATUS.success,
        message: "Car data fetched successfully",
        data: carsData,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      { status: RESPONSE_STATUS_CODE.success }
    );
  } catch (error) {
    console.error("Error in GET /api/admin/car:", error);
    return NextResponse.json(
      {
        status: RESPONSE_STATUS.serverError,
        message: "Internal server error",
      },
      { status: RESPONSE_STATUS_CODE.internalServerError }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, token is missing",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.unauthorized,
          message: "Unauthorized access, invalid token",
        },
        { status: RESPONSE_STATUS_CODE.unAuthorized }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken?.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "User not found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const { body } = await request.json();
    const { status, carId } = body;

    if (!status) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.validationError,
          message: "Status is required",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }
    const car = await prisma.carDetails.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.recordNotFound,
          message: "Car not found",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }
    if ((car && car.status === "APPROVED") || (car && car.status === "REJECTED")) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.validationError,
          message: "Status cannot be APPROVED or REJECTED",
        },
        { status: RESPONSE_STATUS_CODE.badRequest }
      );
    }

    const updatedCar = await prisma.carDetails.update({
      where: {
        id: carId,
      },
      data: {
        status,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        details: `status ${status} updated for car with id ${carId}`,
        adminId: user.id,
        carId: carId,
      },
    });

    if (!updatedCar) {
      return NextResponse.json(
        {
          status: RESPONSE_STATUS.serverError,
          message: "Failed to update car status",
        },
        { status: RESPONSE_STATUS_CODE.internalServerError }
      );
    }

    return NextResponse.json(
      {
        status: RESPONSE_STATUS.success,
        message: "Car status updated successfully",
        data: updatedCar,
      },
      { status: RESPONSE_STATUS_CODE.success }
    );
  } catch (error) {
    console.error("Error in GET /api/admin/car:", error);
    return NextResponse.json(
      {
        status: RESPONSE_STATUS.serverError,
        message: "Internal server error",
      },
      { status: RESPONSE_STATUS_CODE.internalServerError }
    );
  }
};
