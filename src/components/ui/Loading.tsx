type LoadingProps = {
  message?: string;
};

export default function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <div className="p-10">
      <p className="text-xl">{message}</p>
    </div>
  );
}