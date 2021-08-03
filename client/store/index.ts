import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { combineFilters } from "../components/FilterData";
import meta from "../src/meta.json";
import { VideoMeta } from "../types/types";

const dateRangeState = atom({
  key: "dateRangeState",
  default: null as any, //antd @import .less errors when using dayjs in place of moment
});

const listDataState = atom({
  key: "listDataState",
  default: meta as VideoMeta[],
});

const searchState = atom({
  key: "searchState",
  default: "",
});

const sortState = atom({
  key: "sortState",
  default: "desc" as "asc" | "desc",
});

const renderNumState = atom({
  key: "renderNumState",
  default: 20,
});

const filteredListState = selector({
  key: "filteredListState",
  get: ({ get }) => {
    const dateRange: any = get(dateRangeState);
    const search = get(searchState);
    const sort = get(sortState);
    const listData = get(listDataState);
    const renderNum = get(renderNumState);
    const filteredList = combineFilters([...listData], dateRange, sort, search);
    return {
      filteredList: filteredList.slice(0, renderNum),
      totalResults: filteredList.length,
    };
  },
});

export {
  dateRangeState,
  listDataState,
  searchState,
  sortState,
  renderNumState,
  filteredListState,
};
