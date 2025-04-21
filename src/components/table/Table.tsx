"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useAnalyticsTable } from "@/hooks/useAnalyticsTable";

type Analytics = {
  date: string;
  sales: number;
  visitors: number;
  revenue: number;
  bounceRate: number;
};

export default function Table({ data }: { data: Analytics[] }) {
  const {
    table,
    globalFilter,
    setGlobalFilter,
    pageSize,
    setPageSize,
    setPageIndex,
  } = useAnalyticsTable(data);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 border rounded-md"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800"
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    <span onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>

                    {header.column.getCanFilter() && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Filter..."
                          className="w-full px-2 py-1 text-sm border rounded-md"
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                  index % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-900/50" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              table.previousPage();
              setPageIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => {
              table.nextPage();
              setPageIndex((prev) =>
                Math.min(table.getPageCount() - 1, prev + 1),
              );
            }}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            className="cursor-pointer border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setPageSize(value);
              table.setPageSize(value);
              setPageIndex(0);
            }}
          >
            {[10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
