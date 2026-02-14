export default function GameCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="block bg-white rounded-xl shadow overflow-hidden animate-pulse"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="w-full h-40 bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="flex gap-1">
          <div className="h-4 w-12 bg-indigo-100 rounded-full"></div>
          <div className="h-4 w-16 bg-indigo-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
