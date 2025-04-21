import { useQuery } from "@tanstack/react-query";
import { getAnalyticsData } from "@/lib/api/getAnalytics";

export const useAnalytics = () =>
  useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsData,
    staleTime: 1000 * 60 * 5,
  });
