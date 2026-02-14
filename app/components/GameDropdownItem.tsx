import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { Game } from "../types/GamesResponse";

type ItemProps = {
  item: { type: "genre" | "game"; label: string; game?: Game };
  isSelected: boolean;
  isActive: boolean;
  onToggle: () => void;
};

export function GameDropdownItem({
  item,
  isSelected,
  isActive,
  onToggle,
}: ItemProps) {
  if (item.type === "genre")
    return (
      <div className="px-3 py-1 font-bold uppercase text-sm text-white rounded-lg mb-1 shadow-md sticky top-0 bg-linear-to-r from-indigo-500 to-purple-500">
        {item.label}
      </div>
    );

  return (
    <Listbox.Option key={item.label} value={item.label} as={Fragment}>
      <li
        className={`cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg mb-1 transition ${isActive ? "bg-indigo-100 text-indigo-900" : "text-gray-900"}`}
        onClick={onToggle}
      >
        <span
          className={`block truncate ${isSelected ? "font-semibold" : "font-normal"}`}
        >
          {item.label}
        </span>
        {item.game?.genres?.length ? (
          <div className="absolute right-3 top-2 flex space-x-1">
            {item.game.genres.map((g) => (
              <span
                key={g.id}
                className="bg-indigo-100 text-indigo-800 text-xs px-1 rounded"
              >
                {g.name}
              </span>
            ))}
          </div>
        ) : null}

        {isSelected && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
            <CheckIcon className="h-5 w-5" />
          </span>
        )}
      </li>
    </Listbox.Option>
  );
}
