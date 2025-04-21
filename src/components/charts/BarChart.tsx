"use client";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import analyticsData from "@/data/analytics.json";

export default function BarChart({ data }: { data: typeof analyticsData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#34d399" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
