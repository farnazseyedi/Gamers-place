"use client";

import { useQuery } from "@tanstack/react-query";
import { getGameById } from "../../servises/game";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function GameDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        {error.message}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold my-6 text-gray-800">{data?.name}</h1>

      {data?.background_image && (
        <div className="rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={data.background_image}
            alt={data.name}
            width={1200}
            height={600}
            className="object-cover w-full h-80 md:h-125"
            unoptimized
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4 p-4 bg-white shadow rounded-lg">
          <p>
            <strong>Released:</strong> {data?.released}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {data?.rating}
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg space-y-4">
          <div>
            <p className="font-semibold mb-2 text-gray-700">Genres:</p>
            <div className="flex flex-wrap gap-2">
              {data?.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2 text-gray-700">Platforms:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {data?.platforms?.map((p) => (
                <li key={p.platform.id}>{p.platform.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="prose max-w-none bg-white p-6 rounded-lg shadow-lg text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: data?.description || "" }} />
      </div>
    </div>
  );
}
