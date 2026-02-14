type HeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
};

export function GamesDropdownHeader({
  searchValue,
  onSearchChange,
  onSelectAll,
  onClearAll,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex flex-col gap-1 p-2">
      <input
        type="text"
        placeholder="Search games..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="flex justify-between text-sm font-medium text-indigo-600">
        <span onClick={onSelectAll} className="hover:underline cursor-pointer">
          Select All
        </span>
        <span onClick={onClearAll} className="hover:underline cursor-pointer">
          Clear All
        </span>
      </div>
    </div>
  );
}
