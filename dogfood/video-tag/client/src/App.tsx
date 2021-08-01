import React, { useMemo, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
// import meta from "./meta.json";
import "./App.css";

type VideoMeta = {
  id: string;
  date: string;
  title: string;
  duration: number;
  video: string;
  thumbnail: string;
  subtitles: SubtitleMeta[];
  tags: string[];
};

type SubtitleMeta = {
  code: string;
  url: string;
};

//? TAGS: Live, VPICK, ENOZI, Arcade, Promotion, MV, Dance Practice, Misc

const App: React.FC = () => {
  const tags = [
    "Live",
    "VPICK",
    "ENOZI",
    "Arcade",
    "Promotion",
    "MV",
    "Dance Practice",
    "Misc",
  ];
  const [videoMeta, setVideoMeta] = useState<VideoMeta[]>([]);
  const [index, setIndex] = useState(0);
  const [applyState, setApplyState] = useState(false); //true: unsaved changes

  useEffect(() => {
    axios.get("http://localhost:5000/").then((resp) => {
      setVideoMeta(resp.data);
    });
  }, []);

  const tagAmount = useMemo(() => {
    return videoMeta.filter((e) => e.tags.length !== 0).length;
  }, [videoMeta]);

  return (
    <div className="App">
      <h1>{`Total videos tagged: ${tagAmount}/554`}</h1>
      {videoMeta.length !== 0 ? (
        <div
          className="videoInfo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="video">
            <ReactPlayer
              style={{ height: "100%", width: "100%" }}
              light={videoMeta[index].thumbnail}
              url={videoMeta[index].video}
              controls
            />
          </div>
          <h3>{videoMeta[index].title}</h3>
          <div>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  let updatedTags = [];
                  if (videoMeta[index].tags.indexOf(tag) > -1) {
                    //tag currently applied, remove
                    updatedTags = [...videoMeta[index].tags].filter(
                      (e) => e !== tag
                    );
                  } else {
                    //tag not currently applied, add
                    updatedTags = [...videoMeta[index].tags];
                    updatedTags.push(tag);
                  }
                  const updatedVideoMeta = [...videoMeta];
                  updatedVideoMeta[index].tags = updatedTags;
                  setVideoMeta(updatedVideoMeta);
                  setApplyState(true);
                }}
                style={
                  videoMeta[index].tags.indexOf(tag) > -1
                    ? { backgroundColor: "green" }
                    : {}
                }
              >
                {tag}
              </button>
            ))}
          </div>
          <p>{`${videoMeta[index].date} ${videoMeta[index].id}`}</p>
        </div>
      ) : null}
      <div className="buttons">
        <button
          onClick={() => {
            if (index === 0) {
              setIndex(553);
            } else {
              setIndex(index - 1);
            }
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            if (index === 553) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      <button
        onClick={() => {
          const nextUntagged = videoMeta.findIndex(
            (e, i) => e.tags.length === 0 && i > index
          );
          setIndex(nextUntagged);
        }}
      >
        Skip to next untagged
      </button>
      {applyState ? (
        <div>
          <h4 style={{ color: "red" }}>Unsaved changes</h4>
          <div className="saveChanges">
            <button
              onClick={() => {
                axios.post("http://localhost:5000/", videoMeta).then((resp) => {
                  setApplyState(false);
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
