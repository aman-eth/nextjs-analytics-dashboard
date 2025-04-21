import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

export type Analytics = {
  date: string;
  sales: number;
  visitors: number;
  revenue: number;
  bounceRate: number;
};

export function useAnalyticsTable(data: Analytics[]) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(0);

  const columns: ColumnDef<Analytics>[] = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "sales",
      header: "Sales",
      cell: (info) => info.getValue(),
      filterFn: "includesString",
    },
    {
      accessorKey: "visitors",
      header: "Visitors",
      filterFn: "includesString",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      filterFn: "includesString",
    },
    {
      accessorKey: "bounceRate",
      header: "Bounce Rate (%)",
      filterFn: "includesString",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
  });

  return {
    table,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    setPageIndex,
    pageSize,
    setPageSize,
  };
}
