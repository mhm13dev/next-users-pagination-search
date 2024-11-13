"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import queryString from "query-string";

export const SearchUsers: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to the first page with the search query
    router.push("/?" + queryString.stringify({ search, page: 1, size: 10 }));
  };

  return (
    <form className="my-8 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search users"
        className="block w-full max-w-96 px-4 py-1.5 border border-gray-100 rounded-lg shadow focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg shadow text-base ml-2 inline-block"
      >
        Search
      </button>
    </form>
  );
};
