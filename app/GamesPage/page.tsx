"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../servises/game";
import type { Game, GamesResponse } from "../types/GamesResponse";
import Link from "next/link";
import Image from "next/image";

export default function GamesPage() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery<GamesResponse, Error>({
    queryKey: ["games", page, search],
    queryFn: () =>
      getGames({
        page: page.toString(),
        search,
      }),
    staleTime: 1000 * 60,
  });

  const handleSearch = () => {
    setPage(1);
    setSearch(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-semibold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* جستجو */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search games..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          Search
        </button>
      </div>

      {/* گرید بازی‌ها */}
      {data?.results?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.results.map((game: Game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition overflow-hidden flex flex-col"
            >
              {/* تصویر */}
              {game.background_image ? (
                <div className="relative w-full h-40 overflow-hidden group">
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={true}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition"></div>
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  No Image
                </div>
              )}

              {/* اسم بازی */}
              <div className="p-3 flex-1 flex items-center justify-center">
                <h3 className="text-center font-semibold text-sm sm:text-base truncate">
                  {game.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No games found
        </p>
      )}

      {/* صفحه‌بندی */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg border transition ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 shadow"
          }`}
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold text-lg">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={data?.results?.length === 0}
          className={`px-5 py-2 rounded-lg border transition ${
            data?.results?.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 shadow"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
