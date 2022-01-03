import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { atom, selector } from "recoil";
import { combineFilters, tagCategories } from "../components/FilterData";
import LocaleContext from "../contexts/LocaleContext";
import meta from "../public/meta.json";
import { SortOption, TagOption, VideoMeta } from "../types/types";

const dateRangeState = atom({
  key: "dateRangeState",
  default: ["", ""] as [string, string],
});

const listDataState = atom({
  key: "listDataState",
  default: meta as VideoMeta[],
});

const tagsState = atom({
  key: "tagsState",
  default: [] as TagOption[],
});

const searchState = atom({
  key: "searchState",
  default: "",
});

const sortState = atom({
  key: "sortState",
  // default: { value: "desc", label: "Most to least recent" } as SortOption,
  default: "desc" as "desc" | "asc",
});

const renderNumState = atom({
  key: "renderNumState",
  default: 20,
});

const filteredListState = selector({
  key: "filteredListState",
  get: ({ get }) => {
    const dateRange = get(dateRangeState);
    const search = get(searchState);
    const sort = get(sortState);
    const tags = get(tagsState);
    const listData = get(listDataState);
    const renderNum = get(renderNumState);
    const filteredList = combineFilters(
      [...listData],
      dateRange,
      sort,
      search,
      tags
    );
    return {
      filteredList: filteredList.slice(0, renderNum),
      totalResults: filteredList.length,
    };
  },
});

export {
  dateRangeState,
  tagsState,
  listDataState,
  searchState,
  sortState,
  renderNumState,
  filteredListState,
};
