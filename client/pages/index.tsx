import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Head from "next/head";
import FilterData from "../components/FilterData";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import InfiniteScroll from "react-infinite-scroll-component";
import { filteredListState, renderNumState } from "../store/index";
import meta from "../src/meta.json";
import { VideoMeta } from "../types/types";
import VideoCard from "../components/VideoCard";
import { IoChevronUp } from "react-icons/io5";
import {
  Text,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

dayjs.extend(isBetween);
dayjs.extend(utc);

interface VideoListProps {
  data: VideoMeta[];
  initListData: VideoMeta[];
}

const VideoList: React.FC<VideoListProps> = () => {
  const { filteredList } = useRecoilValue(filteredListState);
  const [renderNum, setRenderNum] = useRecoilState(renderNumState);

  const [buttonVis, setButtonVis] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const filterButtonRef = useRef<HTMLButtonElement>(null);

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
  const fetchNextData = () => {
    setRenderNum(renderNum + 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <Box p="6">
        <Head>
          <title>IZ*ONE VLIVE Archive</title>
          <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
          <meta property="og:title" content="IZ*ONE VLIVE Archive" />
          <meta
            property="og:description"
            content={`View all ${meta.length} archived videos of IZ*ONE's VLIVE channel.`}
          />
          <meta
            property="description"
            content={`View all ${meta.length} archived videos of IZ*ONE's VLIVE channel.`}
          />
        </Head>

        <FilterData
          filterButtonRef={filterButtonRef}
          isOpen={isOpen}
          onClose={onClose}
        />

        <Center>
          <Stack direction="column" spacing="4" maxW="1000px" align="start">
            <Flex
              w="100%"
              direction="row"
              justify="space-between"
              align="center"
            >
              <Heading>VLIVE Archive</Heading>
              <Button
                ref={filterButtonRef}
                onClick={onOpen}
                colorScheme="brand"
                _hover={{ bgColor: "brand.200" }}
              >
                Filter
              </Button>
            </Flex>
            <InfiniteScroll
              dataLength={filteredList ? filteredList.length : 0}
              hasMore={true}
              scrollThreshold={1}
              next={fetchNextData}
              scrollableTarget="app"
              loader={null}
            >
              <Stack direction="column" spacing="2" ml="1.5" mr="1.5">
                {filteredList.map((item) => (
                  <Box key={item.id}>
                    <VideoCard item={item} />
                  </Box>
                ))}
              </Stack>
            </InfiniteScroll>
          </Stack>
        </Center>

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
      </Box>
    </>
  );
};

export default VideoList;
