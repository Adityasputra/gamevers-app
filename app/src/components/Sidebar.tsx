import Link from "next/link";
import React, { useState } from "react";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  handleSearchChange,
}: SidebarProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-800">
      <Link href="/" className="text-lg font-bold text-center text-gray-100">
        LevelUp Games
      </Link>
      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-white focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="mx-4 font-medium">Wishlist</span>
          </Link>

          <hr className="my-6 border-gray-600" />

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 mt-5 text-gray-100 transition-colors duration-300 transform rounded-md dark:text-gray-400 ${
                isDropdownOpen ? "bg-gray-700 dark:bg-gray-700" : ""
              } hover:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-100`}
            >
              Platforms
              <svg
                className={`w-5 h-5 transition-transform duration-300 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06 0L10 10.879l3.71-3.67a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-md shadow-lg dark:bg-gray-700">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${
                      selectedCategory === category
                        ? "bg-gray-700 dark:bg-gray-600 text-gray-100 dark:text-white"
                        : "text-gray-100 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
