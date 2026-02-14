import GameCard from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import type { Game } from "../types/GamesResponse";

type GridProps = {
  games: Game[];
  selectedNames: string[];
  loading: boolean;
};

export function GamesGrid({ games, selectedNames, loading }: GridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
        {Array.from({ length: 9 }).map((_, idx) => (
          <GameCardSkeleton key={idx} index={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
      {games
        .filter((g) => selectedNames.includes(g.name))
        .map((game, idx) => (
          <div
            key={`${game.id}-${idx}`}
            className="w-65 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <GameCard game={game} index={idx} />
          </div>
        ))}
    </div>
  );
}
