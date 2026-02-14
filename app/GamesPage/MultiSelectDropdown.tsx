"use client";

import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";

export interface Option {
  id: string;
  name: string;
  group?: string;
}

interface Props {
  options: Option[];
  selected: Option[];
  onChange: (items: Option[]) => void;
  placeholder?: string;
}

export default function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
}: Props) {
  const [query, setQuery] = useState("");

  // بدون useEffect — فقط داخل render فیلتر انجام می‌شود
  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter((o) =>
      o.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  const groups = useMemo(() => {
    const map: Record<string, Option[]> = {};
    filtered.forEach((o) => {
      const g = o.group ?? "Other";
      if (!map[g]) map[g] = [];
      map[g].push(o);
    });
    return map;
  }, [filtered]);

  const isSelected = (opt: Option) => selected.some((s) => s.id === opt.id);

  const toggleOption = (opt: Option) => {
    if (isSelected(opt)) {
      onChange(selected.filter((s) => s.id !== opt.id));
    } else {
      onChange([...selected, opt]);
    }
  };

  const selectAll = () => onChange(filtered);
  const clearAll = () => onChange([]);

  return (
    <div className="relative w-full">
      <Listbox value={selected} onChange={() => {}} multiple>
        {({ open }) => (
          <>
            <Listbox.Button className="w-full border rounded px-3 py-2 bg-white text-left flex justify-between items-center">
              {selected.length === 0
                ? placeholder
                : `${selected.length} selected`}
              <span className="text-gray-500">▼</span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded max-h-72 overflow-auto">
                {/* SEARCH */}
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between px-2 pb-2 text-sm">
                  <button
                    onClick={selectAll}
                    className="text-indigo-600 hover:underline"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* GROUPS */}
                {Object.entries(groups).map(([groupName, items]) => (
                  <div key={groupName}>
                    <div className="px-3 py-1 text-gray-700 font-semibold text-sm">
                      {groupName}
                    </div>
                    {items.map((opt) => (
                      <Listbox.Option key={opt.id} as={Fragment} value={opt}>
                        {({ active }) => (
                          <li
                            className={clsx(
                              "cursor-pointer py-2 px-3 flex justify-between",
                              active && "bg-indigo-100",
                            )}
                            onClick={() => toggleOption(opt)}
                          >
                            <span>{opt.name}</span>
                            {isSelected(opt) && (
                              <span className="text-indigo-600 font-bold">
                                ✔
                              </span>
                            )}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-center text-sm">
                    No results found
                  </div>
                )}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
