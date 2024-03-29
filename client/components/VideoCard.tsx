import React, { useContext } from "react";
import { VideoMeta } from "../types/types";
import Link from "next/link";
import { Box, Link as ChakraLink, Stack, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ko";
import { useTranslation } from "next-i18next";
import LocaleContext from "../contexts/LocaleContext";

interface VideoCardProps {
  item: VideoMeta;
}

const Duration = ({ duration }: { duration: number }) => {
  let h = Math.floor(duration / 3600);
  let m = Math.floor((duration % 3600) / 60);
  let s = Math.floor(duration % 60);
  let hDisplay = h > 0 ? "0" + h + ":" : "";
  let mDisplay = m < 10 ? "0" + m + ":" : m + ":";
  let sDisplay = s < 10 ? "0" + s : s;
  return <>{hDisplay + mDisplay + sDisplay}</>;
};

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const { t } = useTranslation("filter");
  const { locale } = useContext(LocaleContext);
  const { id, thumbnail, title, date, duration, tags, koTitle } = item;

  return (
    <Box
      display={{ base: "block", md: "flex" }}
      justifyContent="space-between"
      p="5"
      borderRadius="6"
      b="0"
      boxShadow="0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <ChakraLink as={Link} href={`/video/${id}`}>
        <Box
          pos="relative"
          w={{ base: "100%", md: "40%" }}
          mb={{ base: "3", md: "0" }}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Image
            width="368"
            height="207"
            src={thumbnail}
            layout="responsive"
            objectFit="contain"
          />
          <Tag pos="absolute" right="1" bottom="1" zIndex="10">
            {Duration({ duration })}
          </Tag>
        </Box>
      </ChakraLink>
      <Box w={{ base: "100%", md: "55%" }}>
        <ChakraLink as={Link} href={`/video/${id}`}>
          <Text
            fontSize="2xl"
            fontWeight="medium"
            _hover={{
              cursor: "pointer",
              color: "brand.500",
              transition: "0.3s",
            }}
          >
            {locale === "en" ? title : koTitle || title}
          </Text>
        </ChakraLink>
        <Text mt="2" fontSize="md">
          {locale === "en"
            ? dayjs
                .utc(date)
                .locale(locale)
                .local()
                .format("MMMM D YYYY, h:mm:ss A")
            : dayjs
                .utc(date)
                .locale(locale)
                .local()
                .format("YYYY년 MMMM D일 A h:mm:ss")}
        </Text>
        <Stack direction="row" mt="2">
          {tags.map((tag) => (
            <Tag key={tag} bg="brand.200">
              {t("tags." + tag)}
            </Tag>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoCard;
