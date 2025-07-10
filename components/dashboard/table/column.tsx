"use client";

import { carDetailsSchema } from "@/types/validations/car";
import { ColumnDef } from "@tanstack/react-table";
import { DragHandle } from "./data-table";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader, IconXboxXFilled } from "@tabler/icons-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ApproveRejectStatus from "./approve-reject";
import { auditLogsSchema } from "@/types/validations/audit";

// Create a separate component for the drag handle

export const columns: ColumnDef<z.infer<typeof carDetailsSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: true,
    cell: ({ row }) => (
      <>
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {row.original.title}
        </div>
        <span>
          {row.original.description?.length > 50 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0">
                  {row.original.description.slice(0, 50)}...
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.description}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            row.original.description
          )}
        </span>
      </>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.id}
        </Badge>
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "APPROVED" && (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        )}
        {row.original.status === "PENDING" && (
          <IconLoader className="animate-spin fill-yellow-500 dark:fill-yellow-400" />
        )}
        {row.original.status === "REJECTED" && (
          <IconXboxXFilled className="fill-red-500 dark:fill-red-400" />
        )}
        {row.original.status}
      </Badge>
    ),
    enableHiding: true,
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   enableHiding: true,
  // },
  {
    accessorKey: "price",
    header: "Price",
    enableHiding: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    enableHiding: true,
  },
  {
    accessorKey: "model",
    header: "Model",
    enableHiding: true,
  },
  {
    accessorKey: "make",
    header: "Make",
    enableHiding: true,
  },
  {
    accessorKey: "year",
    header: "Year",
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="">
        <Badge variant="outline" className="text-muted-foreground px-1.5 text-right">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </Badge>
      </div>
    ),
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ApproveRejectStatus carId={row.original.id} />,
  },
];

export const columnsAuditLogs: ColumnDef<z.infer<typeof auditLogsSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableHiding: true,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant={
          row.original.action === "CREATE"
            ? "outline"
            : row.original.action === "UPDATE"
              ? "default"
              : "destructive"
        }
      >
        {row.original.action}
      </Button>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.id}
        </Badge>
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: true,
    cell: ({ row }) => (
      <>
        <div className="text-foreground text-sm font-medium">{row.original.car.title}</div>
        <span>
          {row.original.car.description?.length > 50 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0">
                  {row.original.car.description.slice(0, 50)}...
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.car.description}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            row.original.car.description
          )}
        </span>
      </>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="text-foreground flex flex-col text-sm font-medium">
        <span>{row.original.admin.name}</span>
        <span>{row.original.admin.email}</span>
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="">
        <Badge variant="outline" className="text-muted-foreground px-1.5 text-right">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </Badge>
      </div>
    ),
    enableHiding: true,
  },
];
