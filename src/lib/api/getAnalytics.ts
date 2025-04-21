import analyticsData from "@/data/analytics.json";

export async function getAnalyticsData(): Promise<typeof analyticsData> {
  await new Promise((res) => setTimeout(res, 1000));
  return analyticsData;
}
