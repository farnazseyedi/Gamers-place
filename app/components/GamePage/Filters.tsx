interface FiltersProps {
  sort: string;
  genre: string | null;
  onSortChange: (value: string) => void;
  onGenreChange: (value: string | null) => void;
}

export const Filters = ({
  sort,
  genre,
  onSortChange,
  onGenreChange,
}: FiltersProps) => (
  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      className="border p-3 rounded"
    >
      <option value="">Default</option>
      <option value="-released">Newest</option>
      <option value="-popularity">Popular</option>
      <option value="-rating">Top Rated</option>
    </select>

    <select
      value={genre || ""}
      onChange={(e) => onGenreChange(e.target.value || null)}
      className="border p-3 rounded"
    >
      <option value="">All Genres</option>
      <option value="action">Action</option>
      <option value="adventure">Adventure</option>
      <option value="puzzle">Puzzle</option>
    </select>
  </div>
);
