import { createContext, useState } from "react";

interface SortProps {
  sort: "asc" | "desc";
  setSort: (sort: "asc" | "desc") => void;
}

const SortContext = createContext<SortProps>({
  sort: "desc",
  setSort: () => {},
});

export default SortContext;
