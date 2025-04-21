import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

export default function ChartLoading() {
  return (
    <Card className="h-[300px]">
      <Skeleton height="6" width="32" className="mb-4" />
      <Skeleton height="260px" />
    </Card>
  );
}
