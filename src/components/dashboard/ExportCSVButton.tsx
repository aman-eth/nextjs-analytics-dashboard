"use client";
import { saveAs } from "file-saver";
import analyticsData from "@/data/analytics.json";

export default function ExportCSVButton({
  data,
}: {
  data: typeof analyticsData;
}) {
  const handleExport = () => {
    const csv = [
      ["Date", "Visitors", "Sales", "Revenue", "Bounce Rate"],
      ...data.map((row) =>
        [row.date, row.visitors, row.sales, row.revenue, row.bounceRate].join(
          ",",
        ),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "analytics.csv");
  };

  return (
    <button
      className="cursor-pointer bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all ml-auto"
      onClick={handleExport}
    >
      Export CSV
    </button>
  );
}
