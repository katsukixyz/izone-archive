import { tagCategories } from "../components/FilterData";

export type VideoMeta = {
  id: string;
  date: string;
  title: string;
  duration: number;
  video: string;
  thumbnail: string;
  subtitles: SubtitleMeta[];
  tags: string[];
};

export type SubtitleMeta = {
  code: string;
  url: string;
};

export type SortOption = {
  value: "desc" | "asc";
  label: "Most to least recent" | "Least to most recent";
};

export type TagOption = {
  value: Tags;
  label: Tags;
};

type Tags = typeof tagCategories[number];
