// `SearchBar.tsx` (Client Component)
"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setProducts(data.data);
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
      />
    </div>
  );
}
