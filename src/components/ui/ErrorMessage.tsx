export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center text-red-500 p-4">
      <p>⚠️ {message}</p>
    </div>
  );
}
