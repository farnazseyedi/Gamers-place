"use client";

import { useQuery } from "@tanstack/react-query";
import { getGameById } from "../servises/game";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { Game } from "../types/GamesResponse";
import { useRouter } from "next/navigation";

export default function GameDetailPage() {
  const { id } = useParams();
  const gameId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, error } = useQuery<Game, Error>({
    queryKey: ["game", gameId],
    queryFn: () => getGameById(gameId!),
    enabled: !!gameId,
    staleTime: 1000 * 60 * 5,
  });

  const router = useRouter();

  if (isLoading) return <p>Loading game...</p>;
  if (error)
    return (
      <div className="text-center p-6">
        <p className="text-red-500 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back to games
      </button>
      <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>

      {data?.background_image && (
        <Image
          src={data.background_image}
          alt={data.name}
          width={800}
          height={450}
          className="rounded-lg mb-4"
        />
      )}

      <p className="text-gray-600 mb-2">
        Released: {data?.released || "Unknown"}
      </p>

      {data?.description && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
    </div>
  );
}
