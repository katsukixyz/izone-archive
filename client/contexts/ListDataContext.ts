import { createContext, useState } from "react";
import { VideoMeta } from "../types/types";

interface ListDataProps {
  listData: VideoMeta[];
  setListData: (listData: VideoMeta[]) => void;
}

const ListDataContext = createContext<ListDataProps>({
  listData: [],
  setListData: () => {},
});

export default ListDataContext;
