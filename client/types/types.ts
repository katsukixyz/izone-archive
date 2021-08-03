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
