import React, { useState, Suspense } from "react";
import { DateRange } from "react-day-picker";
import dynamic from "next/dynamic";
import DateRangeFilter from "./DateRangeFilter";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useRouter } from "next/navigation";
import TableLoading from "./TableLoading";

const Table = dynamic(() => import("./Table"), {
  loading: () => <TableLoading />,
  ssr: false,
});

export default function TableWrapper() {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const router = useRouter();
  const { data, isLoading, isError } = useAnalytics();

  const filtered = React.useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      if (!dateRange?.from || !dateRange?.to) return true;

      const itemDate = new Date(item.date);
      return (
        itemDate >= new Date(dateRange.from) &&
        itemDate <= new Date(dateRange.to)
      );
    });
  }, [data, dateRange]);

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range?.from) {
      setDateRange(undefined);
      return;
    }

    if (!isSelectingEndDate) {
      setDateRange({ from: range.from, to: undefined });
      setIsSelectingEndDate(true);
    } else {
      if (range.to) {
        setDateRange({ from: dateRange?.from || range.from, to: range.to });
        setShowDatePicker(false);
        setIsSelectingEndDate(false);
      }
    }
  };

  return (
    <div className="p-6 pt-0 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold">Analytics Table</h1>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setIsSelectingEndDate(false);
            }}
            className="cursor-pointer flex items-center gap-2 px-4 py-2.5 text-sm font-medium border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span>
              {dateRange?.from
                ? dateRange.to
                  ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  : `From: ${dateRange.from.toLocaleDateString()}`
                : "Select Date Range"}
            </span>
          </button>

          {showDatePicker && (
            <div className="absolute right-0 z-10 mt-2 bg-white dark:bg-gray-950 border rounded-lg shadow-lg">
              <div className="p-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {isSelectingEndDate ? "Select End Date" : "Select Start Date"}
                </p>
                <DateRangeFilter
                  onChange={handleDateChange}
                  setShowDatePicker={setShowDatePicker}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {isLoading ? (
          <TableLoading />
        ) : isError ? (
          <p className="text-red-500 text-sm">
            ⚠️ Something went wrong loading data.
          </p>
        ) : filtered?.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-10">
            <p>😶 No results found for your filters.</p>
            <p className="text-xs">
              Try adjusting the date range or search keywords.
            </p>
          </div>
        ) : (
          <Suspense fallback={<TableLoading />}>
            <Table data={filtered} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
