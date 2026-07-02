type EmptyStateProps = {
  message: string;
};

export default function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="p-10">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}