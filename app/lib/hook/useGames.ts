import { useQuery } from "@tanstack/react-query";
import { getGames } from "../../servises/game";
import type { GamesResponse } from "../../types/GamesResponse";

interface UseGamesParams {
  page: number;
  search?: string;
  sort?: string;
  genre?: string | null;
}

export function useGames({ page, search, sort, genre }: UseGamesParams) {
  const defaultQuery = useQuery<GamesResponse>({
    queryKey: ["games", "default"],
    queryFn: () =>
      getGames({ page: "1", search: "", ordering: "", genres: "" }),
    staleTime: 1000 * 60 * 5,
  });

  const apiParams = {
    page: page.toString(),
    ...(search ? { search } : {}),
    ...(sort ? { ordering: sort } : {}),
    ...(genre ? { genres: genre } : {}),
  };

  const filteredQuery = useQuery<GamesResponse>({
    queryKey: ["games", page, search, sort, genre],
    queryFn: () => getGames(apiParams),
    enabled: page !== null,
    staleTime: 1000 * 60 * 5,
    placeholderData: defaultQuery.data,
  });

  const data = filteredQuery.data || defaultQuery.data;
  const isLoading =
    filteredQuery.isLoading || (defaultQuery.isLoading && !data);

  return { data, isLoading, defaultQuery, filteredQuery };
}
