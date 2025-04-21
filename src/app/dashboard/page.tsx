"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  loading: () => <ChartLoading />,
  ssr: false,
});

const BarChart = dynamic(() => import("@/components/charts/BarChart"), {
  loading: () => <ChartLoading />,
  ssr: false,
});

const AreaChart = dynamic(() => import("@/components/charts/AreaChart"), {
  loading: () => <ChartLoading />,
  ssr: false,
});

const PieChartBox = dynamic(() => import("@/components/charts/PieChartBox"), {
  loading: () => <ChartLoading />,
  ssr: false,
});
import Skeleton from "@/components/ui/Skeleton";
import ExportCSVButton from "@/components/dashboard/ExportCSVButton";
import ProtectedRoute from "@/lib/guards/ProtectedRoute";
import ChartLoading from "@/components/charts/ChartLoading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function DashboardPage() {
  const { data, isLoading } = useAnalytics();

  return (
    <ProtectedRoute>
      <nav className="bg-background border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between pb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold"></h1>
            <div className="flex flex-row items-center w-full sm:w-auto">
              <ExportCSVButton data={data || []} />
            </div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {isLoading ? (
          <Skeleton count={4} height="368px" width="100%" className="card" />
        ) : (
          <>
            <Suspense fallback={<ChartLoading />}>
              <div className="card">
                <h2 className="card-title">Visitors Over Time</h2>
                <LineChart data={data || []} />
              </div>
            </Suspense>

            <Suspense fallback={<ChartLoading />}>
              <div className="card">
                <h2 className="card-title">Sales Breakdown</h2>
                <BarChart data={data || []} />
              </div>
            </Suspense>

            <Suspense fallback={<ChartLoading />}>
              <div className="card">
                <h2 className="card-title">Revenue Growth</h2>
                <AreaChart data={data || []} />
              </div>
            </Suspense>

            <Suspense fallback={<ChartLoading />}>
              <div className="card">
                <h2 className="card-title">Bounce Rate</h2>
                <PieChartBox data={data || []} />
              </div>
            </Suspense>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
