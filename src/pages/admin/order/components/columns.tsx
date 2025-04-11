import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Menu>[] = [
  {
    size: 160,
    accessorKey: "Item Name",
    header: "Name",
    cell: ({ row } : { row: any }) => (
      <span className="truncate capitalize">{row.original?.items?.[0]?.menuItem?.name}</span>
    ),
  },
  {
    size: 160,
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row } : { row: any }) => (
      <span className="truncate capitalize">{row.original?.items?.[0]?.quantity}</span>
    ),
  },
  {
    size: 160,
    accessorKey: "price",
    header: "Price",
    cell: ({ row } : { row: any }) => (
      <span className="truncate capitalize">{row.original?.items?.[0]?.menuItem?.price}</span>
    ),
  },
  {
    size: 150,
    accessorKey: "category",
    header: "Category",
    cell: ({ row } : { row: any }) => (
      <span className="truncate">{row.original?.category?.name}</span>
    )
  },
  {
    size: 150,
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row } : { row: any }) => (
      <span className="truncate">{row.original?.phone}</span>
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
];
