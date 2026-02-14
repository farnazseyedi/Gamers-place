export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
  };
}

export interface Game {
  id: number;
  name: string;
  description?: string;
  released?: string;
  background_image?: string;
  rating?: number;
  genres: Genre[];
  platforms?: Platform[];
}

export type GameListItem = Pick<
  Game,
  "id" | "name" | "background_image" | "genres"
>;

export interface GamesResponse {
  results: Game[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

export interface GenresResponse {
  results: Genre[];
}
