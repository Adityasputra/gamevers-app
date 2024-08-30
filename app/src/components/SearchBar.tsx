"use client";

import { useState, useMemo } from "react";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a game"
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </>
  );
}
