import React from "react";
import { VideoMeta } from "../types/types";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

interface VideoCardProps {
  item: VideoMeta;
}

const Duration = ({ timestamp }: { timestamp: number }) => {
  let h = Math.floor(timestamp / 3600);
  let m = Math.floor((timestamp % 3600) / 60);
  let s = Math.floor(timestamp % 60);
  let hDisplay = h > 0 ? "0" + h + ":" : "";
  let mDisplay = m < 10 ? "0" + m + ":" : m + ":";
  let sDisplay = s < 10 ? "0" + s : s;
  return <>{hDisplay + mDisplay + sDisplay}</>;
};

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const { id, thumbnail, title, date, duration, tags } = item;
  return (
    <div
      className="listCard"
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        padding: "20px",
        borderRadius: "6px",
        border: "0px",
        boxShadow:
          "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Link href={`/video/${id}`}>
        <div className="video">
          <div style={{ paddingBottom: "56.25%", position: "relative" }}>
            <Image src={thumbnail} objectFit="contain" layout="fill" />
          </div>
        </div>
      </Link>
      <div className="cardMeta">
        <Link href={`/video/${id}`}>
          <a
            style={{
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {title}
          </a>
        </Link>
        <p>{dayjs.utc(date).local().format("MMMM D YYYY, h:mm:ss A")}</p>
        <div>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px",
                marginRight: "0.5em",
                borderRadius: 4,
                backgroundColor: "#F0BCD3",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <br />
        <div
          style={{
            color: "black",
            width: "auto",
            display: "inline",
            backgroundColor: "#f8f4f4",
            padding: "4px",
            borderRadius: 4,
          }}
        >
          <Duration timestamp={duration} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
