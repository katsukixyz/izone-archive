import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import FilterData, { combineFilters } from "../components/FilterData";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import InfiniteScroll from "react-infinite-scroll-component";
import ListDataContext from "../contexts/ListDataContext";
import DateRangeContext from "../contexts/DateRangeContext";
import SortContext from "../contexts/SortContext";
import SearchContext from "../contexts/SearchContext";
import { meta } from "../src/meta";
import { VideoMeta } from "../types/types";
import VideoCard from "../components/VideoCard";
import { IoChevronUp } from "react-icons/io5";

dayjs.extend(isBetween);
dayjs.extend(utc);

interface VideoListProps {
  data: VideoMeta[];
  initListData: VideoMeta[];
}

const VideoList: React.FC<VideoListProps> = ({ data, initListData }) => {
  const { listData, setListData } = useContext(ListDataContext);
  const { dateRange, setDateRange } = useContext(DateRangeContext);
  const { sort, setSort } = useContext(SortContext);
  const { search, setSearch } = useContext(SearchContext);

  const [buttonVis, setButtonVis] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setButtonVis(true);
    } else {
      setButtonVis(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function fetchNextData() {
    //compare listData to data and get n more results
    let sortedData = combineFilters(data, dateRange, sort, search);

    if (sortedData.length !== listData.length) {
      // finds last id of current render list and where it falls in sortedList, gets next n
      const currentLastId = listData[listData.length - 1].id;
      const sortedIndex = sortedData.findIndex((e) => e.id === currentLastId);
      const remainingArr = sortedData.slice(
        sortedIndex + 1,
        listData.length + 20
      ); //next n elements
      const combinedArr = listData.concat(remainingArr);
      setListData(combinedArr);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    //determines initial render (empty listData) or not (non-empty listData)
    if (listData.length !== 0) {
      setListData(listData);
    } else {
      setListData(initListData);
    }
  }, []);

  return (
    <div className="app">
      <Head>
        <title>IZ*ONE VLIVE Archive</title>
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
        <meta property="og:title" content="IZ*ONE VLIVE Archive" />
        <meta
          property="og:description"
          content={`View all ${data.length} archived videos of IZ*ONE's VLIVE channel.`}
        />
      </Head>

      <FilterData
        // combineFilters={combineFilters}
        setDateRange={setDateRange}
        setSort={setSort}
        setSearch={setSearch}
        setListData={setListData}
        data={data}
        dateRange={dateRange}
        sort={sort}
        search={search}
      />

      {buttonVis ? (
        <div
          className="upButton"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            right: "4%",
            zIndex: 1,
            padding: "8px",
            borderRadius: 100,
            backgroundColor: "#f8f4f4",
            border: "0px",
            boxShadow:
              "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <a>
            <IoChevronUp className="upIcon" size={24} />
          </a>
        </div>
      ) : null}

      <InfiniteScroll
        dataLength={listData ? listData.length : 0}
        hasMore={true}
        scrollThreshold={1}
        next={() => fetchNextData()}
        scrollableTarget="app"
        loader={null}
      >
        <div
          className="list"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {listData
            ? listData.map((item: VideoMeta) => (
                <div
                  key={item.id}
                  style={{ paddingTop: "5px", paddingBottom: "5px" }}
                >
                  <VideoCard item={item} />
                </div>
              ))
            : []}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export async function getStaticProps() {
  let initListData = combineFilters(meta, null, "desc", "");

  initListData = initListData.slice(0, 20);
  return {
    props: {
      data: meta,
      initListData,
    },
  };
}

export default VideoList;
