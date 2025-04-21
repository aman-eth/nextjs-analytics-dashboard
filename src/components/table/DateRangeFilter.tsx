"use client";

import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/Calender";

interface Props {
  onChange: (range: DateRange | undefined) => void;
  setShowDatePicker: (show: boolean) => void;
}

export default function DateRangeFilter({
  onChange,
  setShowDatePicker,
}: Props) {
  const [range, setRange] = useState<DateRange | undefined>();

  const handleChange = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    onChange(selectedRange);
  };

  const handleClear = () => {
    setRange(undefined);
    onChange(undefined);
    setShowDatePicker(false);
  };

  return (
    <div className="flex flex-col gap-2 w-fit">
      <p className="font-medium text-sm">Filter by Date Range</p>
      <Calendar mode="range" selected={range} onSelect={handleChange} />
      <p className="text-xs text-gray-500">
        {range?.from && `From: ${format(range.from, "PPP")}`} <br />
        {range?.to && `To: ${format(range.to, "PPP")}`}
      </p>
      <button
        onClick={handleClear}
        className="cursor-pointer text-sm text-red-500 hover:text-red-600 transition-colors"
      >
        Clear Date Filter
      </button>
    </div>
  );
}
