interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center text-gray-500 text-sm py-10">
      <p>{title}</p>
      {description && <p className="text-xs">{description}</p>}
    </div>
  );
}
