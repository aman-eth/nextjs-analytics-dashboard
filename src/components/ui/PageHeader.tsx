interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}
