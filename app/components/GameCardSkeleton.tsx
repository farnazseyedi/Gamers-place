import React from "react";

interface Props {
  index: number;
}

export const GameCardSkeleton: React.FC<Props> = ({ index }) => (
  <div
    className="w-56 bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="w-full h-32 bg-gray-200 rounded-t-xl"></div>

    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="flex flex-wrap gap-1">
        <div className="h-4 px-2 py-0.5 bg-indigo-100 rounded-full w-12"></div>
        <div className="h-4 px-2 py-0.5 bg-indigo-100 rounded-full w-16"></div>
      </div>
    </div>
  </div>
);
