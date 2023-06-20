import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@/utils/consts";
import React from "react";
import ReactPlayer from "react-player/lazy";

interface VideoPlayerProps {
  playerRef: any;
  url: string;
  onReady: () => void;
}

export default function VideoPlayer({
  playerRef,
  url,
  onReady,
}: VideoPlayerProps) {
  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      onReady={onReady}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
}
