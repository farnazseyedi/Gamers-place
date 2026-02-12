"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../servises/game";
import type { Game, GamesResponse } from "../types/GamesResponse";
import Link from "next/link";
import Image from "next/image";

export default function GamesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState<string | null>(null);

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
      enabled: true,
      staleTime: 1000 * 60 * 5,
      placeholderData: defaultData,
    });

  const displayData = filteredData || defaultData;
  const isLoading = filteredLoading || (defaultLoading && !displayData);

  const handleSearch = () => {
    setPage(1);
    setSearch(input);
  };

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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {isLoading &&
          Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded h-40 animate-pulse" />
          ))}

        {!isLoading &&
          displayData?.results.map((game: Game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="bg-white rounded shadow hover:shadow-xl"
            >
              {game.background_image && (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-t"
                  unoptimized
                />
              )}
              <div className="p-3 text-center font-semibold">{game.name}</div>
            </Link>
          ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="border px-4 py-2 rounded"
        >
          Prev
        </button>
        <span className="font-bold">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!displayData?.next}
          className="border px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
