type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <div className="p-10">
      <div className="border border-red-400 bg-red-100 text-red-700 rounded-lg p-4">
        {message}
      </div>
    </div>
  );
}