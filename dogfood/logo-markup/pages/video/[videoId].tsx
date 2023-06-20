import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import {
  Timeline,
  TimelineRow,
  TimelineEffect,
  TimelineAction,
  TimelineState,
} from "@xzdarcy/react-timeline-editor";
import meta from "../../meta/meta.json";
import TimelinePlayer from "@/components/TimelinePlayer";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Rectangle from "@/components/Rectangle";
import { KonvaEventObject } from "konva/lib/Node";
import {
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  SIXTEEN_BY_NINE_LANDSCAPE,
  SIXTEEN_BY_NINE_PORTRAIT,
  CANVAS_WIDTH_LANDSCAPE,
  CANVAS_WIDTH_PORTRAIT,
  CANVAS_HEIGHT_LANDSCAPE,
  CANVAS_HEIGHT_PORTRAIT,
  SQUARE,
  CANVAS_WIDTH_SQUARE,
  CANVAS_HEIGHT_SQUARE,
} from "@/utils/consts";
import Link from "next/link";

const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
});

interface VideoPageProps {
  id: string;
  date: string;
  title: string;
  duration: number;
  video: string;
  thumbnail: string;
  subtitles: {
    code: string;
    url: string;
  }[];
  tags: string[];
  koTitle: string;
}

interface ActionRow extends TimelineRow {
  id: string;
  actions: ActionRectangle[];
}

export interface ActionRectangle extends TimelineAction {
  x: number;
  y: number;
  width: number;
  height: number;
  maxEnd?: number;
}

const mockData: ActionRow[] = [
  {
    id: "0",
    actions: [],
  },
];

const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "box",
  },
};

const scaleArr = [5, 10, 30, 60, 120, 300, 600];
const scaleWidth = 150;
const startLeft = 20;

export default function VideoPage(props: VideoPageProps) {
  const { id, video, duration } = props;
  const toast = useToast();
  const [data, setData] = useState(mockData);

  const [loading, setLoading] = useState(true);

  const selectedElement = useRef<any>(null);
  const [selectedAction, setSelectedAction] = useState<TimelineAction | null>(
    null
  );
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [scale, setScale] = useState(6);

  const [completed, setCompleted] = useState(false);

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };

  const timelineState = useRef<TimelineState>(null);
  //   const playerRef = useRef<any>(null);
  const [playerRef, setNode] = useState<any>(null);
  const setPlayerRef = useCallback((newNode: any) => {
    setNode(newNode);
  }, []);

  const idRef = useRef(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/video?videoId=${id}`);
      const videoData = await res.json();
      setData([
        {
          id: "0",
          actions: videoData.actions,
        },
      ]);
      setCompleted(videoData.completed);
    }
    getData();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace" && selectedElement.current !== null) {
        const actionId = selectedAction!.id;
        const newActions = data[0].actions.filter(
          (action) => action.id !== actionId
        );
        console.log(newActions);
        selectedElement.current = null;
        // selectedAction.current = null;
        setSelectedAction(null);
        setData([
          {
            id: "0",
            actions: newActions,
          },
        ]);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, selectedAction]);

  const videoHeight = playerRef?.getInternalPlayer()?.videoHeight;
  const videoWidth = playerRef?.getInternalPlayer()?.videoWidth;

  const { offset, canvasWidth, canvasHeight } = useMemo(() => {
    let offset;
    let canvasWidth;
    let canvasHeight;

    if (videoWidth === 0 && videoHeight === 0)
      return {
        offset: 0,
        canvasWidth: null,
        canvasHeight: null,
      };

    switch (videoWidth / videoHeight) {
      case SIXTEEN_BY_NINE_LANDSCAPE:
        canvasWidth = CANVAS_WIDTH_LANDSCAPE;
        canvasHeight = CANVAS_HEIGHT_LANDSCAPE;
        offset = 0;
        break;
      case SIXTEEN_BY_NINE_PORTRAIT:
        canvasWidth = CANVAS_WIDTH_PORTRAIT;
        canvasHeight = CANVAS_HEIGHT_PORTRAIT;
        offset = (VIDEO_WIDTH - CANVAS_WIDTH_PORTRAIT) / 2;
        break;
      case SQUARE:
        canvasWidth = CANVAS_WIDTH_SQUARE;
        canvasHeight = CANVAS_HEIGHT_SQUARE;
        offset = (VIDEO_WIDTH - CANVAS_WIDTH_PORTRAIT) / 2;
        break;
      default:
        // assumes landscape orientation, bound by height
        canvasWidth = (videoWidth * CANVAS_HEIGHT_LANDSCAPE) / videoHeight;
        canvasHeight = CANVAS_HEIGHT_LANDSCAPE;
        offset = (VIDEO_WIDTH - canvasWidth) / 2;
    }
    return { offset, canvasWidth, canvasHeight };
  }, [videoHeight, videoWidth]);

  return (
    <Box p={10}>
      <Link href="/">
        <Button size="sm">Back to home</Button>
      </Link>
      <Heading>{id}</Heading>
      <Box mb={2}>
        {loading ? (
          <Spinner />
        ) : (
          <Tag colorScheme={completed ? "green" : "red"}>
            {completed ? "Completed" : "Incomplete"}
          </Tag>
        )}
      </Box>

      <Box position="relative">
        <VideoPlayer
          playerRef={setPlayerRef as any}
          url={video}
          onReady={() => setLoading(false)}
        />
        {!loading && playerRef && canvasWidth && (
          <Stage
            width={canvasWidth}
            height={canvasHeight}
            style={{ position: "absolute", top: 0, left: offset, zIndex: 10 }}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              {data[0].actions.map((action, i) => {
                return (
                  <Rectangle
                    key={action.id}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                    shapeProps={{
                      x: action.x,
                      y: action.y,
                      width: action.width,
                      height: action.height,
                      id: action.id,
                      stroke: "black",
                      strokeWidth: 2,
                      visible:
                        currentTime >= action.start &&
                        currentTime <= action.end,
                    }}
                    isSelected={
                      action.id === selectedShape ||
                      action.id === selectedAction?.id
                    }
                    onSelect={() => {
                      setSelectedShape(action.id);
                    }}
                    onChange={(attrs) => {
                      const actions = [...data[0].actions];
                      const newActionObj = {
                        ...actions[i],
                        ...attrs,
                      };
                      actions[i] = newActionObj;
                      setData([{ id: "0", actions }]);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        )}
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <Stack direction="column">
          <TimelinePlayer timelineState={timelineState} duration={duration} />
          <Timeline
            ref={timelineState as any}
            style={{
              height: 85,
              width: "100%",
            }}
            autoScroll
            scale={scaleArr[scale]}
            onCursorDrag={(time) => {
              if (time > duration) return;
              playerRef.seekTo(time, "seconds");
              setCurrentTime(time);
            }}
            scaleWidth={scaleWidth}
            startLeft={startLeft}
            onChange={(editorData) => setData(editorData as ActionRow[])}
            editorData={data}
            effects={mockEffect}
            onClickRow={(e: any) => {
              setSelectedShape(null);
              if (
                e.target.classList.contains("timeline-editor-edit-row") &&
                selectedElement.current !== null
              ) {
                selectedElement.current.style.border = "0px";
                selectedElement.current = null;
                // selectedAction.current = null;
                setSelectedAction(null);
              }
            }}
            onClickActionOnly={(e: any, { action }) => {
              setSelectedShape(null);
              if (!e.target.classList.contains("timeline-editor-action"))
                return;
              if (selectedElement.current === e.target) {
                selectedElement.current.style.border = "0px";
                selectedElement.current = null;
                // selectedAction.current = null;
                setSelectedAction(null);
                return;
              }
              if (selectedElement.current !== null) {
                selectedElement.current.style.border = "0px";
              }
              e.target.style.border = "1px solid white";
              selectedElement.current = e.target;
              //   selectedAction.current = action;
              setSelectedAction(action);
            }}
            onDoubleClickRow={(e, { row, time }) => {
              setSelectedShape(null);
              if (time > duration) {
                toast({
                  title: "Error",
                  description: "Cannot create box outside of video duration.",
                  status: "error",
                  duration: 4000,
                  isClosable: true,
                });
                return;
              }
              setData((pre) => {
                const newAction: ActionRectangle = {
                  id: `action${idRef.current++}`,
                  start: time,
                  end:
                    time + scaleArr[scale] > duration
                      ? duration
                      : time + scaleArr[scale],
                  effectId: "effect0",
                  x: 10,
                  y: 10,
                  width: 50,
                  height: 50,
                  maxEnd: duration,
                };
                return [
                  {
                    id: "0",
                    actions: [...pre[0].actions, newAction],
                  },
                ];
              });
            }}
            getScaleRender={(scale) => (
              <div>
                <>{`${parseInt(scale / 60 + "")}:${((scale % 60) + "").padStart(
                  2,
                  "0"
                )}`}</>
              </div>
            )}
          />
          <Slider
            defaultValue={6}
            min={0}
            max={6}
            step={1}
            w={80}
            onChange={setScale}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {!loading && playerRef && (
            <>
              <Button
                mt={5}
                onClick={async () => {
                  const res = await fetch(`/api/video?videoId=${id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                      actions: data[0].actions,
                      edited: false,
                    }),
                  });
                  if (res.ok) {
                    toast({
                      title: "Success",
                      description: "Saved successfully.",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Error",
                      description: "An error occurred saving your annotations.",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Save
              </Button>
              <Button
                mt={5}
                onClick={async () => {
                  const res = await fetch(`/api/video?videoId=${id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                      actions: data[0].actions,
                      completed: true,
                      edited: false,
                    }),
                  });
                  if (res.ok) {
                    toast({
                      title: "Success",
                      description: "Saved successfully.",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    setCompleted(true);
                  } else {
                    toast({
                      title: "Error",
                      description: "An error occurred saving your annotations.",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Mark complete and save
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
}
export const getStaticProps: GetStaticProps<VideoPageProps> = async (
  context
) => {
  const { params } = context;
  const videoId = params!.videoId as string;

  const video = meta.find((video) => video.id === videoId) as VideoPageProps;

  return { props: { ...video } };
};

export const getStaticPaths = async () => {
  const paths = meta.map((video) => ({
    params: { videoId: video.id },
  }));
  return { paths, fallback: false };
};
