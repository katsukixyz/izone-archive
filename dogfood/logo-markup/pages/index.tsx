import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { db } from "@/utils/consts";
import { IVideo } from "@/db/models/Video";
import Link from "next/link";

const { baseUrl } = db;

export default function Home({
  videos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(videos);
  return (
    <>
      <Head>
        <title>Video Markup</title>
      </Head>
      <Box p={10}>
        <Heading>Video Markup Dashboard</Heading>
        <Text mt={2} mb={2}>
          Thanks for making it over to this site! Your help is very very
          appreciated - it would take me a while to do this alone. This
          dashboard allows you to draw boxes on parts of videos using a timeline
          editor. Create boxes by double-clicking on the timeline. Resize the
          boxes to cover all logos and trademarked names. While the boxes have
          no fill in the editor, be assured that the reprocessed videos will
          have the boxes filled in. Once you are done editing a video, feel free
          to mark as complete to update the status of the video. I apologize for
          the quality of the website - you may run into some issues with the
          editor. In this case, please do not hesitate to reach out. Thank you
          all so much for your help!
        </Text>
        <Button
          size="xs"
          colorScheme="pink"
          variant="outline"
          onClick={async () => {
            setLoading(true);
            const res = await fetch(`${baseUrl}/api/video`);
            const videos = await res.json();
            setData(videos);
            setLoading(false);
          }}
        >
          Refresh
        </Button>
        <Box>
          {!loading ? (
            <Stack direction="column" h={500} overflowY="scroll" w="50%">
              {data.map((video, i) => {
                return (
                  <Link key={video.id} href={`/video/${video.id}`}>
                    <Flex
                      justifyContent="space-between"
                      bgColor={i % 2 === 0 ? "white" : "gray.50"}
                      p={2}
                      _hover={{
                        cursor: "pointer",
                      }}
                    >
                      <Text>{video.id}</Text>
                      <Tag colorScheme={video.completed ? "green" : "red"}>
                        {video.completed ? "Completed" : "Incomplete"}
                      </Tag>
                    </Flex>
                  </Link>
                );
              })}
            </Stack>
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  videos: IVideo[];
}> = async () => {
  const res = await fetch(`${baseUrl}/api/video`);
  const videos = await res.json();
  return { props: { videos } };
};
