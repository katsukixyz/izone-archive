import { HydratedDocument, UpdateQuery } from "mongoose";
import Video, { IVideo } from "../models/Video";
import dbConnect from "../dbConnect";

async function findVideo(
  videoId: string
): Promise<HydratedDocument<IVideo> | null> {
  await dbConnect();
  try {
    return await Video.findOne({ id: videoId });
  } catch (e) {
    return null;
  }
}

async function updateVideo(videoId: string, update: UpdateQuery<IVideo>) {
  await dbConnect();
  return await Video.findOneAndUpdate({ id: videoId }, update);
}

async function addVideo(inputData: IVideo) {
  await dbConnect();
  try {
    return await Video.create([inputData]);
  } catch (e) {
    return null;
  }
}

async function findAllVideos(): Promise<HydratedDocument<IVideo>[]> {
  await dbConnect();
  try {
    return await Video.find();
  } catch (e) {
    return [];
  }
}

export { findVideo, findAllVideos, updateVideo, addVideo };
