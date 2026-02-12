const BASE_URL = "https://api.rawg.io/api";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_KEY!;

type FetchOptions = {
  endpoint: string;
  params?: Record<string, string | number>;
};

export async function rawgFetch<T>({
  endpoint,
  params = {},
}: FetchOptions): Promise<T> {
  const query = new URLSearchParams({
    key: API_KEY,
    ...params,
  });

  const res = await fetch(`${BASE_URL}${endpoint}?${query}`);

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
