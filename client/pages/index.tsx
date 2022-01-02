import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilState, useRecoilValue } from "recoil";
import Head from "next/head";
import FilterData from "../components/FilterData";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import InfiniteScroll from "react-infinite-scroll-component";
import { filteredListState, renderNumState } from "../store/index";
import meta from "../public/meta.json";
import { VideoMeta } from "../types/types";
import VideoCard from "../components/VideoCard";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

dayjs.extend(isBetween);
dayjs.extend(utc);

const VideoList: React.FC = () => {
  const { t } = useTranslation("main");
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
    return () => window.removeEventListener("scroll", toggleVisibility);
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

        <Center flexDirection="column">
          <Flex
            w="100%"
            maxW="860px"
            mb="4"
            direction="row"
            justify="space-between"
            align="center"
          >
            <Heading>{t("heading")}</Heading>
            <Spacer />
            <Button
              ref={filterButtonRef}
              onClick={onOpen}
              colorScheme="brand"
              _hover={{ bgColor: "brand.200" }}
            >
              {t("filterBtn")}
            </Button>
          </Flex>
          <Box w="100%" maxW="860px">
            <InfiniteScroll
              dataLength={filteredList ? filteredList.length : 0}
              hasMore={true}
              scrollThreshold={1}
              next={fetchNextData}
              scrollableTarget="app"
              loader={null}
            >
              <Stack direction="column" spacing="2" ml="1.5" mr="1.5" mb="4">
                {filteredList.map((item) => (
                  <Box key={item.id} w="100%">
                    <VideoCard item={item} />
                  </Box>
                ))}
              </Stack>
            </InfiniteScroll>
          </Box>
        </Center>

        {buttonVis ? (
          <IconButton
            onClick={scrollToTop}
            colorScheme="brand"
            pos="fixed"
            bottom="10"
            right="8"
            zIndex="20"
            aria-label="Scroll to top"
            _hover={{ bg: "brand.200", transition: "0.3s" }}
            icon={<ChevronUpIcon fontSize="20" />}
          />
        ) : null}
      </Box>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["main", "filter"])),
    },
  };
}

export default VideoList;
