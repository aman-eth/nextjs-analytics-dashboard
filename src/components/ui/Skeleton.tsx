import { clsx } from "clsx";

interface SkeletonProps {
  count?: number;
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export default function Skeleton({
  count = 1,
  width = "100%",
  height = "20px",
  className = "",
  rounded = true,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "animate-pulse bg-gray-200 dark:bg-gray-300",
            rounded && "rounded-md",
            className,
          )}
          style={{ width, height }}
        />
      ))}
    </>
  );
}
