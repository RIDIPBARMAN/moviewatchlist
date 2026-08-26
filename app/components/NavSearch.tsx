"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="nav-search">
      <input
        type="text"
        placeholder="Search films..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="search-icon" size={16} />
    </form>
  );
}
