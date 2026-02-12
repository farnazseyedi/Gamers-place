// types/GamesResponse.ts

export interface Game {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  genres?: { id: number; name: string }[];
  platforms?: { platform: { id: number; name: string } }[];
}

export interface GamesResponse {
  results: Game[];
  count: number;
  next?: string;
  previous?: string;
}
