interface SearchBarProps {
  input: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({
  input,
  onInputChange,
  onSearch,
}: SearchBarProps) => (
  <div className="flex gap-3 mb-6">
    <input
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Search games..."
      className="border p-3 rounded flex-1"
    />
    <button
      onClick={onSearch}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Search
    </button>
  </div>
);
