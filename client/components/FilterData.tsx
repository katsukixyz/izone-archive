import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { SortOption, TagOption, VideoMeta } from "../types/types";
import {
  filteredListState,
  dateRangeState,
  sortState,
  searchState,
  tagsState,
} from "../store";
import {
  Input,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

import Select from "react-select";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const combineFilters = (
  data: VideoMeta[],
  dateRange: [string, string],
  sort: SortOption,
  search: string,
  tags: TagOption[]
) => {
  const parsedStartDate = dayjs(dateRange[0], "MM/DD/YYYY", true);
  const parsedEndDate = dayjs(dateRange[1], "MM/DD/YYYY", true);

  let filteredListData = [...data];

  // tags
  if (tags.length !== 0) {
    // satisfied when VideoMeta item tags includes any user filtered tags (OR)
    filteredListData = data.filter((item) =>
      tags.some((e) => item.tags.includes(e.value))
    );
  }
  // date
  if (parsedStartDate.isValid() && parsedEndDate.isValid()) {
    filteredListData = filteredListData.filter((item) => {
      if (
        dayjs
          .utc(item.date)
          .local()
          .isBetween(parsedStartDate, parsedEndDate, "day", "[]")
      ) {
        return true;
      }
    });
  }

  // search
  if (search !== "") {
    filteredListData = filteredListData.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
  }

  // sort
  if (sort.value === "asc") {
    filteredListData = filteredListData.sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    );
  } else {
    filteredListData = filteredListData.sort(
      (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()
    );
  }

  return filteredListData;
};

interface FilterDataProps {
  filterButtonRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}

const FilterData: React.FC<FilterDataProps> = ({
  filterButtonRef,
  isOpen,
  onClose,
}) => {
  const { totalResults } = useRecoilValue(filteredListState);
  const [dateRange, setDateRange] = useRecoilState(dateRangeState);
  const [startDate, endDate] = dateRange;
  const [sort, setSort] = useRecoilState(sortState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [search, setSearch] = useRecoilState(searchState);

  const resetFilters = () => {
    setDateRange(["", ""]);
    setSort({ value: "desc", label: "Most to least recent" });
    setTags([]);
    setSearch("");
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={filterButtonRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{`Videos found: ${totalResults}`}</DrawerHeader>
        <DrawerBody>
          <Stack direction="column">
            <Stack direction="row">
              <Input
                value={startDate}
                focusBorderColor="brand.500"
                placeholder="Start date"
                onChange={(event) =>
                  setDateRange([event.target.value, endDate])
                }
              />
              <Input
                value={endDate}
                focusBorderColor="brand.500"
                placeholder="End date"
                onChange={(event) =>
                  setDateRange([startDate, event.target.value])
                }
              />
            </Stack>
            <Select
              isSearchable={false}
              value={sort}
              onChange={(sort) => setSort(sort!)}
              options={sortOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  neutral20: "#E2E8F0",
                  neutral30: "#CBD5E0",
                  primary: "#DB679A",
                  primary25: "#F8E1EB",
                  primary50: "#F0BCD3",
                },
              })}
              styles={customStyles}
            />
            <Input
              value={search}
              focusBorderColor="brand.500"
              placeholder="Search titles"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              placeholder="Filter by tags"
              value={tags}
              onChange={(value) => setTags(value as TagOption[])}
              options={tagOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  neutral20: "#E2E8F0",
                  neutral30: "#CBD5E0",
                  primary: "#DB679A",
                  primary25: "#F8E1EB",
                  primary50: "#F0BCD3",
                },
              })}
              styles={customStyles}
            />
          </Stack>

          {!(
            !startDate &&
            !endDate &&
            tags.length === 0 &&
            !search &&
            sort.value === "desc"
          ) ? (
            <Button
              colorScheme="brand"
              variant="link"
              mt="2"
              onClick={resetFilters}
            >
              Reset
            </Button>
          ) : null}
          <Box mt="2">
            <Text color="gray.400" fontSize="sm">
              Enter start and end dates in the format MM/DD/YYYY
            </Text>
            <Text color="gray.400" fontSize="sm" mt="1">
              Selecting multiple tags displays results with any of the selected
              tags
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { combineFilters };
export default FilterData;

const customStyles = {
  placeholder: (defaultStyles: any) => ({
    ...defaultStyles,
    color: "#A0AEC0",
  }),
  control: (base: any) => ({
    ...base,
    paddingLeft: 6,
    fontSize: 16,
  }),
  menu: (base: any) => ({
    ...base,
    fontSize: 16,
  }),
};

const sortOptions: SortOption[] = [
  {
    value: "desc",
    label: "Most to least recent",
  },
  {
    value: "asc",
    label: "Least to most recent",
  },
];

export const tagCategories = [
  "Live",
  "VPICK",
  "ENOZI",
  "Promotion",
  "MV",
  "Cheer Guide",
  "Making Film",
  "LieV",
  "Star Road",
  "Idol Room",
  "Greetings",
  "Dance Practice",
  "Deleted",
  "Audio Only",
  "Misc",
];

const tagOptions: TagOption[] = [
  { label: "Live", value: "Live" },
  { label: "VPICK", value: "VPICK" },
  { label: "ENOZI", value: "ENOZI" },
  { label: "Promotion", value: "Promotion" },
  { label: "MV", value: "MV" },
  { label: "Cheer Guide", value: "Cheer Guide" },
  { label: "Making Film", value: "Making Film" },
  { label: "LieV", value: "LieV" },
  { label: "Star Road", value: "Star Road" },
  { label: "Idol Room", value: "Idol Room" },
  { label: "Greetings", value: "Greetings" },
  { label: "Dance Practice", value: "Dance Practice" },
  { label: "Deleted", value: "Deleted" },
  { label: "Audio Only", value: "Audio Only" },
  { label: "Misc", value: "Misc" },
];
