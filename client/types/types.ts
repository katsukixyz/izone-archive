export type VideoMeta = {
  id: string;
  date: string;
  title: string;
  duration: number;
  video: string;
  thumbnail: string;
  subtitles: SubtitleMeta[];
};

export type SubtitleMeta = {
  code: string;
  url: string;
};
