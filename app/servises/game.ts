import { rawgFetch } from "../lib/api/rawg";
import type {
  Game,
  GamesResponse,
  GenresResponse,
} from "../types/GamesResponse";

export const getGames = (
  filters: Record<string, string>,
): Promise<GamesResponse> =>
  rawgFetch({
    endpoint: "/games",
    params: filters,
  });

export const getGameById = (id: string): Promise<Game> =>
  rawgFetch({
    endpoint: `/games/${id}`,
  });

export const getGenres = (): Promise<GenresResponse> =>
  rawgFetch({
    endpoint: "/genres",
  });
