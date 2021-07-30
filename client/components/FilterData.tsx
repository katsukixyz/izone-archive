import React from "react";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import dayjs from "dayjs";
import { VideoMeta } from "../types/types";
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FilterDataProps {
  setDateRange: (dateRange: any) => void;
  setSort: (sort: "asc" | "desc") => void;
  setSearch: (search: string) => void;
  setListData: (listData: VideoMeta[]) => void;
  data: VideoMeta[];
  dateRange: any;
  sort: "asc" | "desc";
  search: string;
}

const combineFilters = (
  data: VideoMeta[],
  dateRange: any, //TODO: fix
  sort: string,
  search: string
) => {
  let dateFilteredListData;
  let searchFilteredListData;
  let sortFilteredListData;

  //date first
  if (dateRange != null) {
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
  if (search != "") {
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

const FilterData: React.FC<FilterDataProps> = ({
  setDateRange,
  setSort,
  setSearch,
  setListData,
  data,
  dateRange,
  sort,
  search,
}) => {
  return (
    <div
      className="filter"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
      }}
    >
      <RangePicker
        value={dateRange}
        onChange={(value) => {
          setDateRange(value);
          const sorted = combineFilters(data, value, sort, search).slice(0, 20);
          setListData(sorted);
        }}
      />
      <Select
        value={sort}
        defaultValue="desc"
        onChange={(value) => {
          setSort(value);
          const sorted = combineFilters(data, dateRange, value, search).slice(
            0,
            20
          );
          setListData(sorted);
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
          console.log("called");
          const { value } = target;
          setSearch(value);
          const sorted = combineFilters(
            data,
            dateRange,
            sort,
            value.toLowerCase()
          ).slice(0, 20);
          setListData(sorted);
        }}
      />
    </div>
  );
};

export { combineFilters };
export default FilterData;
