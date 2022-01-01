import React, { useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ReactPlayer from "react-player/lazy";
import meta from "../../public/meta.json";
import { VideoMeta } from "../../types/types";
import AutoplayContext from "../../contexts/AutoplayContext";
import {
  Box,
  Center,
  Link as ChakraLink,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

dayjs.extend(utc);

const Video: React.FC<VideoMeta> = ({
  date,
  title,
  video,
  thumbnail,
  subtitles,
}) => {
  const { autoplay } = useContext(AutoplayContext);

  return (
    <Box p="6">
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={thumbnail} />
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`${dayjs.utc(date).format("YYYY-MM-DD")}`}
        />
        <meta
          property="description"
          content={`${dayjs.utc(date).format("YYYY-MM-DD")}`}
        />
      </Head>

      <Center>
        <Stack direction="column" w="100%" maxW="1000px">
          <ChakraLink href="/" as={Link}>
            <ArrowBackIcon
              w={6}
              h={6}
              _hover={{
                color: "brand.500",
                cursor: "pointer",
                transition: "0.3s",
              }}
            />
          </ChakraLink>
          <Box mt="1" mb="1">
            <Box
              p="6"
              w="100%"
              borderRadius="6"
              boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            >
              <Box position="relative" pt="56.25%">
                <ReactPlayer
                  style={{ position: "absolute", top: 0, left: 0 }}
                  playing={autoplay}
                  url={video}
                  width="100%"
                  height="100%"
                  controls
                  config={{
                    file: {
                      attributes: {
                        crossOrigin: "true",
                        controlsList: "nodownload",
                      },
                      tracks: subtitles.map((e) => ({
                        kind: "subtitles",
                        src: e.url,
                        srcLang: e.code,
                        label: e.code,
                      })),
                    },
                  }}
                />
              </Box>

              <Box mt="6">
                <Text fontSize="2xl" fontWeight="medium">
                  {title}
                </Text>
                <Text mb="2">
                  {dayjs.utc(date).local().format("MMMM D YYYY, h:mm:ss A")}
                </Text>
                {subtitles.length !== 0 ? (
                  <Center
                    borderWidth="10px"
                    borderColor="brand.500"
                    borderLeftStyle="solid"
                    borderTopStyle="hidden"
                    borderRightStyle="hidden"
                    borderBottomStyle="hidden"
                    bg="brand.200"
                  >
                    <Box padding="3">
                      The following subtitles are available for this video:{" "}
                      <Stack direction="row" display="inline" spacing={1}>
                        {subtitles.map(({ code }) => (
                          <Tag size="sm" key={code}>
                            {code}
                          </Tag>
                        ))}
                      </Stack>
                    </Box>
                  </Center>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const vidObj = meta.filter((vid) => vid.id === params.id)[0];
  return { props: vidObj };
}

export async function getStaticPaths() {
  const paths = meta.flatMap((video) => [
    {
      params: {
        id: video.id,
      },
      locale: "en",
    },
    {
      params: {
        id: video.id,
      },
      locale: "ko",
    },
  ]);
  return { paths, fallback: false };
}

export default Video;
