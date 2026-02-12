import { rawgFetch } from "../lib/api/rawg";
import type { Game, GamesResponse } from "../types/GamesResponse";

export const getGames = (
  filters: Record<string, string>,
): Promise<GamesResponse> =>
  rawgFetch({
    endpoint: "/games",
    params: filters,
  }) as Promise<GamesResponse>;

export const getGameById = (id: string): Promise<Game> =>
  rawgFetch({
    endpoint: `/games/${id}`,
  }) as Promise<Game>;

export const getGenres = () =>
  rawgFetch({
    endpoint: "/genres",
  });
