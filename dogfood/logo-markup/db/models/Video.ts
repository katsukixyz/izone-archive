import { ActionRectangle } from "@/pages/video/[videoId]";
import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IVideo {
  id: string;
  actions: ActionRectangle[];
  completed: boolean;
}

const videoSchema = new Schema<IVideo>({
  id: {
    type: String,
    index: true,
  },
  actions: {
    type: [
      {
        id: { type: String },
        start: { type: Number },
        end: { type: Number },
        effectId: { type: String },
        x: { type: Number },
        y: { type: Number },
        width: { type: Number },
        height: { type: Number },
        maxEnd: { type: Number },
      },
    ],
  },
  completed: Boolean,
});

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
