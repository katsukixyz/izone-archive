import { Text } from "@chakra-ui/react";
import { TimelineState } from "@xzdarcy/react-timeline-editor";
import React, { FC, useEffect, useState } from "react";

const timeRender = (time: number) => {
  const float = (parseInt((time % 1) * 100 + "") + "").padStart(2, "0");
  const min = (parseInt(time / 60 + "") + "").padStart(2, "0");
  const second = (parseInt((time % 60) + "") + "").padStart(2, "0");
  return `${min}:${second}.${float.replace("0.", "")}`;
};

const TimelinePlayer: FC<{
  timelineState: React.MutableRefObject<TimelineState | null>;
  duration: number;
}> = ({ timelineState, duration }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!timelineState.current) return;
    const engine = timelineState.current;
    engine.listener.on("afterSetTime", ({ time }) => setTime(time));
    engine.listener.on("setTimeByTick", ({ time }) => {
      setTime(time);
    });

    return () => {
      if (!engine) return;
      engine.pause();
      engine.listener.offAll();
    };
  }, []);

  return (
    <div className="timeline-player">
      <Text>{`${timeRender(time)} | ${timeRender(duration)}`}</Text>
    </div>
  );
};

export default TimelinePlayer;
