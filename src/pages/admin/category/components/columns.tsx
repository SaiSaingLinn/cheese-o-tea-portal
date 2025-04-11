import { ColumnDef } from "@tanstack/react-table";
import { CategoryAction } from "./CategoryActions";
import { format } from "date-fns";

export const columns: ColumnDef<Category>[] = [
  {
    size: 160,
    accessorKey: "name",
    header: "Name",
    cell: ({ row } : { row: any }) => (
      <span className="truncate capitalize">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    enableHiding: false,
    header: "Created Date",
    cell: ({ row } : { row: any }) => (
      row.original.createdAt && <span className="truncate">{format(row.original.createdAt, "dd MMM yyyy hh:mm a")}</span>
    )
  },
  {
    size: 80,
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row } : { row: any }) => <CategoryAction values={row.original} />,
  },
];
