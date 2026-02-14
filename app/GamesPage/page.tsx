"use client";

import { useState } from "react";
import Link from "next/link";
import GameCard from "../components/GameCard";
import { GameCardSkeleton } from "../components/GameCardSkeleton";
import { useGames } from "../lib/hook/useGames";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { Pagination } from "../components/Pagination";
import { usePage } from "./layout";

export default function GamesPage() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState<string | null>(null);

  const { page, setPage } = usePage();

  const { data, isLoading } = useGames({ page, search, sort, genre });

  if (page === null) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SearchBar
        input={input}
        onInputChange={setInput}
        onSearch={() => {
          setPage(1);
          setSearch(input);
        }}
      />
      <Filters
        sort={sort}
        genre={genre}
        onSortChange={(value) => {
          setPage(1);
          setSort(value);
        }}
        onGenreChange={setGenre}
      />

      <div className="mb-6">
        <Link
          href="/FavoriteGamesPage"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create a list of your favorite games
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {(isLoading && page === 1) || !data?.results?.length
          ? Array.from({ length: 10 }).map((_, idx) => (
              <GameCardSkeleton key={idx} index={idx} />
            ))
          : data.results.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
      </div>

      <Pagination page={page} setPage={setPage} hasNext={!!data?.next} />
    </div>
  );
}
