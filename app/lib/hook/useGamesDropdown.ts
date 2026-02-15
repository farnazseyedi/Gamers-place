import { useState, useEffect, useMemo } from "react";
import { rawgFetch } from "../api/rawg";
import type { Game, GamesResponse } from "../../types/GamesResponse";
import { useLocalStorageState } from "./useLocalStorageState";

function debounce<T extends (...args: never[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useGamesDropdown() {
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected, hydrated] = useLocalStorageState<string[]>(
    "selectedGames",
    [],
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchGames = async (pageNumber: number, reset = false) => {
    try {
      if (pageNumber > 1 && !reset) setLoadingMore(true);
      else setLoading(true);

      const data = await rawgFetch<GamesResponse>({
        endpoint: "/games",
        params: { page: pageNumber, page_size: 40 },
      });

      setGames((prev) =>
        reset || pageNumber === 1 ? data.results : [...prev, ...data.results],
      );

      setHasMore(Boolean(data.next));
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

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchGames(1, true);
  }, [search]);

  const setSearchDebounced = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [],
  );

  const filteredGames = useMemo(
    () =>
      games.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())),
    [games, search],
  );

  const items = useMemo(() => {
    const grouped: Record<string, Game[]> = {};
    filteredGames.forEach((game) => {
      game.genres.forEach((genre) => {
        if (!grouped[genre.name]) grouped[genre.name] = [];
        grouped[genre.name].push(game);
      });
    });

    return Object.entries(grouped).flatMap(([genre, games]) => [
      { type: "genre" as const, label: genre },
      ...games.map((g) => ({
        type: "game" as const,
        label: g.name,
        game: g,
      })),
    ]);
  }, [filteredGames]);

  const toggleGame = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name],
    );
  };

  const selectAll = () => setSelected(games.map((g) => g.name));
  const clearAll = () => setSelected([]);

  return {
    games,
    selected,
    setSelected,
    hydrated,
    search,
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
  };
}
