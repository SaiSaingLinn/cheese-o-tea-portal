import { ColumnDef } from "@tanstack/react-table";
import { MenuAction } from "./MenuActions";
import { format } from "date-fns";

export const columns: ColumnDef<Menu>[] = [
  {
    size: 160,
    accessorKey: "name",
    header: "Name",
    cell: ({ row } : { row: any }) => (
      <span className="truncate capitalize">{row.getValue("name")}</span>
    ),
  },
  {
    size: 150,
    accessorKey: "description",
    header: "Description",
    cell: ({ row } : { row: any }) => (
      <span className="truncate">{row.getValue("description")}</span>
    )
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
    cell: ({ row } : { row: any }) => <MenuAction values={row.original} />,
  },
];
