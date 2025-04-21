"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import analyticsData from "@/data/analytics.json";

export default function LineChart({ data }: { data: typeof analyticsData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
