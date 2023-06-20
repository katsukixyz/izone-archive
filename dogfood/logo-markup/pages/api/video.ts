// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Video from "@/db/models/Video";
import { findAllVideos, findVideo, updateVideo } from "../../db/actions/Video";
import meta from "../../meta/meta.json";
import dbConnect from "@/db/dbConnect";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.videoId) {
      get(req, res);
    } else {
      getAll(req, res);
      // test();
    }
  } else if (req.method === "PUT") {
    update(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { videoId } = req.query;
  const video = await findVideo(videoId as string);
  return res.status(200).json(video);
}

async function getAll(req: NextApiRequest, res: NextApiResponse) {
  const videos = await findAllVideos();
  return res.status(200).json(videos);
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { videoId } = req.query;
  try {
    const video = await updateVideo(videoId as string, JSON.parse(req.body));
    return res.status(200).json({});
  } catch (e) {
    return res.status(400).json({});
  }
}

async function test() {
  await dbConnect();
  try {
    const videos = await Promise.all(
      meta.map(async (meta, i) => {
        const video = new Video({
          id: meta.id,
          actions: [],
          completed: false,
        });

        await video.save();

        return video;
      })
    );
  } catch (e) {
    console.error(e);
  }
}
