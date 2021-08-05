import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ReactPlayer from "react-player/lazy";
import meta from "../../src/meta.json";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { VideoMeta } from "../../types/types";

dayjs.extend(utc);

const Video: React.FC<VideoMeta> = ({
  date,
  title,
  video,
  thumbnail,
  subtitles,
}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={thumbnail} />
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`${dayjs.utc(date).format("YYYY-MM-DD")}`}
        />
      </Head>
      <div
        style={{
          fontSize: "18px",
          maxWidth: "1000px",
          paddingTop: "10px",
          textAlign: "left",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        <Link href="/">
          <ArrowLeftOutlined style={{ color: "black" }} />
        </Link>
      </div>
      <div style={{ paddingTop: "20px", marginBottom: "1em" }}>
        <div
          className="videoCard"
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            padding: "20px",
            maxWidth: "1000px",
            borderRadius: "6px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            border: "0px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div>
            <ReactPlayer
              playing
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
          </div>

          <div
            className="cardMeta"
            style={{ width: "100%", paddingTop: "20px" }}
          >
            <p style={{ fontSize: 22, fontWeight: 500 }}>{title}</p>
            <p>{dayjs.utc(date).local().format("MMMM D YYYY, h:mm:ss A")}</p>
            {subtitles.length !== 0 ? (
              <div
                style={{
                  padding: "1em",
                  backgroundColor: "#F0BCD3",
                  borderLeftWidth: "0.8em",
                  borderLeftStyle: "solid",
                  borderColor: "#DB679A",
                  borderWidth: 10,
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                The following subtitles are available for this video:{" "}
                {subtitles.map((sub) => (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.2em",
                      borderRadius: 6,
                      backgroundColor: "#f8f4f4",
                      marginRight: "0.2em",
                    }}
                  >
                    {sub.code}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const vidObj = meta.filter((vid) => vid.id === params.id)[0];
  return { props: vidObj };
}

export async function getStaticPaths() {
  const paths = meta.map((video) => ({
    params: {
      id: video.id,
    },
  }));
  return { paths, fallback: false };
}

export default Video;
