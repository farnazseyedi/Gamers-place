"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Virtuoso } from "react-virtuoso";
import { useRouter } from "next/navigation";
import GameCard from "../components/GameCard";
import { GameCardSkeleton } from "../components/GameCardSkeleton";
import { useGamesDropdown } from "../lib/hook/useGamesDropdown";

export default function GameListDropdown() {
  const router = useRouter();
  const {
    games,
    selected,
    setSearchDebounced,
    items,
    toggleGame,
    selectAll,
    clearAll,
    loading,
    loadingMore,
    page,
    setPage,
    hasMore,
  } = useGamesDropdown();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
      >
        ← Back
      </button>

      <Listbox value={selected} onChange={() => {}} multiple>
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
                  onChange={(e) => setSearchDebounced(e.target.value)}
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

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <GameCardSkeleton key={idx} index={idx} />
                  ))}
                </div>
              ) : (
                <Virtuoso
                  style={{ height: 350 }}
                  data={items}
                  endReached={() => {
                    if (hasMore && !loadingMore) setPage(page + 1);
                  }}
                  itemContent={(index, item) => {
                    if (item.type === "genre") {
                      return (
                        <div className="px-3 py-1 font-bold uppercase text-sm text-white rounded-lg mb-1 shadow-md sticky top-0 bg-linear-to-r from-indigo-500 to-purple-500">
                          {item.label}
                        </div>
                      );
                    }
                    const isSelected = selected.includes(item.label);
                    return (
                      <Listbox.Option
                        key={item.label}
                        value={item.label}
                        as={Fragment}
                      >
                        <li
                          className={`cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg mb-1 transition ${
                            isSelected
                              ? "bg-indigo-100 text-indigo-900 font-semibold"
                              : "text-gray-900"
                          }`}
                          onClick={() => toggleGame(item.label)}
                        >
                          <span className="block truncate">{item.label}</span>
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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {games
            .filter((g) => selected.includes(g.name))
            .map((game, idx) => (
              <GameCard key={`${game.id}-${idx}`} game={game} index={idx} />
            ))}
        </div>
      )}
    </div>
  );
}
