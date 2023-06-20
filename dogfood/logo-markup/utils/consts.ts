export const VIDEO_WIDTH = 768;
export const VIDEO_HEIGHT = 432;

export const SIXTEEN_BY_NINE_LANDSCAPE = 16 / 9;
export const SIXTEEN_BY_NINE_PORTRAIT = 9 / 16;
export const SQUARE = 1;

export const CANVAS_WIDTH_LANDSCAPE = VIDEO_WIDTH;
export const CANVAS_HEIGHT_LANDSCAPE = VIDEO_HEIGHT;

export const CANVAS_WIDTH_PORTRAIT = VIDEO_HEIGHT * SIXTEEN_BY_NINE_PORTRAIT;
export const CANVAS_HEIGHT_PORTRAIT = VIDEO_HEIGHT;

export const CANVAS_WIDTH_SQUARE = VIDEO_HEIGHT;
export const CANVAS_HEIGHT_SQUARE = VIDEO_HEIGHT;

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.URL)
    // reference for vercel.com
    return `https://${process.env.URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const db = {
  dbUrl: process.env.DB_URL,
  dbName: "logo-markup",
  baseUrl: getBaseUrl(),
} as const;
