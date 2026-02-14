"use client";

import { useQuery } from "@tanstack/react-query";
import { getGames } from "../servises/game";
import type { Game, GamesResponse } from "../types/GamesResponse";
import Link from "next/link";
import GameCard from "../components/GameCard";
import { useState } from "react";
import { usePage } from "./layout";

function GameCardSkeleton({ index }: { index: number }) {
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

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState<string | null>(null);

  const { page, setPage } = usePage();

  const { data: defaultData, isLoading: defaultLoading } =
    useQuery<GamesResponse>({
      queryKey: ["games", "default"],
      queryFn: () =>
        getGames({ page: "1", search: "", ordering: "", genres: "" }),
      staleTime: 1000 * 60 * 5,
    });

  const apiParams = {
    page: page.toString(),
    ...(search ? { search } : {}),
    ...(sort ? { ordering: sort } : {}),
    ...(genre && genre !== "" ? { genres: genre } : {}),
  };

  const { data: filteredData, isLoading: filteredLoading } =
    useQuery<GamesResponse>({
      queryKey: ["games", page, search, sort, genre],
      queryFn: () => getGames(apiParams),
      enabled: page !== null,
      staleTime: 1000 * 60 * 5,
      placeholderData: defaultData,
    });

  const displayData = filteredData || defaultData;
  const isLoading = filteredLoading || (defaultLoading && !displayData);

  const handleSearch = () => {
    setPage(1);
    setSearch(input);
  };

  if (page === null) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search games..."
          className="border p-3 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
          className="border p-3 rounded"
        >
          <option value="">Default</option>
          <option value="-released">Newest</option>
          <option value="-popularity">Popular</option>
          <option value="-rating">Top Rated</option>
        </select>

        <select
          value={genre || ""}
          onChange={(e) => setGenre(e.target.value || null)}
          className="border p-3 rounded"
        >
          <option value="">All Genres</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="puzzle">Puzzle</option>
        </select>
      </div>

      <div className="mb-6">
        <Link
          href="/FavoriteGamesPage"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create a list of your favorite games
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {(isLoading && page === 1) || !displayData?.results?.length
          ? Array.from({ length: 10 }).map((_, idx) => (
              <GameCardSkeleton key={idx} index={idx} />
            ))
          : (displayData?.results || []).map((game: Game, index: number) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}

        {isLoading &&
          page > 1 &&
          Array.from({ length: 10 }).map((_, idx) => (
            <GameCardSkeleton
              key={`skeleton-page-${page}-${idx}`}
              index={idx}
            />
          ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="border px-4 py-2 rounded"
        >
          Prev
        </button>
        <span className="font-bold">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!displayData?.next}
          className="border px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
