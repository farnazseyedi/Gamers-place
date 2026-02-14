"use client";
import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import GameCard from "../components/GameCard";
import type { Game, GamesResponse } from "../types/GamesResponse";
import { Virtuoso } from "react-virtuoso";
import { rawgFetch } from "../lib/api/rawg";
import { useRouter } from "next/navigation";

interface Item {
  type: "genre" | "game";
  label: string;
  game?: Game;
}

export default function GamesDropdown() {
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("selectedGames");
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedGames", JSON.stringify(selected));
  }, [selected]);

  const fetchGames = async (pageNumber: number) => {
    try {
      const data = await rawgFetch<GamesResponse>({
        endpoint: "/games",
        params: { page: pageNumber, page_size: 40 },
      });
      setGames((prev) => [...prev, ...data.results]);
      setHasMore(!!data.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped: Record<string, Game[]> = {};
  filteredGames.forEach((game) =>
    game.genres.forEach((genre) => {
      if (!grouped[genre.name]) grouped[genre.name] = [];
      grouped[genre.name].push(game);
    }),
  );

  const items: Item[] = [];
  Object.entries(grouped).forEach(([genre, games]) => {
    items.push({ type: "genre", label: genre });
    games.forEach((g) => items.push({ type: "game", label: g.name, game: g }));
  });

  const allItems = games.map((g) => g.name);
  const toggleGame = (name: string) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name],
    );
  const selectAll = () => setSelected(allItems);
  const clearAll = () => setSelected([]);

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4 mt-4">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div
          key={idx}
          className="w-65 bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
          style={{ animationDelay: `${idx * 80}ms` }}
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
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
      >
        ← Back
      </button>

      <Listbox value={selected} onChange={setSelected} multiple>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected.length === 0
                ? "Select your favorite games"
                : `${selected.length} selected`}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 w-full max-h-125 overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex flex-col gap-1 p-2">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="flex justify-between text-sm font-medium text-indigo-600">
                  <span
                    onClick={selectAll}
                    className="hover:underline cursor-pointer"
                  >
                    Select All
                  </span>
                  <span
                    onClick={clearAll}
                    className="hover:underline cursor-pointer"
                  >
                    Clear All
                  </span>
                </div>
              </div>

              {loading && (
                <div className="p-4 mt-4 text-center text-gray-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
                    {Array.from({ length: 9 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-65 bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                        style={{ animationDelay: `${idx * 80}ms` }}
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
                    ))}
                  </div>
                </div>
              )}

              {!loading && (
                <Virtuoso
                  style={{ height: 350 }}
                  data={items}
                  endReached={() => {
                    if (hasMore && !loadingMore) {
                      setLoadingMore(true);
                      setPage((prev) => prev + 1);
                    }
                  }}
                  itemContent={(index, item) => {
                    if (item.type === "genre") {
                      return (
                        <div className="px-3 py-1 font-bold uppercase text-sm text-white rounded-lg mb-1 shadow-md sticky top-0 bg-linear-to-r from-indigo-500 to-purple-500">
                          {item.label}
                        </div>
                      );
                    }
                    return (
                      <Listbox.Option
                        key={item.label}
                        value={item.label}
                        as={Fragment}
                      >
                        {({ active, selected: isSelected }) => (
                          <li
                            className={`cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg mb-1 transition ${
                              active
                                ? "bg-indigo-100 text-indigo-900"
                                : "text-gray-900"
                            }`}
                            onClick={() => toggleGame(item.label)}
                          >
                            <span
                              className={`block truncate ${
                                isSelected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.game?.genres.length && (
                              <div className="absolute right-3 top-2 flex space-x-1">
                                {item.game.genres.map((g) => (
                                  <span
                                    key={g.id}
                                    className="bg-indigo-100 text-indigo-800 text-xs px-1 rounded"
                                  >
                                    {g.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            {isSelected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                          </li>
                        )}
                      </Listbox.Option>
                    );
                  }}
                />
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {selected.length > 0 && (
        <div className="mt-6">
          {loading ? (
            <SkeletonGrid />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
              {selected.map((name, idx) => {
                const game = games.find((g) => g.name === name);
                return game ? (
                  <div
                    key={`${game.id}-${idx}`}
                    className="w-65 bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <GameCard game={game} index={idx} />
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
