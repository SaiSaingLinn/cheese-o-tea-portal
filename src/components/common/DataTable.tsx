import { cn } from "@/components/ui/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useFullscreen, useToggle } from "react-use";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import svg from "@/assets/svg/bug-fix.svg";

interface DataTableProps<TData, TValue> {
  actions?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  error?: boolean;
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  loading,
  error,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const handleSort = (sort: any) => {
    setSorting(sort);
    if (!sort) return;
    let orderBy = {};
    sort().map((x: ColumnSort) => {
      orderBy = { ...orderBy, [x.id]: `${x.desc ? "desc" : "asc"}` };
    });
    navigate({
      search: (val: any) => {
        return { ...val, orderBy: JSON.stringify(orderBy) };
      },
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount: total,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSort,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 30 },
    },
  });

  return (
    <Card
      ref={ref}
      className="relative flex-grow flex flex-col overflow-hidden p-0 shadow-none bg-transparent md:bg-card border-0 md:border"
    >
      <div className="hidden md:contents">
        <Table className="table-fixed overflow-scroll border-collapse border border-gray-300">
          <TableHeader
            style={{ zIndex: 2 }} // pls don't use tailwind zindex because it will cover tooltip
            className="sticky top-[-1px] shadow-sm"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                      }}
                      className={cn(
                        "bg-card truncate whitespace-nowrap border border-gray-300 h-8 p-1 text-xs font-semibold",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!error && (
            <TableBody className="overflow-scroll">
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`border bg-card hover:bg-muted`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "border border-gray-300 truncate whitespace-nowrap font-normal h-8 p-1 text-xs",
                            cell.column.getIsPinned() && "bg-inherit"
                          )}
                          style={{
                            width: cell.column.getSize(),
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-[400px] bg-transparent hover:bg-transparent border-0">
                    <TableCell colSpan={columns.length} className="text-center">
                      No result found
                    </TableCell>
                  </TableRow>
                )}
              </>
            </TableBody>
          )}
        </Table>
      </div>

      <div className="block md:hidden">
        <div className="py-2 flex flex-col gap-2 h-[calc(100vh-250px)] overflow-scroll relative">
          <div className="text-center text-sm text-foreground flex items-center justify-center h-[calc(100vh-250px)]">
            No result found.
          </div>
        </div>
      </div>

      {error ? (
        <div className="w-full min-h-[200px] flex-1 flex justify-center items-center flex-col">
          <img src={svg} width={100} />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div
        className={cn(
          "w-full",
          loading && "h-1 animate-progress bg-primary origin-left-right"
        )}
      />
    </Card>
  );
}
