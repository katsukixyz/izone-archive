import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import dayjs from "dayjs";
import { VideoMeta } from "../types/types";
import {
  filteredListState,
  dateRangeState,
  sortState,
  searchState,
} from "../store";
const { Option } = Select;
const { RangePicker } = DatePicker;

const combineFilters = (
  data: VideoMeta[],
  dateRange: any,
  sort: string,
  search: string
) => {
  let dateFilteredListData;
  let searchFilteredListData;
  let sortFilteredListData;

  //date first
  if (dateRange !== null) {
    dateFilteredListData = data.filter(function (item) {
      if (
        dayjs
          .utc(item.date)
          .local()
          .isBetween(dateRange[0], dateRange[1], "day", "[]")
      ) {
        return true;
      }
    });
  } else {
    dateFilteredListData = data;
  }

  //search next
  if (search !== "") {
    searchFilteredListData = dateFilteredListData.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
  } else {
    searchFilteredListData = dateFilteredListData;
  }

  //sort last
  if (sort === "asc") {
    sortFilteredListData = searchFilteredListData.sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    );
  } else {
    sortFilteredListData = searchFilteredListData.sort(
      (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()
    );
  }

  return sortFilteredListData;
};

const FilterData: React.FC = () => {
  const { totalResults } = useRecoilValue(filteredListState);
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [sort, setSort] = useRecoilState(sortState);
  const [search, setSearch] = useRecoilState(searchState);
  return (
    <div
      className="filter"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <RangePicker
        value={dateRange}
        onChange={(value) => {
          setDateRange(value);
        }}
      />
      <Select
        value={sort}
        defaultValue="desc"
        onChange={(value) => {
          setSort(value);
        }}
      >
        <Option value="desc">Most to least recent</Option>
        <Option value="asc">Least to most recent</Option>
      </Select>
      <Input
        allowClear
        value={search}
        placeholder="Search titles"
        style={{ width: 200 }}
        onChange={({ target }) => {
          const { value } = target;
          setSearch(value);
        }}
      />
      <div
        style={{
          fontWeight: 500,
          fontSize: 16,
          paddingLeft: "1em",
        }}
      >{`Videos found: ${totalResults}`}</div>
    </div>
  );
};

export { combineFilters };
export default FilterData;
