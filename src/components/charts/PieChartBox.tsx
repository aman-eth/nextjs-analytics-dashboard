"use client";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import analyticsData from "@/data/analytics.json";
const COLORS = ["#34d399", "#f87171", "#60a5fa", "#fbbf24"];

export default function PieChartBox({ data }: { data: typeof analyticsData }) {
  const pieData = [
    {
      name: "Bounced",
      value: data.reduce((sum, item) => sum + item.bounceRate, 0),
    },
    {
      name: "Engaged",
      value: data.reduce((sum, item) => sum + (100 - item.bounceRate), 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Tooltip />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
}
