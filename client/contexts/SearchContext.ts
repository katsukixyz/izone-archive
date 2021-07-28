import { createContext, useState } from "react";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchContext = createContext<SearchProps>({
  search: "",
  setSearch: () => {},
});

export default SearchContext;
