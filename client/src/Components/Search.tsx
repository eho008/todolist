import { useState } from "react";
import useComponentVisible from "../hooks/useComponent";

interface SearchProps {
  setQuery: (query: string) => void;
}

export default function Search({ setQuery }: SearchProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLInputElement>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <input
      type="search"
      className={
        isComponentVisible || searchInput
          ? "search-input-expanded"
          : "search-input-collapsed"
      }
      placeholder="&#xf002;"
      onClick={() => setIsComponentVisible(true)}
      ref={ref}
      value={searchInput}
      onChange={(e) => {
        setQuery(e.target.value);
        setSearchInput(e.target.value);
      }}
    />
  );
}
