import Skeleton from "../ui/Skeleton";

export default function TableLoading() {
  return (
    <div className="space-y-4">
      <Skeleton height="40px" className="max-w-sm" />
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height="48px" />
          ))}
        </div>
      </div>
    </div>
  );
}
