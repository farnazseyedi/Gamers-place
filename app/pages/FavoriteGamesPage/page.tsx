"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Virtuoso } from "react-virtuoso";
import { useRouter } from "next/navigation";

import { useGamesDropdown } from "../../lib/hook/useGamesDropdown";
import { GamesDropdownHeader } from "../../components/FavoriteGamesPage/GamesDropdownHeader";
import { GameDropdownItem } from "../../components/FavoriteGamesPage/GameDropdownItem";
import { GamesGrid } from "../../components/FavoriteGamesPage/GamesGrid";

export default function FavoriteGamesPage() {
  const router = useRouter();
  const {
    games,
    selected,
    setSelected,
    search,
    setSearchDebounced,
    items,
    toggleGame,
    selectAll,
    clearAll,
    loading,
    loadingMore,
    setPage,
    hasMore,
    hydrated,
  } = useGamesDropdown();

  const isClient = typeof window !== "undefined";

  if (!hydrated || !isClient) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
      >
        ← Back
      </button>

      <div>
        <h2 className="font-bold mt-4">
          Scroll to see all the games we have :)
        </h2>
      </div>

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
              <GamesDropdownHeader
                searchValue={search}
                onSearchChange={setSearchDebounced}
                onSelectAll={selectAll}
                onClearAll={clearAll}
              />

              {!loading && (
                <Virtuoso
                  style={{ height: 350 }}
                  data={items}
                  endReached={() => {
                    if (hasMore && !loadingMore) setPage((p) => p + 1);
                  }}
                  itemContent={(index, item) => (
                    <GameDropdownItem
                      item={item}
                      isSelected={selected.includes(item.label)}
                      isActive={false}
                      onToggle={() => toggleGame(item.label)}
                    />
                  )}
                />
              )}

              {loading && (
                <div className="p-4 mt-4 text-center text-gray-500">
                  Loading games...
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {selected.length > 0 && (
        <div className="mt-6">
          <GamesGrid games={games} selectedNames={selected} loading={loading} />
        </div>
      )}
    </div>
  );
}
