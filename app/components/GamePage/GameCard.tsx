"use client";

import Link from "next/link";
import Image from "next/image";
import type { Game } from "../../types/GamesResponse";

interface GameCardProps {
  game: Game;
  index: number;
}

export default function GameCard({ game, index }: GameCardProps) {
  const genres = game.genres ?? [];

  return (
    <>
      <Link
        href={`/games/${game.id}`}
        className="block bg-white rounded-xl shadow overflow-hidden opacity-0 animate-fadeDown"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="relative group">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="p-3 space-y-1">
            <h3 className="font-semibold text-sm line-clamp-1">{game.name}</h3>

            <div className="flex flex-wrap gap-1">
              {genres.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <style jsx global>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeDown {
          animation: fadeDown 0.5s ease forwards;
        }
      `}</style>
    </>
  );
}
